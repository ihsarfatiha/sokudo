"use client";

import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Store,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { DashboardMetrics } from "@/types/admin";
import { formatCurrencyIDR, formatCompactNumber } from "@/lib/format";
import Link from "next/link";

interface MetricsOverviewProps {
  metrics: DashboardMetrics;
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* GMV / Total Volume */}
      <div className="stat-card relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Gross Merchandise Value</span>
          <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-gray-900">
            {formatCurrencyIDR(metrics.totalRevenue)}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+{metrics.revenueGrowth}% from last month</span>
          </div>
        </div>
      </div>

      {/* Platform Net Commission */}
      <div className="stat-card relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Platform Commission (5%)</span>
          <div className="rounded-lg bg-brand-50 p-2 text-brand-600">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-gray-900">
            {formatCurrencyIDR(metrics.platformCommission)}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-600">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+{metrics.commissionGrowth}% take-rate revenue</span>
          </div>
        </div>
      </div>

      {/* Total Orders */}
      <div className="stat-card relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Total Orders</span>
          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
            <ShoppingCart className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-gray-900">
            {metrics.totalOrders.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+{metrics.ordersGrowth}% monthly growth</span>
          </div>
        </div>
      </div>

      {/* Active Users */}
      <div className="stat-card relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Active Users</span>
          <div className="rounded-lg bg-sky-50 p-2 text-sky-600">
            <Users className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-gray-900">
            {metrics.activeUsers.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+{metrics.usersGrowth}% new signups</span>
          </div>
        </div>
      </div>

      {/* Pending Seller Approvals (Action Required) */}
      <Link
        href="/sellers"
        className="stat-card group relative block border-amber-200 bg-amber-50/30 transition-all hover:border-amber-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-amber-900">Seller Approval Queue</span>
          <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
            <Store className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <p className="text-2xl font-bold tracking-tight text-amber-900">
            {metrics.pendingSellerApprovals}
          </p>
          <span className="text-xs font-medium text-amber-700 group-hover:underline">
            Review submissions &rarr;
          </span>
        </div>
        <p className="mt-1 text-xs text-amber-700">Stores awaiting KYC validation</p>
      </Link>

      {/* Active Disputes (Action Required) */}
      <Link
        href="/disputes"
        className="stat-card group relative block border-rose-200 bg-rose-50/30 transition-all hover:border-rose-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-rose-900">Active Disputes</span>
          <div className="rounded-lg bg-rose-100 p-2 text-rose-700">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <p className="text-2xl font-bold tracking-tight text-rose-900">
            {metrics.activeDisputes}
          </p>
          <span className="text-xs font-medium text-rose-700 group-hover:underline">
            Mediate disputes &rarr;
          </span>
        </div>
        <p className="mt-1 text-xs text-rose-700">Orders flagged for mediation</p>
      </Link>
    </div>
  );
}
