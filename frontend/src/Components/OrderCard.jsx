import { Link } from "react-router-dom";
import {
  Package,
  MapPin,
  CalendarDays,
  ChevronRight,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { getOrderId, getProducts, getStatus, formatDate, formatPrice, getOrderTotal, getProductImage, getProductName } from "../utils/orderUtils";

function OrderCard({ order, handleDownloadInvoice }) {
  const id = getOrderId(order);
  const items = getProducts(order);
  const status = getStatus(order.status);
  const StatusIcon = status.icon;

  const orderDate = order.createdAt || order.orderDate || order.date;

  const displayedItems = items.slice(0, 4);
  const remainingCount = Math.max(0, items.length - displayedItems.length);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-indigo-200 hover:shadow-md">
      {/* Order Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Order ID
            </p>
            <p className="mt-1 text-sm font-bold text-slate-800">
              #{order._id}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-xs text-slate-400">
              <CalendarDays size={13} />
              Order Date
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {formatDate(orderDate)}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Total Amount</p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {formatPrice(getOrderTotal(order))}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
        >
          <StatusIcon size={14} />
          {status.label}
        </span>
      </div>

      {/* Products */}
      <div className="p-4 sm:p-5">
        {displayedItems.length > 0 ? (
          <div className="space-y-4">
            {displayedItems.map((item, index) => {
              const imageUrl = getProductImage(item);
              const name = getProductName(item);
              const quantity = Number(item.quantity) || 1;
              const price = Number(item.price) || 0;

              return (
                <div
                  key={item._id || item.productId?._id || `${id}-${index}`}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-24 sm:w-24">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <Package size={28} className="text-slate-300" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-sm font-semibold text-slate-800 sm:text-base">
                      {name}
                    </h4>

                    <p className="mt-1.5 text-sm text-slate-500">
                      Quantity: {quantity}
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatPrice(price * quantity)}
                    </p>
                  </div>
                </div>
              );
            })}

            {remainingCount > 0 && (
              <p className="pl-1 text-sm font-medium text-indigo-600">
                +{remainingCount} more{" "}
                {remainingCount === 1 ? "item" : "items"} in this order
              </p>
            )}
          </div>
        ) : (
          <p className="py-3 text-sm text-slate-500">
            Product details are unavailable for this order.
          </p>
        )}

        {/* Footer */}
        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin size={15} className="shrink-0 text-slate-400" />

            <span className="line-clamp-1">
              {order.address?.city ||
                order.address?.fullAddress ||
                order.address?.address ||
                "Delivery address on file"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">


            {String(order.status).toLowerCase() === "delivered" && (
              <button
                type="button"
                onClick={() => handleDownloadInvoice(order)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Download Invoice
              </button>
            )}



            <Link
              to={`/my-orders/${id}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              View Details
              <ChevronRight size={16} />
            </Link>

            {String(order.status).toLowerCase() === "shipped" && (
              <Link
                to={`/track-order/${id}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Truck size={16} />
                Track Order
              </Link>
            )}

            {String(order.status).toLowerCase() === "delivered" && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <CheckCircle2 size={17} />
                Delivered
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
export default OrderCard;
