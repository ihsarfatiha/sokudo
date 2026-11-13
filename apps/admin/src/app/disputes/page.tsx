"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import clsx from "clsx";
import { mockDisputes } from "@/data/mock-data";
import { formatCurrencyIDR, formatDate } from "@/lib/format";
import {
  AdminDispute,
  DisputePriority,
  DisputeStatus,
} from "@/types/admin";

const priorityBadge: Record<DisputePriority, string> = {
  high: "badge-danger",
  medium: "badge-warning",
  low: "badge-neutral",
};

const statusMeta: Record<
  DisputeStatus,
  { label: string; className: string; icon: typeof Clock }
> = {
  open: { label: "Open", className: "badge-danger", icon: AlertTriangle },
  under_review: { label: "Under review", className: "badge-warning", icon: Clock },
  resolved_refunded: {
    label: "Refunded",
    className: "badge-success",
    icon: CheckCircle,
  },
  resolved_dismissed: {
    label: "Dismissed",
    className: "badge-neutral",
    icon: XCircle,
  },
};

export default function DisputesPage() {
  const [disputes, setDisputes] = useState<AdminDispute[]>(mockDisputes);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | DisputeStatus>("all");
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState<AdminDispute | null>(
    mockDisputes[0] ?? null
  );

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return disputes.filter((dispute) => {
      const matchesFilter = filter === "all" || dispute.status === filter;
      const matchesSearch =
        !term ||
        dispute.disputeNumber.toLowerCase().includes(term) ||
        dispute.customerName.toLowerCase().includes(term) ||
        dispute.storeName.toLowerCase().includes(term) ||
        dispute.reason.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [disputes, filter, search]);

  const open = disputes.filter((d) => d.status === "open").length;
  const review = disputes.filter((d) => d.status === "under_review").length;
  const resolved = disputes.filter((d) =>
    d.status.startsWith("resolved")
  ).length;
  const exposure = disputes
    .filter((d) => d.status === "open" || d.status === "under_review")
    .reduce((sum, d) => sum + d.amount, 0);

  function resolve(
    dispute: AdminDispute,
    status: DisputeStatus,
    resolutionNote?: string
  ) {
    setDisputes((prev) =>
      prev.map((item) =>
        item.id === dispute.id
          ? { ...item, status, resolutionNote: resolutionNote ?? item.resolutionNote }
          : item
      )
    );
    setSelected((prev) =>
      prev && prev.id === dispute.id
        ? { ...prev, status, resolutionNote: resolutionNote ?? prev.resolutionNote }
        : prev
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Dispute Resolution</h1>
        <p className="page-description">
          Mediate buyer–seller conflicts, review evidence, and issue fair
          resolutions.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Open", value: open, icon: AlertTriangle, tone: "text-rose-600 bg-rose-50" },
          { label: "Under review", value: review, icon: Clock, tone: "text-amber-600 bg-amber-50" },
          { label: "Resolved", value: resolved, icon: CheckCircle, tone: "text-emerald-600 bg-emerald-50" },
          { label: "Exposure", value: formatCurrencyIDR(exposure), icon: ShieldAlert, tone: "text-brand-600 bg-brand-50" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="stat-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500">{card.label}</p>
                <span className={clsx("rounded-lg p-1.5", card.tone)}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-1 text-xl font-bold text-gray-900">{card.value}</p>
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
            placeholder="Search dispute, customer, store..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <select
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value as "all" | DisputeStatus)
          }
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none"
        >
          <option value="all">All status</option>
          <option value="open">Open</option>
          <option value="under_review">Under review</option>
          <option value="resolved_refunded">Refunded</option>
          <option value="resolved_dismissed">Dismissed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="stat-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="data-table min-w-[900px]">
              <thead>
                <tr>
                  <th>Dispute</th>
                  <th>Customer</th>
                  <th>Store</th>
                  <th>Reason</th>
                  <th className="text-right">Amount</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-sm text-gray-500">
                      No disputes match the current filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((dispute) => {
                    const meta = statusMeta[dispute.status];
                    const StatusIcon = meta.icon;
                    return (
                      <tr
                        key={dispute.id}
                        className={clsx(
                          "cursor-pointer",
                          selected?.id === dispute.id && "bg-brand-50/50"
                        )}
                        onClick={() => setSelected(dispute)}
                      >
                        <td className="whitespace-nowrap font-semibold text-brand-700">
                          {dispute.disputeNumber}
                          <p className="text-xs font-normal text-gray-400">
                            {formatDate(dispute.createdAt)}
                          </p>
                        </td>
                        <td className="text-gray-900">{dispute.customerName}</td>
                        <td className="text-gray-600">{dispute.storeName}</td>
                        <td className="max-w-[220px] truncate text-gray-600">
                          {dispute.reason}
                        </td>
                        <td className="text-right font-semibold text-gray-900">
                          {formatCurrencyIDR(dispute.amount)}
                        </td>
                        <td>
                          <span
                            className={clsx(
                              "badge capitalize",
                              priorityBadge[dispute.priority]
                            )}
                          >
                            {dispute.priority}
                          </span>
                        </td>
                        <td>
                          <span className={clsx("badge gap-1", meta.className)}>
                            <StatusIcon className="h-3 w-3" />
                            {meta.label}
                          </span>
                        </td>
                        <td className="text-right">
                          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="stat-card h-fit">
          {selected ? (
            <>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-brand-600">
                    {selected.disputeNumber}
                  </p>
                  <h2 className="mt-1 text-base font-bold text-gray-900">
                    {selected.reason}
                  </h2>
                </div>
                <span
                  className={clsx(
                    "badge shrink-0 capitalize",
                    priorityBadge[selected.priority]
                  )}
                >
                  {selected.priority}
                </span>
              </div>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-gray-500">Order</dt>
                  <dd className="font-medium text-gray-900">
                    {selected.orderNumber}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-gray-500">Customer</dt>
                  <dd className="font-medium text-gray-900">
                    {selected.customerName}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-gray-500">Store</dt>
                  <dd className="font-medium text-gray-900">
                    {selected.storeName}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-gray-500">Amount</dt>
                  <dd className="font-bold text-gray-900">
                    {formatCurrencyIDR(selected.amount)}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 rounded-lg bg-gray-50 p-3">
                <p className="text-xs font-semibold text-gray-500">
                  Customer note
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {selected.customerNote}
                </p>
              </div>

              {selected.sellerResponse && (
                <div className="mt-3 rounded-lg bg-brand-50 p-3">
                  <p className="text-xs font-semibold text-brand-700">
                    Seller response
                  </p>
                  <p className="mt-1 text-sm text-brand-900">
                    {selected.sellerResponse}
                  </p>
                </div>
              )}

              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                placeholder="Resolution note (optional)"
                className="mt-4 w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-brand-500 focus:outline-none"
              />

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => resolve(selected, "resolved_refunded", note)}
                  className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  Refund buyer
                </button>
                <button
                  onClick={() => resolve(selected, "resolved_dismissed", note)}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Dismiss
                </button>
              </div>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-gray-400">
                <MessageSquare className="h-3 w-3" />
                Both parties are notified of the resolution.
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Select a dispute to see the details.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
