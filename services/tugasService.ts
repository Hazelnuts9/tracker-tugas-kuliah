import { Tugas, StatusTugas } from "@/types/tugas";
import { TodoApi } from "@/types/todo";
import { delay } from "@/utils/delay";

const URL_API = "https://jsonplaceholder.typicode.com/todos";

const daftarMatkul: string[] = [
  "Pemrograman Mobile",
  "Basis Data",
  "Struktur Data",
  "Sistem Operasi",
  "Kecerdasan Buatan",
  "Etika Profesi",
];

// Custom Promise dengan resolve() dan reject():
// batalkan permintaan kalau server tidak menjawab dalam batas waktu
function fetchDenganTimeout(url: string, batasMs: number): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Server terlalu lama merespons"));
    }, batasMs);

    fetch(url)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(() => {
        clearTimeout(timer);
        reject(new Error("Tidak bisa terhubung ke server. Periksa koneksi internet"));
      });
  });
}

// Ubah satu item API (TodoApi) menjadi objek Tugas milik aplikasi
function ubahKeTugas(todo: TodoApi): Tugas {
  let status: StatusTugas = "belum";
  if (todo.completed) {
    status = "selesai";
  } else if (todo.id % 2 === 0) {
    status = "proses";
  }

  // Deadline dibuat dari id: 1 sampai 20 hari dari hari ini
  const tanggal = new Date();
  tanggal.setDate(tanggal.getDate() + (todo.id % 20) + 1);

  return {
    id: `api-${todo.id}`, // awalan "api-" supaya id tidak bentrok dengan data lokal
    judul: todo.title,
    matkul: daftarMatkul[todo.userId % daftarMatkul.length],
    deadline: tanggal.toISOString().slice(0, 10),
    status,
  };
}

// Custom async function: ambil tugas dari API lalu kembalikan sebagai Tugas[]
export async function ambilTugasDariApi(jumlah: number): Promise<Tugas[]> {
  await delay(1000); // simulasi server lambat supaya Loading terlihat, boleh dihapus

  const response = await fetchDenganTimeout(`${URL_API}?_limit=${jumlah}`, 8000);

  if (!response.ok) {
    // throw di dalam async function = Promise ini menjadi reject
    throw new Error(`Gagal mengambil data (status ${response.status})`);
  }

  const data: TodoApi[] = await response.json(); // array langsung, bukan objek pembungkus
  return data.map(ubahKeTugas);
}