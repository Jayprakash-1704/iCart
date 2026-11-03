import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";

export const filters = [
  "All Orders",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export const statusStyles = {
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 border-blue-100",
    icon: CheckCircle2,
  },
  packed: {
    label: "Packed",
    className: "bg-purple-50 text-purple-700 border-purple-100",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    className: "bg-amber-50 text-amber-700 border-amber-100",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-100",
    icon: XCircle,
  },
  refunded: {
    label: "Refunded",
    className: "bg-gray-100 text-gray-700 border-gray-200",
    icon: RefreshCw,
  },
};
