/* =========================================================
   BROCULTURE: Landing Page
   Interaksi: data brand, menu mobile, header, animasi gulir,
   penghitung angka, link aktif, form WhatsApp.
   ========================================================= */

/* ---------------------------------------------------------
   1. KONFIGURASI (DATA CONTOH: ganti dengan data asli)
   --------------------------------------------------------- */
const CONFIG = {
  brandName: "BROCULTURE",

  // Tautan toko & sosial media resmi
  links: {
    shopee:    "https://shopee.co.id/broculture",
    tokopedia: "https://www.tokopedia.com/broculture",
    instagram: "https://www.instagram.com/broculture.id",
    tiktok:    "https://www.tiktok.com/@broculture.id",
  },

  // Handle yang ditampilkan di kartu sosial media
  handles: {
    instagram: "@broculture.id",
    tiktok:    "@broculture.id",
  },

  // Kontak penjualan
  contact: {
    whatsapp: "6281234567890",           // format internasional, tanpa +, spasi, atau tanda hubung
    whatsappDisplay: "+62 812-3456-7890", // teks yang ditampilkan
    email: "sales@broculture.id",
    address: "Jl. Contoh No. 123, Jakarta, Indonesia",
  },
};

/* ---------------------------------------------------------
   1b. DATA PRODUK UNTUK POPUP (DATA CONTOH: ganti dengan data asli)
   Kunci (grosir, korporat, ...) harus sama dengan atribut
   data-product pada kartu di index.html.
   type: "bisnis"   -> tombol "Minta Penawaran" (WhatsApp)
         "konsumen" -> tombol Shopee & Tokopedia
   --------------------------------------------------------- */
const PRODUCTS = {
  grosir: {
    type: "bisnis", tag: "Solusi Bisnis",
    title: "Grosir & Reseller",
    img: "assets/produk-1.jpg",
    desc: "Pasokan kaos siap kirim dengan harga bertingkat untuk toko, reseller, dan distributor. Stok terpusat menjaga ketersediaan ukuran dan warna.",
    specs: [["Minimum order", "12 pcs"], ["Pilihan ukuran", "S - XXL"], ["Harga", "Bertingkat sesuai jumlah"], ["Pengiriman", "Seluruh Indonesia"]],
  },
  korporat: {
    type: "bisnis", tag: "Solusi Bisnis",
    title: "Kaos Korporat & Seragam",
    img: "assets/produk-2.jpg",
    desc: "Kaos custom dengan sablon atau bordir logo untuk perusahaan, komunitas, event, dan program merchandise.",
    specs: [["Minimum order", "24 pcs"], ["Teknik", "Sablon DTF / Plastisol / Bordir"], ["Waktu produksi", "7 - 14 hari kerja"], ["Revisi desain", "Hingga 2 kali"]],
  },
  oem: {
    type: "bisnis", tag: "Solusi Bisnis",
    title: "OEM & Private Label",
    img: "assets/produk-3.jpg",
    desc: "Bangun brand kaos Anda sendiri. Kami bantu dari pemilihan bahan, pembuatan pola, sampel, hingga produksi massal dengan label Anda.",
    specs: [["Minimum order", "300 pcs / desain"], ["Layanan", "Pola, sampel, label, packing"], ["Waktu produksi", "21 - 35 hari kerja"], ["Sampel", "Tersedia"]],
  },
  essential: {
    type: "konsumen", tag: "Konsumen",
    title: "Essential Tee",
    img: "assets/produk-4.jpg",
    desc: "Kaos harian yang lembut, adem, dan awet. Potongan regular fit yang mudah dipadukan untuk keseharian.",
    specs: [["Bahan", "Katun combed 30s"], ["Potongan", "Regular fit"], ["Ukuran", "S - XXL"], ["Warna", "Hitam, putih, abu, navy"]],
  },
  heavyweight: {
    type: "konsumen", tag: "Konsumen",
    title: "Heavyweight Tee",
    img: "assets/produk-5.jpg",
    desc: "Bahan tebal dengan potongan tegas dan jatuh yang rapi, memberi tampilan premium yang tetap nyaman dipakai.",
    specs: [["Bahan", "Katun 240 gsm"], ["Potongan", "Boxy fit"], ["Ukuran", "S - XXL"], ["Warna", "Hitam, putih, krem"]],
  },
  oversize: {
    type: "konsumen", tag: "Konsumen",
    title: "Oversize Tee",
    img: "assets/produk-6.jpg",
    desc: "Siluet longgar modern dengan bahan nyaman, mudah dipadukan untuk gaya sehari-hari.",
    specs: [["Bahan", "Katun combed 24s"], ["Potongan", "Oversize"], ["Ukuran", "M - XXL"], ["Warna", "Hitam, putih, abu"]],
  },
};

