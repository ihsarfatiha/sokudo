'use client';

import { useEffect, useState } from 'react';

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    hours: String(Math.floor(total / 3600)).padStart(2, '0'),
    minutes: String(Math.floor((total % 3600) / 60)).padStart(2, '0'),
    seconds: String(total % 60).padStart(2, '0'),
  };
}

export function FlashSaleCountdown() {
  const [time, setTime] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      setTime(parts(end.getTime() - now.getTime()));
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5" aria-label="Sisa waktu flash sale hari ini">
      {[
        ['Jam', time?.hours],
        ['Menit', time?.minutes],
        ['Detik', time?.seconds],
      ].map(([label, value]) => (
        <div key={label} className="text-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold tabular-nums text-white">
            {value ?? '--'}
          </span>
          <span className="mt-1 block text-[10px] font-medium uppercase tracking-wide text-gray-500">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
