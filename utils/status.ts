import { StatusTugas } from "@/types/tugas";

export const daftarStatus: StatusTugas[] = ["belum", "proses", "selesai"];

// Custom function: warna badge sesuai status
export function getStatusColor(status: StatusTugas): string {
  if (status === "selesai") { return "#22c55e"; }
  else if (status === "proses") { return "#eab308"; }
  else { return "#ef4444"; }
}

// Custom function: teks badge sesuai status
export function getStatusLabel(status: StatusTugas): string {
  if (status === "selesai") { return "Selesai"; }
  else if (status === "proses") { return "Dikerjakan"; }
  else { return "Belum Mulai"; }
}

// Custom function: warna deadline (abu-abu kalau sudah selesai)
export function getDeadlineColor(status: StatusTugas): string {
  return status === "selesai" ? "#94a3b8" : "#ef4444";
}

// Custom function: status berikutnya (belum -> proses -> selesai -> belum)
export function getStatusBerikutnya(status: StatusTugas): StatusTugas {
  if (status === "belum") { return "proses"; }
  else if (status === "proses") { return "selesai"; }
  else { return "belum"; }
}