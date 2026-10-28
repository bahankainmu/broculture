/* =========================================================
   MONOLINE: Landing Page
   Interaksi: data brand, menu mobile, header, animasi gulir,
   penghitung angka, link aktif, form WhatsApp.
   ========================================================= */

/* ---------------------------------------------------------
   1. KONFIGURASI (DATA CONTOH: ganti dengan data asli)
   --------------------------------------------------------- */
const CONFIG = {
  brandName: "MONOLINE",

  // Tautan toko & sosial media resmi
  links: {
    shopee:    "https://shopee.co.id/monoline",
    tokopedia: "https://www.tokopedia.com/monoline",
    instagram: "https://www.instagram.com/monoline.id",
    tiktok:    "https://www.tiktok.com/@monoline.id",
  },

  // Handle yang ditampilkan di kartu sosial media
  handles: {
    instagram: "@monoline.id",
    tiktok:    "@monoline.id",
  },

  // Kontak penjualan
  contact: {
    whatsapp: "6281234567890",           // format internasional, tanpa +, spasi, atau tanda hubung
    whatsappDisplay: "+62 812-3456-7890", // teks yang ditampilkan
    email: "sales@monoline.id",
    address: "Jl. Contoh No. 123, Jakarta, Indonesia",
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
});
