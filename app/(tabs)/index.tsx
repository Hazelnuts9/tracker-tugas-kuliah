import { useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { styles } from "../constants/styles"; // kalau constants dipindah ke root: "../../constants/styles"
import { Tugas, StatusTugas } from "../../types/tugas";

// Array of objects bertipe Tugas[]
const dataTugas: Tugas[] = [
  { id: "1", judul: "Laporan Praktikum Modul 1", matkul: "Pemrograman Mobile", deadline: "2026-10-10", status: "belum" },
  { id: "2", judul: "Tugas Basis Data - Normalisasi", matkul: "Basis Data", deadline: "2026-10-08", status: "proses" },
  { id: "3", judul: "Essay Etika Profesi", matkul: "Etika Profesi", deadline: "2026-10-05", status: "selesai" },
];

const daftarStatus: StatusTugas[] = ["belum", "proses", "selesai"];

// Custom function 1: warna badge sesuai status
function getStatusColor(status: StatusTugas): string {
  if (status === "selesai") { return "#22c55e"; }
  else if (status === "proses") { return "#eab308"; }
  else { return "#ef4444"; }
}

// Custom function 2: teks badge sesuai status
function getStatusLabel(status: StatusTugas): string {
  if (status === "selesai") { return "Selesai"; }
  else if (status === "proses") { return "Dikerjakan"; }
  else { return "Belum Mulai"; }
}

// Custom function 3: warna deadline (abu-abu kalau sudah selesai)
function getDeadlineColor(status: StatusTugas): string {
  return status === "selesai" ? "#94a3b8" : "#ef4444";
}

// Custom function 4: hitung jumlah tugas per status (primitive loop for)
function hitungStatus(status: StatusTugas): number {
  let total = 0;
  for (let i = 0; i < dataTugas.length; i++) {
    if (dataTugas[i].status === status) {
      total = total + 1;
    }
  }
  return total;
}

export default function Index() {
  // Papan tulis kecil: menyimpan teks pencarian
  const [kataKunci, setKataKunci] = useState("");

  // Saring tugas: judul atau matkul harus mengandung kata kunci
  const hasil = dataTugas.filter(
    (item) =>
      item.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.matkul.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tracker Tugas Kuliah</Text>

      {/* Ringkasan: loop dengan map(), key = status */}
      <View style={styles.ringkasanRow}>
        {daftarStatus.map((s) => (
          <View key={s} style={styles.ringkasanItem}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: getStatusColor(s) }}>
              {hitungStatus(s)}
            </Text>
            <Text style={styles.ringkasanLabel}>{getStatusLabel(s)}</Text>
          </View>
        ))}
      </View>

      <TextInput
        placeholder="Cari tugas..."
        style={styles.searchInput}
        value={kataKunci}
        onChangeText={setKataKunci}
      />

      {/* Daftar tugas: pakai hasil saringan, bukan dataTugas langsung */}
      <FlatList
        data={hasil}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#94a3b8", marginTop: 24 }}>
            Tugas tidak ditemukan
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.judul}>{item.judul}</Text>
              {/* Inline style dinamis */}
              <View style={{ backgroundColor: getStatusColor(item.status), borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
                <Text style={{ color: "white", fontSize: 12 }}>{getStatusLabel(item.status)}</Text>
              </View>
            </View>
            <Text style={styles.matkul}>{item.matkul}</Text>
            <Text style={[styles.deadline, { color: getDeadlineColor(item.status) }]}>
              Deadline: {item.deadline}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
