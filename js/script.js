"use strict";

// Tema

const $themeBtn = document.querySelector("[data-theme-btn]");
const $HTML = document.documentElement;
let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (sessionStorage.getItem("theme")) {
   $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
   $HTML.dataset.theme = isDark ? "dark" : "light";
   sessionStorage.setItem("theme", $HTML.dataset.theme);
}

const changeTheme = () => {
   $HTML.dataset.theme = sessionStorage.getItem("theme") === "light" ? "dark" : "light";
   sessionStorage.setItem("theme", $HTML.dataset.theme);
}

$themeBtn.addEventListener("click", changeTheme);

// FUNGSI TAB MENU

const $tabBtns = document.querySelectorAll("[data-tab-btn]");
let [lastActiveTab] = document.querySelectorAll("[data-tab-content]");
let [lastActiveTabBtn] = $tabBtns;

$tabBtns.forEach(item => {
   item.addEventListener("click", function () {

      lastActiveTab.classList.remove("active");
      lastActiveTabBtn.classList.remove("active");

      const $tabContent = document.querySelector(`[data-tab-content="${item.dataset.tabBtn}"]`);
      $tabContent.classList.add("active");
      this.classList.add("active");

      lastActiveTab = $tabContent;
      lastActiveTabBtn = this;

   })
});

function sendWA(event) {
   event.preventDefault(); // Mencegah reload halaman

   let waNumber = "6281278389617"; // Ganti dengan nomor WA yang benar
   let name = document.getElementById("submitName").value;
   let email = document.getElementById("submitEmail").value;
   let subject = document.getElementById("submitSubject").value;
   let message = document.getElementById("submitMessage").value;

   let text = `Halo, saya ingin menghubungi Anda:\n\n` +
      `*Nama:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Subjek:* ${subject}\n` +
      `*Pesan:* ${message}`;

   let encodedText = encodeURIComponent(text);
   let WAUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

   window.open(WAUrl, "_blank"); // Membuka WhatsApp di tab baru
}

function filterProjects(category, element) {
   let projects = document.querySelectorAll(".card");
   let buttons = document.querySelectorAll(".filter-btn");

   projects.forEach(project => {
      if (category === "all") {
         project.style.display = "block"; // Tampilkan semua project
      } else {
         if (project.classList.contains(category)) {
            project.style.display = "block"; // Tampilkan project sesuai kategori
         } else {
            project.style.display = "none"; // Sembunyikan project lain
         }
      }
   });

   // Menghapus kelas "active" dari semua tombol filter
   buttons.forEach(btn => {
      btn.classList.remove("colored");
   });

   // Tambahkan kelas "active" pada tombol yang diklik
   element.classList.add("colored");
}

// Memanggil fungsi saat halaman dimuat untuk menampilkan semua project
document.addEventListener("DOMContentLoaded", function() {
   filterProjects("all", document.querySelector(".filter-btn"));
});