/* ---------------------------------------------------------
   2. TERAPKAN DATA CONFIG KE HALAMAN
   --------------------------------------------------------- */
function applyConfig() {
  // Nama brand di semua elemen [data-brand]
  document.querySelectorAll("[data-brand]").forEach((el) => {
    el.textContent = CONFIG.brandName;
  });

  // Tautan toko & sosial ([data-link="shopee"], dst.)
  document.querySelectorAll("[data-link]").forEach((el) => {
    const url = CONFIG.links[el.dataset.link];
    if (url) el.href = url;
  });

  // Handle sosial media
  document.querySelectorAll("[data-handle]").forEach((el) => {
    const handle = CONFIG.handles[el.dataset.handle];
    if (handle) el.textContent = handle;
  });

  // Kontak
  const c = CONFIG.contact;
  const wa = document.querySelector('[data-contact="whatsapp"]');
  if (wa) {
    wa.href = `https://wa.me/${c.whatsapp}`;
    wa.textContent = c.whatsappDisplay;
  }
  const mail = document.querySelector('[data-contact="email"]');
  if (mail) {
    mail.href = `mailto:${c.email}`;
    mail.textContent = c.email;
  }
  const addr = document.querySelector('[data-contact="address"]');
  if (addr) addr.textContent = c.address;

  // Tahun di footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Judul tab browser
  document.title = `${CONFIG.brandName} | Spesialis T-shirt Berkualitas`;
}

/* ---------------------------------------------------------
   3. HEADER: beri latar saat halaman digulir
   --------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------------------------------------------------------
   4. MENU MOBILE
   --------------------------------------------------------- */
function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Tutup menu setelah salah satu tautan diklik
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));

  // Tutup dengan tombol Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

/* ---------------------------------------------------------
   5. ANIMASI MUNCUL SAAT DIGULIR (.reveal)
   --------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");

  // Fallback: browser lama tanpa IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target); // animasi sekali saja
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
  );

  items.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------
   6. PENGHITUNG ANGKA (.stat-num[data-count])
   --------------------------------------------------------- */
function initCounters() {
  const nums = document.querySelectorAll("[data-count]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = new Intl.NumberFormat("id-ID");

  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduce) {
      el.textContent = fmt.format(target) + suffix;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out
      el.textContent = fmt.format(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    nums.forEach(run);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  nums.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------
   7. SOROT LINK NAVIGASI SESUAI SECTION YANG TERLIHAT
   --------------------------------------------------------- */
function initActiveNav() {
  if (!("IntersectionObserver" in window)) return;
  const links = document.querySelectorAll(".nav-link");
  const map = new Map();
  links.forEach((a) => map.set(a.getAttribute("href").slice(1), a));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => a.classList.remove("is-active"));
          const link = map.get(entry.target.id);
          if (link) link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" } // aktif saat section ada di tengah layar
  );

  map.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) io.observe(section);
  });
}

/* ---------------------------------------------------------
   8. FORM KONTAK -> PESAN WHATSAPP (tanpa backend)
   --------------------------------------------------------- */
function initForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validasi sederhana: nama, kebutuhan, pesan wajib diisi
    let valid = true;
    ["nama", "pesan"].forEach((name) => {
      const field = form.elements[name];
      const empty = !field.value.trim();
      field.classList.toggle("is-invalid", empty);
      if (empty) valid = false;
    });

    if (!valid) {
      note.textContent = "Mohon lengkapi nama dan pesan Anda.";
      return;
    }

    const d = new FormData(form);
    const text =
      `Halo ${CONFIG.brandName}, saya ${d.get("nama")}` +
      (d.get("perusahaan") ? ` dari ${d.get("perusahaan")}` : "") +
      `.\nKebutuhan: ${d.get("kebutuhan")}\n\n${d.get("pesan")}`;

    const url = `https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
    note.textContent = "Membuka WhatsApp...";
    form.reset();
  });

  // Hapus tanda error saat pengguna mengetik
  form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
}

/* ---------------------------------------------------------
   8b. POPUP PRODUK
   Klik kartu produk -> modal terbuka dengan detail dari PRODUCTS.
   Tutup: tombol X, klik area gelap, atau Esc. Fokus dijaga di dalam modal.
   --------------------------------------------------------- */
function initProductModal() {
  const modal = document.getElementById("productModal");
  const dialog = modal.querySelector(".modal-dialog");
  const els = {
    img: document.getElementById("modalImg"),
    tag: document.getElementById("modalTag"),
    title: document.getElementById("modalTitle"),
    desc: document.getElementById("modalDesc"),
    specs: document.getElementById("modalSpecs"),
    actions: document.getElementById("modalActions"),
  };
  let lastFocus = null;

  // Buat tombol/tautan aksi di dalam modal
  const makeLink = (label, href, cls) => {
    const a = document.createElement("a");
    a.className = "btn " + cls;
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = label;
    return a;
  };

  const fill = (p) => {
    // Gambar: jika file belum ada, sembunyikan agar placeholder tetap tampil
    els.img.style.display = "";
    els.img.onerror = () => { els.img.style.display = "none"; };
    els.img.src = p.img;
    els.img.alt = p.title;

    els.tag.textContent = p.tag;
    els.tag.className = "tag" + (p.type === "konsumen" ? " tag-line" : "");
    els.title.textContent = p.title;
    els.desc.textContent = p.desc;

    els.specs.innerHTML = "";
    p.specs.forEach(([k, v]) => {
      const li = document.createElement("li");
      const s = document.createElement("span"); s.textContent = k;
      const b = document.createElement("b");    b.textContent = v;
      li.append(s, b);
      els.specs.appendChild(li);
    });

    els.actions.innerHTML = "";
    if (p.type === "konsumen") {
      els.actions.append(
        makeLink("Beli di Shopee", CONFIG.links.shopee, "btn-dark"),
        makeLink("Beli di Tokopedia", CONFIG.links.tokopedia, "btn-ghost")
      );
    } else {
      const text = `Halo ${CONFIG.brandName}, saya tertarik dengan ${p.title}. Mohon info penawaran dan ketentuannya.`;
      els.actions.append(
        makeLink("Minta Penawaran via WhatsApp", `https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(text)}`, "btn-dark")
      );
    }
    modal.querySelector(".modal-body").scrollTop = 0;
  };

  const open = (id) => {
    const p = PRODUCTS[id];
    if (!p) return;
    lastFocus = document.activeElement;
    fill(p);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    dialog.focus();
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  };

  // Klik di mana saja pada kartu (termasuk tombol "Lihat detail") membuka popup
  document.querySelectorAll(".card[data-product]").forEach((card) => {
    card.addEventListener("click", () => open(card.dataset.product));
  });

  // Tutup: tombol X dan area gelap (elemen [data-close])
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") { close(); return; }

    // Jaga fokus keyboard tetap di dalam modal (focus trap)
    if (e.key === "Tab") {
      const f = modal.querySelectorAll("a[href], button");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
}

/* ---------------------------------------------------------
   9. JALANKAN SEMUA SETELAH DOM SIAP
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initHeader();
  initMenu();
  initReveal();
  initCounters();
  initActiveNav();
  initForm();
  initProductModal();
});
