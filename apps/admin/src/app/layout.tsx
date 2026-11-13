import type { Metadata } from "next";
import "./globals.css";
import { AdminLayout } from "@/components/layout";

export const metadata: Metadata = {
  title: "Sokudo Platform Admin",
  description: "Marketplace administration, seller governance, and transaction oversight",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
