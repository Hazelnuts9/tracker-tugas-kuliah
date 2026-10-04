export type StatusTugas = "belum" | "proses" | "selesai";

export interface Tugas {
  readonly id: string;
  judul: string;
  matkul: string;
  deadline: string;
  status: StatusTugas;
}