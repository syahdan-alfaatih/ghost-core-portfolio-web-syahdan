# Deployment Portfolio Syahdan ke VPS

## Ringkasan Teknologi

- Aplikasi: single-page static website berbasis React 19.
- Build tool: Vite 8 dengan `@vitejs/plugin-react`.
- Styling: Tailwind CSS 3 dan PostCSS/Autoprefixer.
- Ikon: Lucide React.
- Output production: folder `dist/`.
- Runtime production: file statis; aplikasi tidak membutuhkan proses Node.js setelah hasil build disalin ke Nginx.
- Routing: saat ini tidak memakai React Router atau client-side route berbasis URL. Navigasi hanya scroll ke section.

Konfigurasi saat ini memakai `base: './'` pada `vite.config.js`. Ini dapat diserve pada root domain `https://syahdanit.my.id/`. Jika nantinya ditambah `BrowserRouter` dengan deep link, gunakan asset base root (`/`) agar asset pada URL bertingkat tidak menjadi relatif terhadap route.

## Prasyarat Ubuntu 24.04

Di VPS, siapkan:

- User deployment `syahdan` dengan akses `sudo`.
- DNS `A`/`AAAA` untuk `syahdanit.my.id` dan `www.syahdanit.my.id` menuju VPS.
- Nginx, Git, `rsync`, dan `curl`.
- Node.js yang memenuhi kebutuhan Vite 8: `^20.19.0` atau `>=22.12.0`. Node.js 22 LTS yang masih didukung adalah pilihan yang wajar.
- npm yang disertakan oleh instalasi Node.js.
- Certbot yang sudah terpasang dan sertifikat valid untuk nama domain yang dilayani.

```bash
sudo apt update
sudo apt install -y nginx git rsync curl
node --version
npm --version
sudo nginx -v
sudo certbot certificates
```

Jangan mengandalkan versi Node.js repository bawaan tanpa memeriksa versinya. Instal Node.js dari metode administrasi server yang digunakan, lalu pastikan memenuhi requirement di atas.

## Source Code dan Build

Struktur folder yang disarankan:

```text
/home/syahdan/apps/portfolio        # source code dan proses build
/var/www/syahdanit.my.id/html       # hanya isi hasil build untuk Nginx
```

Instal dependency secara reproducible dari lockfile dan buat build:

```bash
cd /home/syahdan/apps/portfolio
npm ci
npm run build
```

Command project:

```bash
npm ci          # install dependency deployment
npm run dev     # development lokal
npm run lint    # pemeriksaan lint
npm run build   # build production ke dist/
npm run preview # preview hasil build, bukan server production
```

Salin hasil build ke document root Nginx:

```bash
sudo install -d -o www-data -g www-data /var/www/syahdanit.my.id/html
sudo rsync -a --delete /home/syahdan/apps/portfolio/dist/ /var/www/syahdanit.my.id/html/
sudo chown -R www-data:www-data /var/www/syahdanit.my.id/html
```

`--delete` dimaksudkan agar file asset ber-hash dari build lama tidak menumpuk di document root. Pastikan source `dist/` telah berhasil dibangun sebelum menjalankan perintah tersebut.

## Konfigurasi Nginx

Buat atau sesuaikan `/etc/nginx/sites-available/syahdanit.my.id`. Contoh ini menggunakan domain apex sebagai URL kanonis dan mengasumsikan sertifikat Certbot mencakup kedua nama domain:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name syahdanit.my.id www.syahdanit.my.id;

    return 301 https://syahdanit.my.id$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name www.syahdanit.my.id;

    ssl_certificate /etc/letsencrypt/live/syahdanit.my.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/syahdanit.my.id/privkey.pem;

    return 301 https://syahdanit.my.id$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name syahdanit.my.id;

    root /var/www/syahdanit.my.id/html;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/syahdanit.my.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/syahdanit.my.id/privkey.pem;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location = /favicon.svg {
        try_files $uri =404;
        expires 7d;
    }
}
```

Aplikasi saat ini belum memakai React Router, sehingga fallback `try_files ... /index.html` belum diperlukan untuk route aplikasi. Fallback tetap aman untuk SPA ini dan sudah disertakan agar konfigurasi siap apabila client-side routing ditambahkan kemudian.

Folder `/assets/` berisi nama file ber-hash dari build Vite sehingga aman diberi cache immutable. `favicon.svg` tidak ber-hash dan diberi cache lebih singkat agar pembaruan ikon tidak tertahan lama di browser.

Aktifkan konfigurasi dan uji Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/syahdanit.my.id /etc/nginx/sites-enabled/syahdanit.my.id
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl status nginx --no-pager
```

Jika symlink sudah ada, tidak perlu membuatnya ulang.

## Pengujian Domain

Setelah DNS, build, Nginx, dan SSL siap:

```bash
curl -I http://syahdanit.my.id
curl -I https://syahdanit.my.id
curl -I https://www.syahdanit.my.id
curl -I https://syahdanit.my.id/favicon.svg
```

Hasil yang diharapkan:

- HTTP mengarah ke `https://syahdanit.my.id/...`.
- HTTPS domain utama merespons `200`.
- HTTPS `www` mengarah ke domain utama.
- Favicon merespons `200`.

## Catatan SSL Certbot

Certbot disebut sudah dipasang untuk `syahdanit.my.id`. Periksa sertifikat aktual dengan `sudo certbot certificates` sebelum mengaktifkan server block HTTPS. Konfigurasi di atas hanya valid untuk `www.syahdanit.my.id` apabila sertifikat juga memuat SAN `www.syahdanit.my.id` dan DNS `www` sudah menuju VPS.

Apabila sertifikat belum mencakup `www`, perluas sertifikat melalui Certbot setelah DNS benar:

```bash
sudo certbot --nginx -d syahdanit.my.id -d www.syahdanit.my.id
sudo nginx -t
sudo systemctl reload nginx
```

Jangan menyimpan private key, file `/etc/letsencrypt`, token, atau password di repository source.

## Checklist Update Deploy Berikutnya

- Tarik perubahan terbaru di `/home/syahdan/apps/portfolio`.
- Pastikan tidak ada `.env`, key, atau credential yang ikut masuk repository.
- Jalankan `npm ci`.
- Jalankan `npm run lint`.
- Jalankan `npm run build`.
- Periksa bahwa output tersedia di `dist/`.
- Salin `dist/` dengan `rsync` ke `/var/www/syahdanit.my.id/html/`.
- Jalankan `sudo nginx -t`.
- Reload Nginx bila konfigurasi berubah.
- Uji halaman utama, favicon, asset utama, dan respons domain dengan `curl`.
- Periksa browser di layar mobile dan desktop setelah perubahan UI atau asset.
