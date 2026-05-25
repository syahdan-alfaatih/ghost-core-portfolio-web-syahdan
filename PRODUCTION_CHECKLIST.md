# Production Checklist

Tanggal pemeriksaan: 25 Mei 2026

## Status

**Rekomendasi final: siap deploy dengan catatan.**

Website adalah aplikasi React/Vite statis yang sesuai untuk diserve melalui Nginx. Build production menghasilkan folder `dist/`. Lint dan audit dependency perlu tetap lulus pada verifikasi akhir setiap release.

Hasil verifikasi revision ini:

- `npm ci`: berhasil.
- `npm run lint`: berhasil tanpa error atau warning.
- `npm run build`: berhasil dengan Vite `8.0.14`.
- `npm audit`: 0 vulnerability.

## Hal Yang Sudah Aman

- Framework teridentifikasi sebagai Vite + React, bukan Create React App atau Next.js.
- Command install reproducible adalah `npm ci`; build production adalah `npm run build`.
- Output yang diserve Nginx adalah `dist/`.
- Tidak ditemukan penggunaan `.env`, `import.meta.env`, `process.env`, token, API key, password, atau private key dalam sumber aplikasi yang diperiksa.
- `.gitignore` melindungi `.env` dan turunannya, sambil tetap memperbolehkan `.env.example`.
- Tidak ditemukan `console.log`, `debugger`, `TODO`, atau `FIXME` yang perlu dibersihkan untuk production.
- Tidak ada React Router/client-side URL routing; situs dapat diserve sebagai static site.
- Metadata dasar diperbarui untuk domain `syahdanit.my.id`: title, description, canonical URL, theme color, dan path favicon.
- Advisory dependency yang terdeteksi pada Vite dan PostCSS diremediasi melalui versi patch yang kompatibel.
- `npm ci` tidak melaporkan package deprecated pada instalasi verifikasi.
- Hero memakai WebM optimized sebagai source utama dan MP4 optimized sebagai fallback, dengan poster image untuk tampilan awal.

## Perlu Diperhatikan Sebelum Deploy

- Jalankan ulang `npm ci`, `npm run lint`, `npm run build`, dan `npm audit` pada revision yang benar-benar akan dipindahkan ke VPS.
- Validasi DNS serta sertifikat Certbot mencakup `syahdanit.my.id` dan `www.syahdanit.my.id` sebelum mengaktifkan konfigurasi HTTPS untuk keduanya.
- Video hero original `src/assets/scene1_videos/video4_bg.mp4` berukuran sekitar 20.8 MB tetap disimpan sebagai source, tetapi tidak lagi diimpor ke bundle production.
- Asset hero production berukuran sekitar 1.87 MB untuk WebM, 2.29 MB untuk MP4 fallback, dan 166 KB untuk poster JPG. Browser hanya memilih satu format video yang didukung.
- Konfigurasi `vite.config.js` menggunakan `base: './'`, yang cocok untuk halaman saat ini pada root domain. Jika kelak memakai `BrowserRouter`/deep link, asset base perlu ditinjau ulang bersama konfigurasi fallback Nginx.

## Improvement Opsional

- Hapus video hero original dari repository hanya setelah hasil optimized diterima dan backup source disimpan di lokasi yang disepakati.
- Pertimbangkan menghapus dependency `@react-three/drei`, `@react-three/fiber`, dan `three` apabila dipastikan tidak akan dipakai; tidak ada import dependency tersebut pada source aplikasi saat pemeriksaan.
- Tinjau aset yang tidak direferensikan aplikasi (`src/assets/hero.png`, `src/assets/react.svg`, dan `src/assets/vite.svg`) sebelum dihapus.
- Tinjau apakah workflow GitHub Pages (`homepage`, `gh-pages`, script `deploy`) masih diperlukan setelah target hosting utama berpindah ke VPS.
- Pantau kembali output `npm ls` saat toolchain diperbarui. Pada pemeriksaan Windows dengan npm 11, `@emnapi/wasi-threads` dan `tslib` tampil sebagai `extraneous` setelah clean install; keduanya terlihat terkait paket toolchain optional, tidak menggagalkan audit/lint/build, dan tidak menjadi asset runtime website.

## Risiko Yang Perlu Diperhatikan

- Autoplay tetap menyebabkan browser mengunduh format video yang dipilih ketika pemutaran diizinkan; poster dan `preload="metadata"` memperbaiki kondisi sebelum playback, sementara format optimized mengurangi transfer utama.
- Sertifikat yang hanya mencakup domain apex akan menyebabkan kegagalan HTTPS pada `www` bila server block `www` diaktifkan sebelum sertifikat diperluas.
- Menambahkan client-side routes tanpa menyesuaikan `base` dan pengujian deep link dapat menyebabkan asset tidak termuat pada URL bertingkat.

## Cleanup Yang Belum Dilakukan

Tidak ada dependency atau asset yang dihapus dalam pemeriksaan ini. Kandidat cleanup di atas benar-benar tidak direferensikan oleh source saat ini, tetapi penghapusannya ditahan karena dapat berkaitan dengan pekerjaan yang belum selesai atau rencana visual berikutnya.
