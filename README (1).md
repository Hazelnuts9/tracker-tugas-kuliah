# Tracker Tugas & Deadline Kuliah

Aplikasi mobile sederhana untuk mencatat dan memantau tugas kuliah beserta deadline-nya. Dibuat dengan **React Native (Expo)** dan **TypeScript** sebagai Tugas Pekan Demo mata kuliah **Pemrograman Mobile**, Laboratorium Informatika, Universitas Muhammadiyah Malang.

> Project ini akan terus dikembangkan sepanjang Modul 1-6.

---

## Fitur (Modul 1)

- **Daftar tugas**: menampilkan judul, mata kuliah, deadline, dan status tiap tugas.
- **Badge status berwarna**: Belum Mulai (merah), Dikerjakan (kuning), Selesai (hijau).
- **Warna deadline dinamis**: merah untuk tugas yang belum selesai, abu-abu untuk yang sudah selesai.
- **Ringkasan jumlah tugas** per status di bagian atas layar.
- **Pencarian tugas** berdasarkan judul atau mata kuliah (tidak membedakan huruf besar/kecil).
- **Pesan "Tugas tidak ditemukan"** saat hasil pencarian kosong.

---

## Teknologi

| Teknologi | Kegunaan |
|---|---|
| React Native + Expo | Framework aplikasi mobile |
| Expo Router | Navigasi berbasis file (tab) |
| TypeScript | Pengetikan data yang aman |

---

## Struktur Folder

```
tracker-tugas-kuliah/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Pengaturan tab dan judul header
│   │   ├── index.tsx        # Halaman utama: daftar tugas
│   │   └── two.tsx          # Halaman tab kedua
│   ├── _layout.tsx
│   ├── +html.tsx
│   ├── +not-found.tsx
│   └── modal.tsx
├── constants/
│   ├── Colors.ts
│   └── styles.ts            # External styling
├── types/
│   └── tugas.ts             # Type & interface data tugas
├── components/
├── assets/
└── package.json
```

---

## Cara Menjalankan

**Prasyarat:** Node.js, npm, dan aplikasi **Expo Go** di ponsel (Android/iOS).

```bash
# 1. Clone repository
git clone <url-repository>
cd tracker-tugas-kuliah

# 2. Install dependency
npm install

# 3. Jalankan aplikasi dengan Expo Go
npx expo start --go
```

Lalu pindai QR code yang muncul di terminal menggunakan Expo Go. Untuk membuka di browser, tekan `w` di terminal.

---

## Struktur Data

```ts
export type StatusTugas = "belum" | "proses" | "selesai";

export interface Tugas {
  readonly id: string;
  judul: string;
  matkul: string;
  deadline: string;
  status: StatusTugas;
}
```

---

## Penerapan Materi Modul 1

| Materi | Penerapan di aplikasi |
|---|---|
| Struktur dasar React | `export default function Index()` dengan satu root `<View>` pada `return` |
| Komponen dasar | `View`, `Text`, `TextInput`, `FlatList` |
| Custom function | `getStatusColor`, `getStatusLabel`, `getDeadlineColor`, `hitungStatus` |
| Loop | `for` pada `hitungStatus`, `.map()` pada ringkasan status, `FlatList` pada daftar tugas |
| Type & Array of Objects | `StatusTugas` (union type), interface `Tugas`, dan `dataTugas: Tugas[]` |
| External styling | `StyleSheet.create()` di `constants/styles.ts` |
| Inline styling | Warna badge dan warna deadline yang berubah sesuai status |
| Kondisi | `if / else if / else` dan operator ternary |

---

## Tim

| Nama | NIM | Kontribusi |
|---|---|---|
| _Hamzah Alwi Ramadhani_ | _202410370110026_ | _index.tsx_ |
| _Alldisa Putra P.P_ | _202410370110005_ | _error fixing index.tsx_ |
| _M. Naufal Rizqi_ | _202310370311060_ | _styling_ |

Pembagian kerja dapat dilihat pada riwayat commit di GitHub.

---

## Rencana Pengembangan

- [ ] Tambah, ubah, dan hapus tugas
- [ ] Ubah status tugas dengan satu ketukan
- [ ] Filter tugas berdasarkan status
- [ ] Halaman statistik pada tab kedua
- [ ] Penyimpanan data agar tidak hilang saat aplikasi ditutup

---

## Lisensi

Dibuat untuk keperluan pembelajaran di Laboratorium Informatika, Universitas Muhammadiyah Malang.
