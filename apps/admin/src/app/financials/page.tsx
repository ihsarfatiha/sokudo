"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Landmark,
  Receipt,
  Search,
  Wallet,
} from "lucide-react";
import clsx from "clsx";
import { mockTransactions } from "@/data/mock-data";
import { fetchAdmin } from "@/lib/api";
import { formatCurrencyIDR, formatDate } from "@/lib/format";
import { FinancialTransaction } from "@/types/admin";

const typeLabel: Record<string, string> = {
  order_payment: "Order payment",
  seller_payout: "Seller payout",
  platform_commission: "Platform commission",
  refund: "Refund",
};

const typeBadge: Record<string, string> = {
  order_payment: "badge-success",
  seller_payout: "badge-warning",
  platform_commission: "badge-info",
  refund: "badge-danger",
};

export default function FinancialsPage() {
  const [transactions, setTransactions] =
    useState<FinancialTransaction[]>(mockTransactions);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<"mock" | "api">("mock");

  useEffect(() => {
    let active = true;
    fetchAdmin<FinancialTransaction[]>("/admin/transactions").then((data) => {
      if (active && Array.isArray(data) && data.length > 0) {
        setTransactions(data);
        setSource("api");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return transactions.filter(
      (transaction) =>
        !term ||
        transaction.transactionId.toLowerCase().includes(term) ||
        transaction.description.toLowerCase().includes(term) ||
        (transaction.storeName ?? "").toLowerCase().includes(term)
    );
  }, [transactions, search]);

  const gross = transactions
    .filter((t) => t.type === "order_payment")
    .reduce((sum, t) => sum + t.amount, 0);
  const commission = Math.round(gross * 0.05);
  const payouts = transactions
    .filter((t) => t.type === "seller_payout")
    .reduce((sum, t) => sum + t.amount, 0);
  const refunds = transactions
    .filter((t) => t.type === "refund")
    .reduce((sum, t) => sum + t.amount, 0);

  const cards = [
    {
      label: "Gross Volume",
      value: formatCurrencyIDR(gross),
      icon: Receipt,
      tone: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Platform Commission (5%)",
      value: formatCurrencyIDR(commission),
      icon: Landmark,
      tone: "text-brand-600 bg-brand-50",
    },
    {
      label: "Seller Payouts",
      value: formatCurrencyIDR(payouts),
      icon: Wallet,
      tone: "text-amber-600 bg-amber-50",
    },
    {
      label: "Refunds",
      value: formatCurrencyIDR(refunds),
      icon: ArrowDownLeft,
      tone: "text-rose-600 bg-rose-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Financials</h1>
          <p className="page-description">
            Track GMV, commission, seller payouts, and refunds in one place.
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
            Export report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="stat-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500">{card.label}</p>
                <span className={clsx("rounded-lg p-2", card.tone)}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-xl font-bold text-gray-900">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center rounded-xl border border-gray-200 bg-white p-4">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search transaction, store..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="stat-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Type</th>
                <th>Description</th>
                <th>Store</th>
                <th className="text-right">Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filtered.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="font-semibold text-brand-700">
                      {transaction.transactionId}
                    </td>
                    <td>
                      <span
                        className={clsx(
                          "badge",
                          typeBadge[transaction.type] ?? "badge-neutral"
                        )}
                      >
                        {typeLabel[transaction.type] ?? transaction.type}
                      </span>
                    </td>
                    <td className="max-w-[280px] truncate text-gray-600">
                      {transaction.description}
                    </td>
                    <td className="text-gray-600">
                      {transaction.storeName ?? "—"}
                    </td>
                    <td
                      className={clsx(
                        "text-right font-semibold",
                        transaction.type === "refund"
                          ? "text-rose-600"
                          : transaction.type === "order_payment"
                            ? "text-emerald-600"
                            : "text-gray-900"
                      )}
                    >
                      {transaction.type === "refund" ? "-" : "+"}
                      {formatCurrencyIDR(transaction.amount)}
                    </td>
                    <td>
                      <span
                        className={clsx(
                          "badge capitalize",
                          transaction.status === "completed" && "badge-success",
                          transaction.status === "pending" && "badge-warning",
                          transaction.status === "failed" && "badge-danger"
                        )}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="text-xs text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stat-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Settlement summary
            </h2>
            <p className="text-xs text-gray-500">
              Automated payout batches run daily at 23:59 WIB.
            </p>
          </div>
          <ArrowUpRight className="h-5 w-5 text-gray-300" />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Pending settlement", formatCurrencyIDR(Math.round(gross * 0.15))],
            ["Available balance", formatCurrencyIDR(Math.round(gross * 0.8))],
            ["Reserved for refunds", formatCurrencyIDR(refunds)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="mt-1 text-base font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
