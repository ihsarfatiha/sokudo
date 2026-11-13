# Deployment

Panduan menaruh Sokudo di internet. Aplikasi terdiri dari tiga service terpisah:

```
        ┌──────────────────┐        ┌──────────────────┐
        │  web (Vercel)    │        │ admin (Vercel)   │
        │  port 3000       │        │ port 3001        │
        └────────┬─────────┘        └────────┬─────────┘
                 │  HTTPS (NEXT_PUBLIC_API_URL)
                 └───────────┬───────────────┘
                    ┌────────▼─────────┐
                    │  API (Render /   │
                    │  Railway) :4000  │
                    └────────┬─────────┘
                    ┌────────▼─────────┐
                    │ PostgreSQL (Neon)│
                    └──────────────────┘
```

| Service | Folder | Host yang disarankan | Free tier |
| --- | --- | --- | --- |
| Storefront | `apps/web` | Vercel | Ya |
| Panel admin | `apps/admin` | Vercel | Ya |
| REST API | `apps/api` | Render / Railway | Ya (dengan batas) |
| PostgreSQL | - | Neon / Supabase | Ya |

> GitHub Pages **tidak dipakai** karena hanya menyajikan file statis. Next.js di proyek ini butuh server (SSR, Server Component, dan data dari API).

---

## 1. Database (Neon)

1. Buat project di [neon.tech](https://neon.tech), pilih region terdekat (Singapore).
2. Salin connection string dari dashboard. Bentuknya:

   ```
   postgresql://USER:PASSWORD@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```

3. Simpan sebagai `DATABASE_URL` — nilainya dipakai di langkah API.

Alternatif: Supabase (ambil connection string **Direct** atau **Pooler** dengan `?sslmode=require`).

---

## 2. API (Render)

1. **New → Web Service**, hubungkan repository GitHub.
2. Isi konfigurasi:

   | Setting | Nilai |
   | --- | --- |
   | Root Directory | *(kosongkan — pakai root repo)* |
   | Runtime | Node |
   | Build Command | `npm ci && npm run prisma:generate --workspace=apps/api && npm run build --workspace=apps/api` |
   | Start Command | `npm run prisma:deploy --workspace=apps/api && npm run start:prod --workspace=apps/api` |
   | Health Check Path | `/api/products` |

3. Tambahkan environment variables:

   | Variabel | Nilai |
   | --- | --- |
   | `DATABASE_URL` | connection string Neon |
   | `JWT_SECRET` | string acak panjang, **jangan** pakai nilai contoh |
   | `JWT_EXPIRES_IN` | `7d` |
   | `NODE_ENV` | `production` |

   `PORT` diisi otomatis oleh Render.

4. Deploy. Migrasi awal (`prisma/migrations/0_init`) dijalankan otomatis oleh Start Command.
5. Setelah deploy pertama, isi data demo sekali lewat **Shell** di Render:

   ```bash
   npm run prisma:seed --workspace=apps/api
   ```

6. Cek API: `https://NAMA-SERVICE.onrender.com/api/products` harus mengembalikan JSON.

**Railway** kurang lebih sama: build command yang sama, start command yang sama, dan `DATABASE_URL` dari Neon.

Catatan: Render free tier tidur setelah idle, jadi request pertama bisa lambat 30–60 detik. Storefront tetap tampil karena punya fallback data demo.

---

## 3. Storefront (Vercel)

1. **Add New Project**, pilih repository yang sama.
2. **Root Directory** → `apps/web`. Ini wajib, karena `apps/web/vercel.json` memakai path relatif ke root repo.
3. Framework terdeteksi otomatis **Next.js**. Build & install command diambil dari `vercel.json`:

   ```json
   "installCommand": "cd ../.. && npm ci",
   "buildCommand": "cd ../.. && npm run build --workspace=apps/web"
   ```

   Perintah dijalankan dari `apps/web`, lalu `cd ../..` masuk ke root monorepo. Output build (`.next`) tetap di `apps/web`.

4. Environment variables (Production + Preview):

   | Variabel | Nilai |
   | --- | --- |
   | `NEXT_PUBLIC_API_URL` | `https://NAMA-SERVICE.onrender.com/api` |
   | `API_URL` | `https://NAMA-SERVICE.onrender.com/api` |

5. Deploy.

Kalau build gagal dengan pesan workspace/`node_modules` tidak ditemukan, buka **Settings → General → Root Directory** lalu aktifkan opsi untuk menyertakan file di luar root directory (dukungan monorepo).

---

## 4. Panel Admin (Vercel)

Sama seperti storefront, tapi:

| Setting | Nilai |
| --- | --- |
| Root Directory | `apps/admin` |
| Build command | dari `apps/admin/vercel.json` |
| `NEXT_PUBLIC_API_URL` | URL API yang sama |
| `API_URL` | URL API yang sama |

Kalau API hidup, badge di dashboard berubah dari **Demo** menjadi **Live API**.

---

## Ringkasan environment variables

| Service | Variabel wajib |
| --- | --- |
| API | `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_ENV` |
| Web | `NEXT_PUBLIC_API_URL`, `API_URL` |
| Admin | `NEXT_PUBLIC_API_URL`, `API_URL` |

Semua contoh tersedia di:

- `apps/api/.env.example`
- `apps/web/.env.example`
- `apps/admin/.env.example`

---

## Migrasi database

Migrasi awal sudah tersedia di `apps/api/prisma/migrations/0_init/migration.sql`, jadi deployment pertama tidak perlu PostgreSQL lokal.

Saat `schema.prisma` berubah:

```bash
# butuh DATABASE_URL lokal atau langsung ke database staging
npm run prisma:migrate --workspace=apps/api -- --name nama_perubahan
```

Commit folder `prisma/migrations`, lalu `prisma migrate deploy` (Start Command) akan menerapkannya di server.

---

## Checklist setelah deploy

- [ ] `GET /api/products` mengembalikan data
- [ ] Storefront menampilkan produk (bukan hanya data demo)
- [ ] Admin menampilkan badge **Live API**
- [ ] Checkout membuat pesanan dan stok berkurang
- [ ] Halaman `/orders` bisa melacak nomor pesanan
- [ ] Custom domain (opsional) sudah diarahkan di Vercel

---

## Catatan keamanan sebelum publik

Ini masih tahap demo. Sebelum dipakai sungguhan:

1. **`/api/admin/*` belum punya guard.** Saat ini siapa pun yang tahu URL bisa membaca statistik, pengguna, dan transaksi. Tambahkan `JwtAuthGuard` + `RolesGuard` (role `ADMIN`).
2. **CORS masih `origin: true`** di `apps/api/src/main.ts` (menerima semua origin). Batasi ke domain Vercel kamu.
3. **Ganti akun demo** (`admin@sokudo.id`, `buyer@sokudo.id`, seller) atau jangan jalankan `prisma:seed` di production.
4. **`JWT_SECRET`** harus acak dan berbeda antara lokal dan production.
5. **Pembayaran masih simulasi** — belum ada payment gateway/webhook nyata.
