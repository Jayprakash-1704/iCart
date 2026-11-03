import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Search,
  ShoppingBag,
  ArrowRight,
  Truck,
  CheckCircle2,
  RefreshCw,
  ShoppingCart,
  ReceiptText,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { filters } from "../constants/orderConstants";
import{
  getOrderId,
  getProducts,
  getProductName}

 from "../utils/orderUtils";
import SummaryCard from "../Components/SummaryCard";
import OrderCard from "../components/OrderCard";

const API_URL = "http://localhost:5000/api/orders/my-orders";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            response.status === 401 || response.status === 403
              ? "Please log in to view your orders."
              : "Unable to load your orders. Please try again."
          );
        }

        const data = await response.json();
        console.log(data)

        // Supports either an array or { orders: [...] } response.
        const fetchedOrders = Array.isArray(data)
          ? data
          : Array.isArray(data.orders)
            ? data.orders
            : [];

        setOrders(fetchedOrders);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => controller.abort();
  }, []);



  const handleDownloadInvoice = async (order) => {
    try {
      const orderId = getOrderId(order);

      if (!orderId) {
        throw new Error("Order ID is missing.");
      }

      if (String(order.status).toLowerCase() !== "delivered") {
        toast.error("Invoice is available only for delivered orders.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/invoices/${orderId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/pdf, application/json",
          },
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";

        let message = `Invoice download failed (${response.status}).`;

        if (contentType.includes("application/json")) {
          const errorData = await response.json();

          console.error("Invoice backend error:", errorData);

          message =
            errorData.error ||
            errorData.message ||
            message;

          if (errorData.step) {
            console.error("Invoice failed at step:", errorData.step);
          }
        } else {
          console.error(
            "Invoice API returned HTML or another unexpected response:",
            (await response.text()).slice(0, 300)
          );
        }

        throw new Error(message);
      }

      const blob = await response.blob();

      if (blob.type !== "application/pdf") {
        throw new Error("The server did not return a PDF invoice.");
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `iCart-invoice-${orderId}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Invoice download error:", error);
      toast.error(error.message || "Unable to download invoice.");
    }
  };



  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const status = String(order.status || "").toLowerCase();

      const matchesFilter =
        activeFilter === "All Orders" ||
        status === activeFilter.toLowerCase();

      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !query ||
        String(getOrderId(order)).toLowerCase().includes(query) ||
        getProducts(order).some((item) =>
          getProductName(item).toLowerCase().includes(query)
        );

      return matchesFilter && matchesSearch;
    });
  }, [orders, activeFilter, searchQuery]);

  const deliveredCount = orders.filter(
    (order) => String(order.status).toLowerCase() === "delivered"
  ).length;

  const activeCount = orders.filter((order) =>
    ["confirmed", "packed", "shipped"].includes(
      String(order.status).toLowerCase()
    )
  ).length;

  const refreshOrders = () => {
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-slate-50/80">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <Link to="/" className="transition hover:text-indigo-600">
                  Home
                </Link>
                <ChevronRight size={15} />
                <span className="font-medium text-slate-800">
                  My Orders
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <ShoppingBag size={25} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    My Orders
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Track, manage, and revisit your purchases.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Continue Shopping
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Summary Cards */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={Package}
            label="Total Orders"
            value={orders.length}
            color="indigo"
          />

          <SummaryCard
            icon={Truck}
            label="In Progress"
            value={activeCount}
            color="amber"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Successfully Delivered"
            value={deliveredCount}
            color="emerald"
          />
        </section>

        {/* Search and Filters */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Order History
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {loading
                    ? "Fetching your orders..."
                    : `${filteredOrders.length} ${filteredOrders.length === 1 ? "order" : "orders"
                    } found`}
                </p>
              </div>

              <div className="relative w-full md:max-w-sm">
                <Search
                  size={19}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by order ID or product..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${activeFilter === filter
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                >
                  {filter}
                  {filter === "All Orders" && (
                    <span className="ml-2 opacity-75">{orders.length}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Order List */}
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="space-y-5">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-slate-200 p-5"
                  >
                    <div className="mb-5 h-4 w-40 rounded bg-slate-200" />
                    <div className="flex gap-4">
                      <div className="h-20 w-20 rounded-xl bg-slate-200" />
                      <div className="flex-1 space-y-3 py-2">
                        <div className="h-4 w-2/3 rounded bg-slate-200" />
                        <div className="h-3 w-1/3 rounded bg-slate-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <RefreshCw size={28} />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Couldn't load your orders
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={refreshOrders}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500">
                  {searchQuery || activeFilter !== "All Orders" ? (
                    <Search size={34} />
                  ) : (
                    <ShoppingBag size={36} />
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {searchQuery || activeFilter !== "All Orders"
                    ? "No matching orders"
                    : "No orders yet"}
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  {searchQuery || activeFilter !== "All Orders"
                    ? "Try another search term or select a different status filter."
                    : "Your next great find is waiting. Explore our collection and place your first order."}
                </p>

                <Link
                  to="/shop"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  <ShoppingCart size={18} />
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={getOrderId(order)}
                    order={order}
                    handleDownloadInvoice={handleDownloadInvoice}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-indigo-100 bg-linear-to-r from-indigo-50 to-white p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <ReceiptText size={24} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Need help with an order?
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                If you have questions about a purchase, our team is here to help.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 self-start font-semibold text-indigo-600 transition hover:text-indigo-800 sm:self-center"
          >
            Contact Support
            <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}
export default MyOrders;
