import { View, Text, TextInput, FlatList } from "react-native";
import { styles } from "../constants/styles";
import { Tugas, StatusTugas } from "../types/tugas";

const dataTugas: Tugas[] = [
  { id: "1", judul: "Laporan Praktikum Modul 1", matkul: "Pemrograman Mobile", deadline: "2026-10-10", status: "belum" },
  { id: "2", judul: "Tugas Basis Data - Normalisasi", matkul: "Basis Data", deadline: "2026-10-08", status: "proses" },
  { id: "3", judul: "Essay Etika Profesi", matkul: "Etika Profesi", deadline: "2026-10-05", status: "selesai" },
];

function getStatusColor(status: StatusTugas): string {
  if (status === "selesai") { return "#22c55e"; }
  else if (status === "proses") { return "#eab308"; }
  else { return "#ef4444"; }
}

function getStatusLabel(status: StatusTugas): string {
  if (status === "selesai") { return "Selesai"; }
  else if (status === "proses") { return "Dikerjakan"; }
  else { return "Belum Mulai"; }
}

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tracker Tugas Kuliah</Text>

      <TextInput placeholder="Cari tugas..." style={styles.searchInput} />

      <FlatList
        data={dataTugas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.judul}>{item.judul}</Text>
              <View style={{ backgroundColor: getStatusColor(item.status), borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
                <Text style={{ color: "white", fontSize: 12 }}>{getStatusLabel(item.status)}</Text>
              </View>
            </View>
            <Text style={styles.matkul}>{item.matkul}</Text>
            <Text style={styles.deadline}>Deadline: {item.deadline}</Text>
          </View>
        )}
      />
    </View>
  );
}