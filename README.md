# Marketplace Architecture & Development Blueprint

Modular Monolith Multi-Vendor E-Commerce Platform.

## 1. Monorepo Structure

```
marketplace/
├── apps/
│   ├── web/        # Next.js (Buyer storefront + Seller dashboard)
│   ├── admin/      # Next.js (Platform admin panel)
│   └── api/        # NestJS Backend API
├── packages/       # Shared TypeScript types, schemas & utilities
│   ├── types/
│   └── common/
├── docker-compose.yml
└── README.md
```

## 2. Core Tech Stack
- **Frontend**: Next.js (React) + TypeScript + Tailwind CSS
- **Backend**: NestJS (Node.js/TypeScript)
- **Database**: PostgreSQL
- **Cache & Queue**: Redis + BullMQ
- **Search**: PostgreSQL Full-Text Search / Meilisearch
- **Storage**: S3-compatible (Cloudflare R2 / AWS S3)
- **Payments**: Midtrans / Xendit
- **Shipping**: Biteship / RajaOngkir

## 3. Core Data Models
- Users & Auth (Email+OTP, Google OAuth, Roles: buyer, seller, admin)
- Stores / Sellers (Profile, Products, Variants, Stock, Images)
- Catalog (Categories, Products, Filters, Reviews)
- Cart & Checkout (Multi-store checkout, Address, Shipping rate calculation)
- Orders & Payments (Escrow/Rekening bersama, Midtrans/Xendit webhook integration, Status workflow)
- Wallets & Payouts (Seller balance, withdrawal, platform commission)

## 4. Implementation Phasing
- **Phase 1 (MVP)**: Auth, Seller Store & Products, Catalog, Multi-store Cart & Checkout, Payments & Webhooks, Shipping & Order Management, Reviews, Seller & Admin Dashboards.
- **Phase 2**: Buyer-Seller Chat, Notifications (Email, Push, WA), Vouchers, Wishlist, Flash Sale, Escrow payout & Dispute resolution.
- **Phase 3**: Recommendations, Product Ads, Live Shopping, Mobile App.
