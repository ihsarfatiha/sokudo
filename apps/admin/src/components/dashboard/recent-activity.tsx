"use client";

import Link from "next/link";
import { AdminOrder, SellerStore, AdminDispute } from "@/types/admin";
import { formatCurrencyIDR, formatDate } from "@/lib/format";
import {
  Clock,
  CheckCircle,
  Truck,
  Package,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

interface RecentActivityProps {
  orders: AdminOrder[];
  pendingStores: SellerStore[];
  disputes: AdminDispute[];
}

export function RecentActivity({
  orders,
  pendingStores,
  disputes,
}: RecentActivityProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Recent Orders Overview (2 Columns) */}
      <div className="stat-card lg:col-span-2">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recent Platform Orders</h2>
            <p className="text-xs text-gray-500">Live order flow across stores</p>
          </div>
          <Link
            href="/orders"
            className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Store</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.slice(0, 5).map((order) => {
                const statusStyles: Record<string, { bg: string; text: string; icon: any }> = {
                  pending: { bg: "bg-gray-100", text: "text-gray-700", icon: Clock },
                  processing: { bg: "bg-blue-50", text: "text-blue-700", icon: Package },
                  shipped: { bg: "bg-purple-50", text: "text-purple-700", icon: Truck },
                  delivered: { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle },
                  refunded: { bg: "bg-rose-50", text: "text-rose-700", icon: AlertCircle },
                  cancelled: { bg: "bg-gray-100", text: "text-gray-600", icon: AlertCircle },
                };

                const style = statusStyles[order.status] || statusStyles.pending;
                const StatusIcon = style.icon;

                return (
                  <tr key={order.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 font-medium text-brand-700">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 text-gray-900">{order.customerName}</td>
                    <td className="py-3.5 text-gray-500">{order.storeName}</td>
                    <td className="py-3.5 text-right font-medium text-gray-900">
                      {formatCurrencyIDR(order.totalAmount)}
                    </td>
                    <td className="py-3.5 text-center">
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                          style.bg,
                          style.text
                        )}
                      >
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Center / Pending Approvals & Urgent Disputes (1 Column) */}
      <div className="space-y-6">
        {/* Pending Stores Approval Widget */}
        <div className="stat-card">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-900">Pending Seller Approvals</h2>
            <Link
              href="/sellers"
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              Manage
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {pendingStores.slice(0, 3).map((store) => (
              <div
                key={store.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/60 p-3 hover:bg-gray-100/60"
              >
                <div className="overflow-hidden pr-2">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {store.storeName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Owner: {store.sellerName} &bull; {store.category}
                  </p>
                </div>
                <Link
                  href="/sellers"
                  className="rounded bg-brand-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-brand-700 shrink-0"
                >
                  Review
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Dispute Resolution Queue */}
        <div className="stat-card">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-900">Dispute Alerts</h2>
            <Link
              href="/disputes"
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              Mediation Hub
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {disputes.slice(0, 2).map((dsp) => (
              <div
                key={dsp.id}
                className="rounded-lg border border-rose-100 bg-rose-50/40 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-800">
                    {dsp.disputeNumber}
                  </span>
                  <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-rose-700">
                    {dsp.priority} priority
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-gray-800 line-clamp-1">
                  {dsp.reason}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>{dsp.storeName}</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrencyIDR(dsp.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
