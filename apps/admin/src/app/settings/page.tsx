"use client";

import { useState } from "react";
import {
  Bell,
  CreditCard,
  Globe,
  Percent,
  Save,
  ShieldCheck,
  Truck,
} from "lucide-react";
import clsx from "clsx";

type Tab = "general" | "commission" | "payment" | "shipping" | "notifications";

const tabs: Array<{ id: Tab; label: string; icon: typeof Globe }> = [
  { id: "general", label: "General", icon: Globe },
  { id: "commission", label: "Commission", icon: Percent },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "notifications", label: "Notifications", icon: Bell },
];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-400">{hint}</span>}
    </label>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-3">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-brand-600" : "bg-gray-200"
        )}
      >
        <span
          className={clsx(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("general");
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    platformName: "Sokudo",
    supportEmail: "halo@sokudo.id",
    supportPhone: "021-555-0123",
    timezone: "Asia/Jakarta",
    currency: "IDR",
    maintenance: false,
  });

  const [commission, setCommission] = useState({
    rate: "5",
    paymentFee: "1.5",
    minPayout: "100000",
    autoApprove: false,
  });

  const [payment, setPayment] = useState({
    provider: "midtrans",
    bankTransfer: true,
    qris: true,
    cod: true,
    autoExpireHours: "24",
  });

  const [shipping, setShipping] = useState({
    defaultCourier: "jne",
    freeShippingMin: "300000",
    flatRate: "15000",
    sameDay: true,
  });

  const [notifications, setNotifications] = useState({
    newOrder: true,
    newSeller: true,
    dispute: true,
    payout: false,
    dailyDigest: true,
  });

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-description">
            Configure platform commission, payments, shipping, and admin
            notifications.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
          <ShieldCheck className="h-4 w-4" />
          Changes are validated before save
        </span>
      </div>

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 gap-6 xl:grid-cols-[220px_1fr]"
      >
        <nav className="flex gap-1 overflow-x-auto xl:flex-col">
          {tabs.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={clsx(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors xl:w-full",
                  tab === item.id
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="stat-card space-y-5">
          {tab === "general" && (
            <>
              <h2 className="text-base font-bold text-gray-900">
                General settings
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Platform name">
                  <input
                    className={inputClass}
                    value={general.platformName}
                    onChange={(event) =>
                      setGeneral({ ...general, platformName: event.target.value })
                    }
                  />
                </Field>
                <Field label="Timezone">
                  <select
                    className={inputClass}
                    value={general.timezone}
                    onChange={(event) =>
                      setGeneral({ ...general, timezone: event.target.value })
                    }
                  >
                    <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                    <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                    <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                  </select>
                </Field>
                <Field label="Support email">
                  <input
                    type="email"
                    className={inputClass}
                    value={general.supportEmail}
                    onChange={(event) =>
                      setGeneral({ ...general, supportEmail: event.target.value })
                    }
                  />
                </Field>
                <Field label="Support phone">
                  <input
                    className={inputClass}
                    value={general.supportPhone}
                    onChange={(event) =>
                      setGeneral({ ...general, supportPhone: event.target.value })
                    }
                  />
                </Field>
                <Field label="Currency">
                  <select
                    className={inputClass}
                    value={general.currency}
                    onChange={(event) =>
                      setGeneral({ ...general, currency: event.target.value })
                    }
                  >
                    <option value="IDR">IDR — Indonesian Rupiah</option>
                    <option value="USD">USD — US Dollar</option>
                  </select>
                </Field>
              </div>
              <Toggle
                label="Maintenance mode"
                description="Temporarily hide the storefront while deploying updates."
                checked={general.maintenance}
                onChange={(value) =>
                  setGeneral({ ...general, maintenance: value })
                }
              />
            </>
          )}

          {tab === "commission" && (
            <>
              <h2 className="text-base font-bold text-gray-900">
                Commission & fees
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Platform commission (%)"
                  hint="Applied to every completed order."
                >
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="0.1"
                    className={inputClass}
                    value={commission.rate}
                    onChange={(event) =>
                      setCommission({ ...commission, rate: event.target.value })
                    }
                  />
                </Field>
                <Field
                  label="Payment gateway fee (%)"
                  hint="Passed through from the payment provider."
                >
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    className={inputClass}
                    value={commission.paymentFee}
                    onChange={(event) =>
                      setCommission({
                        ...commission,
                        paymentFee: event.target.value,
                      })
                    }
                  />
                </Field>
                <Field
                  label="Minimum payout (IDR)"
                  hint="Sellers can withdraw once balance exceeds this."
                >
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={commission.minPayout}
                    onChange={(event) =>
                      setCommission({
                        ...commission,
                        minPayout: event.target.value,
                      })
                    }
                  />
                </Field>
              </div>
              <Toggle
                label="Auto-approve new sellers"
                description="Skip manual review for stores that pass document verification."
                checked={commission.autoApprove}
                onChange={(value) =>
                  setCommission({ ...commission, autoApprove: value })
                }
              />
            </>
          )}

          {tab === "payment" && (
            <>
              <h2 className="text-base font-bold text-gray-900">
                Payment methods
              </h2>
              <Field label="Payment provider">
                <select
                  className={inputClass}
                  value={payment.provider}
                  onChange={(event) =>
                    setPayment({ ...payment, provider: event.target.value })
                  }
                >
                  <option value="midtrans">Midtrans</option>
                  <option value="xendit">Xendit</option>
                  <option value="manual">Manual transfer</option>
                </select>
              </Field>
              <div className="space-y-2">
                <Toggle
                  label="Bank transfer"
                  description="Virtual account and manual transfer."
                  checked={payment.bankTransfer}
                  onChange={(value) =>
                    setPayment({ ...payment, bankTransfer: value })
                  }
                />
                <Toggle
                  label="QRIS"
                  description="Scan-to-pay with any Indonesian wallet."
                  checked={payment.qris}
                  onChange={(value) => setPayment({ ...payment, qris: value })}
                />
                <Toggle
                  label="Cash on delivery"
                  description="Allow buyers to pay the courier on arrival."
                  checked={payment.cod}
                  onChange={(value) => setPayment({ ...payment, cod: value })}
                />
              </div>
              <Field
                label="Payment expiry (hours)"
                hint="Unpaid orders are cancelled automatically after this window."
              >
                <input
                  type="number"
                  min="1"
                  max="72"
                  className={inputClass}
                  value={payment.autoExpireHours}
                  onChange={(event) =>
                    setPayment({
                      ...payment,
                      autoExpireHours: event.target.value,
                    })
                  }
                />
              </Field>
            </>
          )}

          {tab === "shipping" && (
            <>
              <h2 className="text-base font-bold text-gray-900">
                Shipping rules
              </h2>
              <Field label="Default courier">
                <select
                  className={inputClass}
                  value={shipping.defaultCourier}
                  onChange={(event) =>
                    setShipping({
                      ...shipping,
                      defaultCourier: event.target.value,
                    })
                  }
                >
                  <option value="jne">JNE</option>
                  <option value="jnt">J&amp;T Express</option>
                  <option value="sicepat">SiCepat</option>
                  <option value="gosend">GoSend</option>
                </select>
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Free shipping minimum (IDR)"
                  hint="Orders above this amount ship free."
                >
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={shipping.freeShippingMin}
                    onChange={(event) =>
                      setShipping({
                        ...shipping,
                        freeShippingMin: event.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="Flat shipping rate (IDR)">
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={shipping.flatRate}
                    onChange={(event) =>
                      setShipping({ ...shipping, flatRate: event.target.value })
                    }
                  />
                </Field>
              </div>
              <Toggle
                label="Same-day delivery"
                description="Show GoSend same-day option at checkout."
                checked={shipping.sameDay}
                onChange={(value) =>
                  setShipping({ ...shipping, sameDay: value })
                }
              />
            </>
          )}

          {tab === "notifications" && (
            <>
              <h2 className="text-base font-bold text-gray-900">
                Admin notifications
              </h2>
              <div className="space-y-2">
                <Toggle
                  label="New order"
                  description="Notify when a buyer completes checkout."
                  checked={notifications.newOrder}
                  onChange={(value) =>
                    setNotifications({ ...notifications, newOrder: value })
                  }
                />
                <Toggle
                  label="New seller registration"
                  description="Notify when a store submits documents for review."
                  checked={notifications.newSeller}
                  onChange={(value) =>
                    setNotifications({ ...notifications, newSeller: value })
                  }
                />
                <Toggle
                  label="Dispute opened"
                  description="Notify when a buyer escalates an order."
                  checked={notifications.dispute}
                  onChange={(value) =>
                    setNotifications({ ...notifications, dispute: value })
                  }
                />
                <Toggle
                  label="Payout completed"
                  description="Notify when a seller payout batch settles."
                  checked={notifications.payout}
                  onChange={(value) =>
                    setNotifications({ ...notifications, payout: value })
                  }
                />
                <Toggle
                  label="Daily digest"
                  description="Send a summary of platform activity every morning."
                  checked={notifications.dailyDigest}
                  onChange={(value) =>
                    setNotifications({ ...notifications, dailyDigest: value })
                  }
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400">
              Settings are stored locally in this demo build.
            </p>
            <button type="submit" className="btn btn-primary text-xs">
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
