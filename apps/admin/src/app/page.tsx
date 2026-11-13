import { MetricsOverview } from "@/components/dashboard/metrics-overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import {
  initialMetrics,
  mockOrders,
  mockStores,
  mockDisputes,
} from "@/data/mock-data";
import { fetchAdmin } from "@/lib/api";
import { ShieldCheck, Download, RefreshCw } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, apiOrders, apiStores] = await Promise.all([
    fetchAdmin<Partial<typeof initialMetrics>>("/admin/stats"),
    fetchAdmin<typeof mockOrders>("/admin/orders"),
    fetchAdmin<typeof mockStores>("/admin/stores"),
  ]);

  const metrics = stats ? { ...initialMetrics, ...stats } : initialMetrics;
  const orders =
    Array.isArray(apiOrders) && apiOrders.length > 0 ? apiOrders : mockOrders;
  const stores =
    Array.isArray(apiStores) && apiStores.length > 0 ? apiStores : mockStores;
  const pendingStores = stores.filter((s) => s.status === "pending");
  const isLive = Boolean(stats);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Platform Administration
            </h1>
            <span
              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${
                isLive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                  isLive ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              {isLive ? "Live API" : "Demo data"}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Real-time multi-tenant marketplace operations, seller governance, and transaction metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn btn-secondary text-xs">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button className="btn btn-primary text-xs">
            <RefreshCw className="h-4 w-4" />
            <span>Sync Stats</span>
          </button>
        </div>
      </div>

      {/* Main Metric Cards */}
      <MetricsOverview metrics={metrics} />

      {/* Security & System Status Banner */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-600 p-2 text-white shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Escrow & Settlement Engine Operating Normally
              </h3>
              <p className="mt-0.5 text-xs text-gray-600">
                Automated payout batches scheduled daily at 23:59 WIB. All multi-vendor commissions are auto-calculated at 5.0%.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-gray-500">Service SLA: 99.98%</span>
          </div>
        </div>
      </div>

      {/* Live Order & Resolution Stream */}
      <RecentActivity
        orders={orders}
        pendingStores={pendingStores}
        disputes={mockDisputes}
      />
    </div>
  );
}
