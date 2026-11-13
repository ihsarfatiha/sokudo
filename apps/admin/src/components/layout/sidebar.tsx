"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Sellers & Stores",
    href: "/sellers",
    icon: Store,
    badge: "4",
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Financials",
    href: "/financials",
    icon: DollarSign,
  },
  {
    label: "Disputes",
    href: "/disputes",
    icon: AlertTriangle,
    badge: "3",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300 lg:static lg:shadow-none",
          // Mobile state: translate off screen unless opened
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Width based on collapsed state on desktop
          collapsed ? "lg:w-[72px]" : "w-[260px]"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden"
            onClick={onCloseMobile}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 shadow-sm shadow-brand-500/30">
              <Shield className="h-5 w-5 text-white" />
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="overflow-hidden">
                <h1 className="truncate text-base font-bold text-gray-900 leading-tight">
                  Sokudo Admin
                </h1>
                <p className="truncate text-xs font-medium text-gray-400">
                  Marketplace Hub
                </p>
              </div>
            )}
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto p-3">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={clsx(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-50 font-semibold text-brand-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                title={collapsed && !mobileOpen ? item.label : undefined}
              >
                <Icon
                  className={clsx(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive
                      ? "text-brand-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                {(!collapsed || mobileOpen) && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={clsx(
                          "ml-auto rounded-full px-2 py-0.5 text-xs font-semibold",
                          item.badgeColor || "bg-brand-100 text-brand-700"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        {onToggleCollapse && (
          <div className="hidden border-t border-gray-200 p-3 lg:block">
            <button
              onClick={onToggleCollapse}
              className="flex w-full items-center justify-center gap-2 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <ChevronLeft className="h-5 w-5" />
                  <span>Collapse Menu</span>
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
