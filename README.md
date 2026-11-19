# AlurKit

Alat sederhana untuk UMKM F&B, berbentuk PWA (bisa di-install di HP, jalan offline, tanpa server).

| Aplikasi | Folder | Fungsi |
|---|---|---|
| Kasir | `kasir/` | Transaksi, nomor antrean, stok porsi, biaya, kas laci, laba per sesi (Bazar/Toko), PIN pemilik untuk menyembunyikan HPP |
| Kalkulator HPP | `hpp/` | HPP per porsi dari resep & bahan, harga jual per channel |

## Struktur
```
index.html            halaman depan
pwa.js                daftar service worker + tombol Install (dipakai semua aplikasi)
sw.js                 service worker (cache offline)
kasir/, hpp/          tiap aplikasi: index.html + manifest.webmanifest
icons/                ikon 192 & 512 px
.nojekyll             agar GitHub Pages tidak memproses file
```

## Rilis perubahan
1. Ubah file aplikasi.
2. **Naikkan versi `CACHE` di `sw.js`** (mis. `alurkit-v1` → `alurkit-v2`). Tanpa ini, HP pengguna bisa terus memakai versi lama.
3. Commit & push ke branch `main`. GitHub Pages memperbarui situs dalam 1–2 menit.

## Data
- Tersimpan di `localStorage` browser masing-masing HP (key `alurkit_kasir_v1` dan `hpp_fnb_v1`). Tidak ada server.
- Kedua aplikasi berada di domain yang sama, sehingga Kasir bisa membaca HPP dari Kalkulator di HP yang sama.
- Repo ini publik: **kode** terlihat orang, **data penjualan tidak** (tetap di HP).
