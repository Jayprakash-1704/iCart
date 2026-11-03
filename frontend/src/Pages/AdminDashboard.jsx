import { useContext, useEffect, useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  ChartNoAxesCombined,
  Settings,
  Menu,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ShoppingCart,
  Boxes,
  UserRound,
  ChevronDown,
  ArrowUpRight,
  //   ArrowDownRight,
  MoreHorizontal,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  RefreshCw,
} from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { AuthContext } from "@/Context/AuthContext.jsx";

// Replace these sample values with data from your backend.

const revenueData = [
  { month: "Jan", revenue: 35000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 55000 },
  { month: "May", revenue: 48000 },
  { month: "Jun", revenue: 72000 },
  { month: "Jul", revenue: 65000 },
  { month: "Aug", revenue: 85000 },
  { month: "Sep", revenue: 76000 },
  { month: "Oct", revenue: 95000 },
  { month: "Nov", revenue: 88000 },
  { month: "Dec", revenue: 110000 },
];

// const categoryData = [
//   { category: "Electronics", sales: 85000 },
//   { category: "Fashion", sales: 62000 },
//   { category: "Home", sales: 45000 },
//   { category: "Beauty", sales: 35000 },
//   { category: "Books", sales: 22000 },
// ];





const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  iconBg,
  loading,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            {loading ? "..." : value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${iconBg}`}>
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        {positive ? (
          <TrendingUp size={16} className="text-green-600" />
        ) : (
          <TrendingDown size={16} className="text-red-500" />
        )}

        <span
          className={
            positive
              ? "font-semibold text-green-600"
              : "font-semibold text-red-500"
          }
        >
          {change}
        </span>

        <span className="text-slate-400">vs previous period</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Confirmed: "bg-amber-50 text-amber-700 ring-amber-600/20",
    Packed: "bg-blue-50 text-blue-700 ring-blue-600/20",
    Shipped: "bg-cyan-50 text-cyan-700 ring-cyan-600/20",
    Delivered: "bg-green-50 text-green-700 ring-green-600/20",
    Cancelled: "bg-red-50 text-red-700 ring-red-600/20",
    Refunded: "bg-purple-50 text-purple-700 ring-purple-600/20",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || "bg-slate-100 text-slate-600 ring-slate-300"
      }`}
    >
      {status}
    </span>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-xs text-slate-500">{label}</p>
      <p className="font-bold text-slate-900">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [period, setPeriod] = useState("12months");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        // Change this URL if your backend uses a different endpoint.
        const response = await fetch(
          `http://localhost:5000/api/admin/analytics?period=${period}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Unable to load analytics.");
        }

        const data = await response.json();
        setAnalytics(data);
        console.log(data);
        // console.log(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period]);

  const orderStatusData = [
    {
      name: "Delivered",
      value: analytics?.deliveredOrders ?? 0,
      color: "#16a34a",
    },
    {
      name: "Refunded",
      value: analytics?.refundedOrders ?? 0,
      color: "#9333ea",
    },
    {
      name: "Shipped",
      value: analytics?.shippedOrders ?? 0,
      color: "#0891b2",
    },
    {
      name: "Packed",
      value: analytics?.packedOrders ?? 0,
      color: "#2563eb",
    },
    {
      name: "Confirmed",
      value: analytics?.confirmedOrders ?? 0,
      color: "#f59e0b",
    },
    {
      name: "Cancelled",
      value: analytics?.cancelledOrders ?? 0,
      color: "#ef4444",
    },
  ];

  const orderStatusWithPercentage = orderStatusData.map((item) => ({
    ...item,
    percentage:
      analytics?.totalOrders > 0
        ? Number(((item.value / analytics?.totalOrders) * 100).toFixed(1))
        : 0,
  }));

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(analytics?.totalRevenue),
      change: "12.8%",
      positive: true,
      icon: IndianRupee,
      iconBg: "bg-green-50 text-green-600",
    },
    {
      title: "Total Orders",
      value: (analytics?.totalOrders ?? 0).toLocaleString("en-IN"),
      change: "8.2%",
      positive: true,
      icon: ShoppingCart,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Customers",
      value: (analytics?.totalUsers ?? 0).toLocaleString("en-IN"),
      change: "5.4%",
      positive: true,
      icon: Users,
      iconBg: "bg-violet-50 text-violet-600",
    },
    {
      title: "Total Products",
      value: (analytics?.totalProducts ?? 0).toLocaleString("en-IN"),
      change: "2.1%",
      positive: true,
      icon: Boxes,
      iconBg: "bg-orange-50 text-orange-600",
    },
  ];

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, active: true },
    { label: "Products", icon: Package },
    { label: "Orders", icon: ShoppingBag },
    { label: "Customers", icon: Users },
    { label: "Analytics", icon: ChartNoAxesCombined },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed inset-y-0 pt-6 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              i
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">iCart</h1>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2  hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <XCircle size={20} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                onClick={() => {
                  setSidebarOpen(false);

                  if (label !== "Overview") {
                    alert(
                      `${label} page can be connected to your iCart routes.`,
                    );
                  }
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                {label}

                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </nav>

          <p className="mb-3 mt-9 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Preferences
          </p>

          <button
            onClick={() => alert("Connect this to your settings page.")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <Settings size={19} />
            Settings
          </button>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {user.fullName.slice(0, 1)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.fullName}</p>
              <p className="truncate text-xs text-slate-500">
                iCart Administrator
              </p>
            </div>

            <MoreHorizontal size={20} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-h-screen lg:ml-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-lg font-bold sm:text-xl">Dashboard</h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Welcome back! Here's what's happening with your store.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 md:flex">
              <Search size={17} className="text-slate-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-32 bg-transparent text-sm outline-none lg:w-44"
              />
              <span className="rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400">
                /
              </span>
            </div>

            <button
              aria-label="Notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {user.fullName.slice(0, 1)}
              </div>
              <ChevronDown size={16} className="text-slate-500" />
            </div>
          </div>
        </header>

        <div className="space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Page title and filter */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Store Overview
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track your sales, orders, customers, and inventory.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                <CalendarDays size={17} className="text-slate-500" />

                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="bg-transparent text-sm font-medium outline-none"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                  <option value="12months">Last 12 months</option>
                </select>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="rounded-xl border border-slate-200 bg-white p-2.5 transition hover:bg-slate-50"
                title="Refresh dashboard"
                aria-label="Refresh dashboard"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </section>

          {/* API error */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <AlertTriangle size={19} className="mt-0.5 shrink-0" />

              <div>
                <p className="font-semibold">Analytics API unavailable</p>
                <p className="mt-1">{error}</p>
                <p className="mt-1">
                  Summary cards show zero until the backend responds. The charts
                  below currently use sample data.
                </p>
              </div>
            </div>
          )}

          {/* KPI cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} loading={loading} />
            ))}
          </section>

          {/* Revenue chart */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold">Revenue Overview</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Revenue trends across the year
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                  <TrendingUp className="mr-1 inline" size={15} />
                  Sales performance
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 5, right: 8, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#2563eb"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2563eb"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      tickMargin={12}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                      width={55}
                    />

                    <Tooltip content={<ChartTooltip />} />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563eb"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                      activeDot={{ r: 5, fill: "#2563eb" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                Revenue (sample data)
              </div>
            </div>

            {/* Order status donut */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div>
                <h3 className="text-base font-bold">Order Status</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Distribution of orders
                </p>
              </div>

              <div className="relative mt-3 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusWithPercentage}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={63}
                      outerRadius={88}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {orderStatusWithPercentage.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                      ))}
                    </Pie>

                    <Tooltip formatter={(value, name) => [`${value}`, name]} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">
                    {analytics?.totalOrders}
                  </span>
                  <span className="text-xs text-slate-500">Orders</span>
                </div>
              </div>

              <div className="mt-2 space-y-3">
                {orderStatusWithPercentage.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />

                      <span className="text-slate-600">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-900">
                        {item.value}
                      </span>

                      <span className="w-14 text-right font-semibold text-slate-500">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Category chart and inventory */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
              <div className="mb-6">
                <h3 className="text-base font-bold">Sales by Category</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Compare sales across product categories
                </p>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics?.categoryData}
                    margin={{ top: 5, right: 8, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      tickMargin={12}
                      interval={0}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                      width={55}
                    />

                    <Tooltip content={<ChartTooltip />} />

                    <Bar
                      dataKey="sales"
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={45}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Inventory cards */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h3 className="text-base font-bold">Inventory Overview</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Monitor product availability
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50/70 p-4">
                  <div className="rounded-xl bg-green-100 p-3 text-green-700">
                    <CheckCircle2 size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-slate-600">In Stock</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {analytics
                        ? Math.max(
                            0,
                            analytics.totalProducts -
                              (analytics.outOfStockProducts || 0),
                          )
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-amber-100 bg-amber-50/70 p-4">
                  <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
                    <AlertTriangle size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-slate-600">Low Stock</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {analytics?.lowStockProducts ?? "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-red-100 bg-red-50/70 p-4">
                  <div className="rounded-xl bg-red-100 p-3 text-red-600">
                    <Package size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-slate-600">Out of Stock</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {analytics?.outOfStockProducts ?? "—"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert("Connect this to your products page.")}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold transition hover:bg-slate-50"
              >
                Manage Inventory
                <ArrowUpRight size={16} />
              </button>
            </div>
          </section>

          {/* Extra order metrics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock3 size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Pending Orders</p>
                <p className="mt-1 text-xl font-bold">
                  {analytics?.confirmedOrders ?? "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="rounded-xl bg-green-50 p-3 text-green-600">
                <Truck size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Delivered Orders</p>
                <p className="mt-1 text-xl font-bold">
                  {analytics?.deliveredOrders ?? "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <XCircle size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Cancelled Orders</p>
                <p className="mt-1 text-xl font-bold">
                  {analytics?.cancelledOrders ?? "—"}
                </p>
              </div>
            </div>
          </section>

          {/* Recent orders table */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 sm:px-6">
              <div>
                <h3 className="text-base font-bold">Recent Orders</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Latest customer transactions
                </p>
              </div>

              <button
                onClick={() => alert("Connect this to your orders page.")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                View All
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full  text-left">
                <thead className="bg-slate-50">
                  <tr className="text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-semibold">Order ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {analytics?.recentOrders?.map((order) => (
                    <tr
                      key={order._id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Order ID */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-blue-700">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>

                      {/* Customer */}
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                            <UserRound size={17} />
                          </div>

                          <span className="text-sm font-medium">
                            {order.user?.fullName || "Unknown User"}
                          </span>
                        </div>
                      </td>

                      {/* Products */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {
                          order.items?.map(
                                (item) =>
                                  `${item.name?.split(" ").slice(0,4).join(" ")|| "Product"} × ${item.quantity}`,
                              )
                              .join(" ")
                          }
                      </td>

                      {/* Total Amount */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold">
                        {formatCurrency(order.totalAmount)}
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
              <p className="text-xs text-slate-500">
                Showing sample order records
              </p>

              <button
                onClick={() => alert("Connect pagination to your orders API.")}
                className="text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                View all orders →
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col justify-between gap-2 pb-3 text-xs text-slate-400 sm:flex-row">
            <p>© {new Date().getFullYear()} iCart Admin Panel</p>
            <p>Store management and analytics</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
