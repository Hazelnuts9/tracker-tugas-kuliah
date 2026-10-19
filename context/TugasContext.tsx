import { createContext, useContext, useState, ReactNode } from "react";
import { Tugas } from "@/types/tugas";
import { getStatusBerikutnya } from "@/utils/status";

const dataAwal: Tugas[] = [
  { id: "1", judul: "Laporan Praktikum Modul 1", matkul: "Pemrograman Mobile", deadline: "2026-10-10", status: "belum" },
  { id: "2", judul: "Tugas Basis Data - Normalisasi", matkul: "Basis Data", deadline: "2026-10-08", status: "proses" },
  { id: "3", judul: "Essay Etika Profesi", matkul: "Etika Profesi", deadline: "2026-10-05", status: "selesai" },
  { id: "4", judul: "Implementasi Linked List", matkul: "Struktur Data", deadline: "2026-10-12", status: "proses" },
  { id: "5", judul: "Quiz Penjadwalan CPU", matkul: "Sistem Operasi", deadline: "2026-10-07", status: "selesai" },
  { id: "6", judul: "Dokumen SRS Aplikasi Kasir", matkul: "Rekayasa Perangkat Lunak", deadline: "2026-10-14", status: "belum" },
  { id: "7", judul: "Makalah Algoritma A*", matkul: "Kecerdasan Buatan", deadline: "2026-10-16", status: "proses" },
  { id: "8", judul: "Render Objek 3D Sederhana", matkul: "Grafika Komputer", deadline: "2026-10-18", status: "belum" },
  { id: "9", judul: "Latihan Query JOIN Oracle SQL", matkul: "Basis Data", deadline: "2026-10-06", status: "selesai" },
  { id: "10", judul: "Laporan Praktikum Modul 2", matkul: "Pemrograman Mobile", deadline: "2026-10-20", status: "belum" },
  { id: "11", judul: "Tugas Stack dan Queue", matkul: "Struktur Data", deadline: "2026-10-09", status: "selesai" },
  { id: "12", judul: "Studi Kasus Deadlock", matkul: "Sistem Operasi", deadline: "2026-10-13", status: "proses" },
  { id: "13", judul: "Diagram UML Use Case", matkul: "Rekayasa Perangkat Lunak", deadline: "2026-10-11", status: "proses" },
  { id: "14", judul: "Presentasi Kode Etik Profesi", matkul: "Etika Profesi", deadline: "2026-10-22", status: "belum" },
  { id: "15", judul: "Klasifikasi Sederhana dengan Decision Tree", matkul: "Kecerdasan Buatan", deadline: "2026-10-25", status: "belum" },
];

interface TugasContextType {
  daftarTugas: Tugas[];
  tambahTugas: (judul: string, matkul: string, deadline: string) => void;
  ubahStatus: (id: string) => void;
  hapusTugas: (id: string) => void;
}

// Papan pengumuman bersama: nilai default null
const TugasContext = createContext<TugasContextType | null>(null);

export function TugasProvider({ children }: { children: ReactNode }) {
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>(dataAwal);

  function tambahTugas(judul: string, matkul: string, deadline: string) {
    const tugasBaru: Tugas = {
      id: Date.now().toString(),
      judul,
      matkul,
      deadline,
      status: "belum",
    };
    setDaftarTugas([tugasBaru, ...daftarTugas]);
  }

  function ubahStatus(id: string) {
    setDaftarTugas(
      daftarTugas.map((t) =>
        t.id === id ? { ...t, status: getStatusBerikutnya(t.status) } : t
      )
    );
  }

  function hapusTugas(id: string) {
    setDaftarTugas(daftarTugas.filter((t) => t.id !== id));
  }

  return (
    <TugasContext.Provider value={{ daftarTugas, tambahTugas, ubahStatus, hapusTugas }}>
      {children}
    </TugasContext.Provider>
  );
}

// Hook buatan sendiri supaya pemakaian di halaman lebih singkat
export function useTugas(): TugasContextType {
  const konteks = useContext(TugasContext);
  if (konteks === null) {
    throw new Error("useTugas harus dipakai di dalam TugasProvider");
  }
  return konteks;
}