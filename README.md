# MONOLINE: Landing Page Korporat T-shirt

Landing page satu halaman (single-page) dengan tema putih bersih dan aksen hitam minimalis.
Dibuat dengan HTML, CSS, dan JavaScript murni, tanpa framework dan tanpa proses build.

> **Penting:** nama brand, teks, tautan toko/sosial, dan kontak di proyek ini adalah **data contoh**.
> Ganti sesuai langkah di bagian "Kustomisasi".

## Struktur file

```
.
├── index.html     # struktur & konten halaman
├── style.css      # gaya, warna, font, responsif
├── script.js      # interaksi + blok CONFIG (data brand/link/kontak)
├── README.md
└── assets/        # BUAT folder ini untuk foto Anda
    ├── hero.jpg
    └── produk-1.jpg ... produk-6.jpg
```

## Menjalankan di komputer

**Cara cepat:** klik dua kali `index.html`, halaman terbuka di browser.

**Dengan server lokal (disarankan):**

```bash
# Python 3
python -m http.server 8000
# lalu buka http://localhost:8000
```

Alternatif: ekstensi **Live Server** di VS Code.

## Deploy (publikasi online)

Karena hanya file statis, deploy bisa gratis:

| Platform | Cara singkat |
|---|---|
| **Netlify** | Buka app.netlify.com/drop, seret satu folder proyek ke halaman tersebut. |
| **Cloudflare Pages** | Create project > Upload assets > unggah folder. |
| **Vercel** | Import repo GitHub, framework preset "Other", tanpa build command. |
| **GitHub Pages** | Push ke repo, lalu Settings > Pages > pilih branch `main` dan folder `/ (root)`. |
| **Hosting biasa (cPanel)** | Unggah semua file ke folder `public_html`. |

**Domain custom:** setelah deploy, tambahkan domain Anda di menu *Domains* platform, lalu atur
record DNS (A/CNAME) sesuai petunjuk platform. SSL (HTTPS) biasanya aktif otomatis.

## Kustomisasi

### 1. Nama brand, tautan, dan kontak
Buka `script.js`, ubah blok `CONFIG` di bagian paling atas:

- `brandName`: nama brand (otomatis berubah di logo, hero, footer, judul tab)
- `links`: URL Shopee, Tokopedia, Instagram, TikTok
- `handles`: teks akun sosial media yang ditampilkan
- `contact`: nomor WhatsApp (format `62812...`, tanpa `+`), email, alamat

Form kontak mengirim pesan lewat WhatsApp ke nomor di `CONFIG.contact.whatsapp`.

### 2. Foto
Buat folder `assets/` lalu masukkan foto dengan nama berikut:

| File | Dipakai di | Rasio disarankan |
|---|---|---|
| `assets/hero.jpg` | Hero (layar penuh) | 4:5 (potret) |
| `assets/produk-1.jpg` ... `produk-6.jpg` | 6 kartu produk | sekitar 1:1.1 |

Selama foto belum ada, halaman menampilkan ilustrasi placeholder. Jika nama file berbeda,
ubah atribut `src` pada tag `<img>` di `index.html`. Gunakan JPG/WebP dengan lebar 1200px
agar tetap ringan.

### 3. Warna
Buka `style.css`, edit variabel di blok `:root`:

```css
--bg: #ffffff;       /* latar utama */
--bg-soft: #f6f6f4;  /* latar section selang-seling */
--ink: #0a0a0a;      /* teks & aksen hitam */
--muted: #6b6b6b;    /* teks sekunder */
--line: #e8e8e6;     /* garis tipis */
--dark: #0a0a0a;     /* section kontak & footer */
```

### 4. Font
Font memakai Google Fonts. Untuk mengganti, ubah tautan `<link>` di `<head>` pada `index.html`,
lalu sesuaikan `--font-display` (judul) dan `--font-body` (isi) di `style.css`.

### 5. Popup produk
Klik kartu produk membuka popup berisi gambar, deskripsi, spesifikasi, dan tombol aksi.
Isinya diatur di objek `PRODUCTS` pada `script.js`:

- `type: "bisnis"` menampilkan tombol "Minta Penawaran via WhatsApp"
- `type: "konsumen"` menampilkan tombol Shopee dan Tokopedia (dari `CONFIG.links`)
- `specs` berisi pasangan `[label, nilai]`

Untuk produk baru: tambahkan atribut `data-product="idbaru"` pada kartunya di `index.html`,
lalu tambahkan entri `idbaru: { ... }` di `PRODUCTS`.

### 6. Teks, angka, dan produk
- Teks: edit langsung di `index.html`.
- Angka statistik: ubah atribut `data-count` dan `data-suffix` pada elemen `.stat-num`.
- Kartu produk: salin satu blok `<article class="card">` untuk menambah produk.
  Tambahkan juga ke grid (jumlah kolom diatur di `.grid` pada `style.css`).

## Fitur

- Smooth scrolling dengan offset header
- Header transparan yang berubah saat digulir, plus menu mobile
- Animasi muncul saat digulir (stagger) dan penghitung angka
- Popup detail produk (tutup dengan X, klik area gelap, atau Esc)
- Sorot menu sesuai section yang sedang dilihat
- Responsif penuh (desktop, tablet, ponsel)
- Menghormati pengaturan "reduce motion" pada perangkat pengguna
- Tanpa dependensi selain Google Fonts

## Catatan

- Ganti `<title>` dan `<meta name="description">` di `index.html` untuk SEO.
- Tambahkan favicon dengan `<link rel="icon" href="favicon.png">` di `<head>`.
