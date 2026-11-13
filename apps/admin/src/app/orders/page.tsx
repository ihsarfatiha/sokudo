"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Package,
  Search,
  ShoppingCart,
  Truck,
} from "lucide-react";
import clsx from "clsx";
import { mockOrders } from "@/data/mock-data";
import { fetchAdmin } from "@/lib/api";
import { formatCurrencyIDR, formatDate } from "@/lib/format";
import { AdminOrder, OrderStatus } from "@/types/admin";

const statusMeta: Record<
  OrderStatus,
  { label: string; className: string; icon: typeof Clock }
> = {
  pending: { label: "Pending", className: "badge-warning", icon: Clock },
  processing: { label: "Processing", className: "badge-info", icon: Package },
  shipped: { label: "Shipped", className: "badge-neutral", icon: Truck },
  delivered: {
    label: "Delivered",
    className: "badge-success",
    icon: CheckCircle,
  },
  cancelled: { label: "Cancelled", className: "badge-danger", icon: AlertCircle },
  refunded: { label: "Refunded", className: "badge-danger", icon: AlertCircle },
};

const tabs: Array<{ value: "all" | OrderStatus; label: string }> = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(mockOrders);
  const [tab, setTab] = useState<"all" | OrderStatus>("all");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<"mock" | "api">("mock");

  useEffect(() => {
    let active = true;
    fetchAdmin<AdminOrder[]>("/admin/orders").then((data) => {
      if (active && Array.isArray(data) && data.length > 0) {
        setOrders(data);
        setSource("api");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab = tab === "all" || order.status === tab;
      const term = search.toLowerCase();
      const matchesSearch =
        !term ||
        order.orderNumber.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.storeName.toLowerCase().includes(term);
      return matchesTab && matchesSearch;
    });
  }, [orders, tab, search]);

  const totalValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pending = orders.filter((order) => order.status === "pending").length;
  const shipped = orders.filter((order) => order.status === "shipped").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Orders</h1>
          <p className="page-description">
            Monitor order flow across every store and intervention needed.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "badge",
              source === "api" ? "badge-success" : "badge-warning"
            )}
          >
            {source === "api" ? "Live API" : "Demo data"}
          </span>
          <button className="btn btn-secondary text-xs">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Orders", value: orders.length.toLocaleString(), icon: ShoppingCart },
          { label: "Order Value", value: formatCurrencyIDR(totalValue), icon: Package },
          { label: "Awaiting Action", value: pending.toLocaleString(), icon: Clock },
          { label: "In Transit", value: shipped.toLocaleString(), icon: Truck },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="stat-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500">{item.label}</p>
                <Icon className="h-4 w-4 text-gray-300" />
              </div>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search order, customer, store..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div className="scrollbar-hide flex gap-1 overflow-x-auto">
          {tabs.map((item) => (
            <button
              key={item.value}
              onClick={() => setTab(item.value)}
              className={clsx(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                tab === item.value
                  ? "bg-brand-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="stat-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Store</th>
                <th className="text-center">Items</th>
                <th className="text-right">Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-sm text-gray-500">
                    No orders match the current filter.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const meta = statusMeta[order.status];
                  const Icon = meta.icon;
                  return (
                    <tr key={order.id}>
                      <td className="font-semibold text-brand-700">
                        {order.orderNumber}
                      </td>
                      <td>
                        <p className="font-medium text-gray-900">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.customerEmail}
                        </p>
                      </td>
                      <td className="text-gray-600">{order.storeName}</td>
                      <td className="text-center text-gray-600">
                        {order.itemsCount}
                      </td>
                      <td className="text-right font-semibold text-gray-900">
                        {formatCurrencyIDR(order.totalAmount)}
                      </td>
                      <td>
                        <span
                          className={clsx(
                            "badge capitalize",
                            order.paymentStatus === "paid" && "badge-success",
                            order.paymentStatus === "pending" && "badge-warning",
                            order.paymentStatus === "failed" && "badge-danger",
                            order.paymentStatus === "refunded" && "badge-danger"
                          )}
                        >
                          {order.paymentStatus}
                        </span>
                        <p className="mt-1 text-xs text-gray-400">
                          {order.paymentMethod}
                        </p>
                      </td>
                      <td>
                        <span className={clsx("badge gap-1", meta.className)}>
                          <Icon className="h-3 w-3" />
                          {meta.label}
                        </span>
                      </td>
                      <td className="text-xs text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
