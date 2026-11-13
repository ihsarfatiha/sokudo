"use client";

import { useEffect, useState } from "react";
import { mockUsers } from "@/data/mock-data";
import { AdminUser, UserRole, UserStatus } from "@/types/admin";
import { fetchAdmin } from "@/lib/api";
import { formatDate } from "@/lib/format";
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  ShieldAlert,
  UserPlus,
  MoreVertical,
  CheckCircle,
  Ban,
} from "lucide-react";
import clsx from "clsx";

export default function UsersManagementPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [source, setSource] = useState<"mock" | "api">("mock");

  useEffect(() => {
    let active = true;
    fetchAdmin<AdminUser[]>("/admin/users").then((data) => {
      if (active && Array.isArray(data) && data.length > 0) {
        setUsers(data);
        setSource("api");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus: UserStatus = u.status === "active" ? "suspended" : "active";
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "active" ? "suspended" : "active",
            }
          : null
      );
    }
  };

  const changeUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser((prev) => (prev ? { ...prev, role: newRole } : null));
    }
  };

  const totalUsers = users.length;
  const activeBuyers = users.filter((u) => u.role === "buyer" && u.status === "active").length;
  const totalSellers = users.filter((u) => u.role === "seller").length;
  const suspendedUsers = users.filter((u) => u.status === "suspended").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Users Management</h1>
          <p className="page-description">
            Control platform access, verify roles, and enforce account governance policies.
          </p>
        </div>
        <button className="btn btn-primary self-start sm:self-auto text-xs">
          <UserPlus className="h-4 w-4" />
          <span>Invite Admin</span>
        </button>
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
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="stat-card p-4">
          <p className="text-xs font-medium text-gray-500">Total Registered</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{totalUsers}</p>
        </div>
        <div className="stat-card p-4">
          <p className="text-xs font-medium text-gray-500">Active Buyers</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{activeBuyers}</p>
        </div>
        <div className="stat-card p-4">
          <p className="text-xs font-medium text-gray-500">Verified Sellers</p>
          <p className="mt-1 text-2xl font-bold text-brand-600">{totalSellers}</p>
        </div>
        <div className="stat-card p-4">
          <p className="text-xs font-medium text-gray-500">Suspended Accounts</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">{suspendedUsers}</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="stat-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th>Total Orders</th>
                <th>Joined Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700 text-xs">
                          {user.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={clsx(
                          "badge capitalize",
                          user.role === "admin" && "badge-info font-bold",
                          user.role === "seller" && "badge-warning",
                          user.role === "buyer" && "badge-neutral"
                        )}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span
                        className={clsx(
                          "badge capitalize",
                          user.status === "active" && "badge-success",
                          user.status === "suspended" && "badge-danger",
                          user.status === "pending" && "badge-warning"
                        )}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="text-gray-600">{user.totalOrders} orders</td>
                    <td className="text-xs text-gray-500">{formatDate(user.joinedAt)}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 text-xs font-medium"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          title={user.status === "active" ? "Suspend user" : "Reactivate user"}
                          className={clsx(
                            "rounded p-1 text-xs font-medium",
                            user.status === "active"
                              ? "text-rose-600 hover:bg-rose-50"
                              : "text-emerald-600 hover:bg-emerald-50"
                          )}
                        >
                          {user.status === "active" ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management Slide-over / Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedUser.name}</h3>
                <p className="text-xs text-gray-500">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">Phone</label>
                <p className="text-sm font-medium text-gray-900">{selectedUser.phone || "Not provided"}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500">Role Permissions</label>
                <div className="mt-1 flex gap-2">
                  {(["buyer", "seller", "admin"] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => changeUserRole(selectedUser.id, role)}
                      className={clsx(
                        "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                        selectedUser.role === role
                          ? "bg-brand-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500">Account Governance</label>
                <div className="mt-2 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Status: <span className="capitalize">{selectedUser.status}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedUser.status === "active"
                        ? "Account has full platform access."
                        : "Account is barred from trading & buying."}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleUserStatus(selectedUser.id)}
                    className={clsx(
                      "btn text-xs py-1 px-3",
                      selectedUser.status === "active" ? "btn-danger" : "btn-primary"
                    )}
                  >
                    {selectedUser.status === "active" ? "Suspend" : "Activate"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="btn btn-secondary text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
