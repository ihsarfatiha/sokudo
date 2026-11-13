"use client";

import { useEffect, useState } from "react";
import { mockStores } from "@/data/mock-data";
import { SellerStore, StoreApprovalStatus } from "@/types/admin";
import { fetchAdmin } from "@/lib/api";
import { formatCurrencyIDR, formatDate } from "@/lib/format";
import {
  Store,
  CheckCircle,
  XCircle,
  FileText,
  Search,
  Star,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Package,
} from "lucide-react";
import clsx from "clsx";

export default function SellersManagementPage() {
  const [stores, setStores] = useState<SellerStore[]>(mockStores);
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<SellerStore | null>(null);
  const [source, setSource] = useState<"mock" | "api">("mock");

  useEffect(() => {
    let active = true;
    fetchAdmin<SellerStore[]>("/admin/stores").then((data) => {
      if (active && Array.isArray(data) && data.length > 0) {
        setStores(data);
        setSource("api");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const pendingStoresCount = stores.filter((s) => s.status === "pending").length;

  const filteredStores = stores.filter((store) => {
    const matchesTab = activeTab === "all" || store.status === "pending";
    const matchesSearch =
      store.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleUpdateStatus = (storeId: string, newStatus: StoreApprovalStatus) => {
    setStores((prev) =>
      prev.map((s) => (s.id === storeId ? { ...s, status: newStatus } : s))
    );
    if (selectedStore && selectedStore.id === storeId) {
      setSelectedStore((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Sellers & Stores Governance</h1>
          <p className="page-description">
            Audit merchant applications, verify business licenses (NIB/NPWP), and monitor store performance.
          </p>
        </div>
        <span
          className={clsx(
            "badge self-start",
            source === "api" ? "badge-success" : "badge-warning"
          )}
        >
          {source === "api" ? "Live API" : "Demo data"}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("all")}
          className={clsx(
            "border-b-2 py-3 px-4 text-sm font-medium transition-colors",
            activeTab === "all"
              ? "border-brand-600 text-brand-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          )}
        >
          All Stores ({stores.length})
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={clsx(
            "flex items-center gap-2 border-b-2 py-3 px-4 text-sm font-medium transition-colors",
            activeTab === "pending"
              ? "border-amber-600 text-amber-700 font-semibold"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          )}
        >
          <span>Pending Approvals</span>
          {pendingStoresCount > 0 && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
              {pendingStoresCount}
            </span>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center rounded-xl border border-gray-200 bg-white p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search stores by name, seller, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Store List Cards / Table */}
      <div className="stat-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Store & Merchant</th>
                <th>Category</th>
                <th>Status</th>
                <th>Rating & Sales</th>
                <th>Revenue (GMV)</th>
                <th>Registered</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-gray-500">
                    No stores found in this category.
                  </td>
                </tr>
              ) : (
                filteredStores.map((store) => (
                  <tr key={store.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 font-bold">
                          <Store className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{store.storeName}</p>
                          <p className="text-xs text-gray-500">
                            Owner: {store.sellerName} ({store.sellerEmail})
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                        {store.category}
                      </span>
                    </td>
                    <td>
                      <span
                        className={clsx(
                          "badge capitalize",
                          store.status === "approved" && "badge-success",
                          store.status === "pending" && "badge-warning font-semibold",
                          store.status === "rejected" && "badge-danger",
                          store.status === "suspended" && "badge-danger"
                        )}
                      >
                        {store.status === "pending" ? "Pending KYC" : store.status}
                      </span>
                    </td>
                    <td>
                      <div className="text-xs">
                        <div className="flex items-center gap-1 font-semibold text-gray-800">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>{store.rating > 0 ? store.rating : "New"}</span>
                        </div>
                        <p className="text-gray-400 mt-0.5">{store.totalSales} items sold</p>
                      </div>
                    </td>
                    <td className="font-medium text-gray-900">
                      {formatCurrencyIDR(store.totalRevenue)}
                    </td>
                    <td className="text-xs text-gray-500">{formatDate(store.registeredAt)}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedStore(store)}
                          className="btn btn-secondary py-1 px-2.5 text-xs"
                        >
                          Review KYC
                        </button>
                        {store.status === "pending" && (
                          <button
                            onClick={() => handleUpdateStatus(store.id, "approved")}
                            className="rounded bg-emerald-600 p-1.5 text-white hover:bg-emerald-700"
                            title="Quick Approve"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC / Store Review Drawer / Modal */}
      {selectedStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedStore.storeName}</h3>
                <p className="text-xs text-gray-500">
                  Seller: {selectedStore.sellerName} &bull; {selectedStore.sellerEmail}
                </p>
              </div>
              <button
                onClick={() => setSelectedStore(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Status Banner */}
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <span className="text-xs font-medium text-gray-500">Current Status</span>
                <span
                  className={clsx(
                    "badge capitalize text-xs",
                    selectedStore.status === "approved" && "badge-success",
                    selectedStore.status === "pending" && "badge-warning",
                    selectedStore.status === "suspended" && "badge-danger",
                    selectedStore.status === "rejected" && "badge-danger"
                  )}
                >
                  {selectedStore.status}
                </span>
              </div>

              {/* KYC Documents Verification */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <FileText className="h-4 w-4 text-brand-600" />
                  <span>Legal & KYC Verification Data</span>
                </h4>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Business License (NIB):</span>
                    <span className="font-mono font-medium text-gray-900">
                      {selectedStore.documents?.businessNumber || "Not uploaded"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Tax Identification (NPWP):</span>
                    <span className="font-mono font-medium text-gray-900">
                      {selectedStore.documents?.taxId || "Not uploaded"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-gray-500">Identity Card (KTP):</span>
                    <span className="font-medium text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {selectedStore.documents?.idCardVerified ? "Verified" : "Pending Verification"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Store Statistics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-[10px] text-gray-500 uppercase">Products</p>
                  <p className="text-sm font-bold text-gray-900">{selectedStore.totalProducts}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-[10px] text-gray-500 uppercase">Total Sales</p>
                  <p className="text-sm font-bold text-gray-900">{selectedStore.totalSales}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-[10px] text-gray-500 uppercase">Rating</p>
                  <p className="text-sm font-bold text-amber-600">
                    {selectedStore.rating > 0 ? selectedStore.rating : "-"}
                  </p>
                </div>
              </div>

              {/* Decision Actions */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Governance Actions:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedStore.id, "approved")}
                    className="btn btn-primary text-xs flex-1"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve Store
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedStore.id, "rejected")}
                    className="btn btn-danger text-xs flex-1"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject Application
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedStore.id, "suspended")}
                    className="btn btn-secondary text-xs text-rose-600 hover:text-rose-700"
                  >
                    Suspend Store
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedStore(null)}
                className="btn btn-secondary text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
