import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/app/constants/styles";
import { Tugas, StatusTugas } from "@/types/tugas";
import { useTugas } from "@/context/TugasContext";
import { daftarStatus, getStatusColor, getStatusLabel, getDeadlineColor } from "@/utils/status";

// Custom function: hitung jumlah tugas per status (primitive loop for)
function hitungStatus(daftar: Tugas[], status: StatusTugas): number {
  let total = 0;
  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i].status === status) {
      total = total + 1;
    }
  }
  return total;
}

// Custom function: dijalankan saat kotak ringkasan ditekan
function tampilkanHello() {
  console.log("Hello World");
}

export default function Index() {
  const router = useRouter();
  const { daftarTugas } = useTugas();

  // State: teks pencarian
  const [kataKunci, setKataKunci] = useState("");

  // useEffect dengan [] : jalan sekali saat halaman pertama dimuat
  useEffect(() => {
    console.log("Halaman daftar tugas dimuat");
  }, []);

  // useEffect dengan [kataKunci] : jalan setiap kata kunci berubah
  useEffect(() => {
    console.log(`Kata kunci pencarian: "${kataKunci}"`);
  }, [kataKunci]);

  // Saring tugas: judul atau matkul harus mengandung kata kunci
  const hasil = daftarTugas.filter(
    (item) =>
      item.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.matkul.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tracker Tugas Kuliah</Text>

      {/* Ringkasan: loop dengan map(), tiap kotak adalah tombol (Pressable) */}
      <View style={styles.ringkasanRow}>
        {daftarStatus.map((s) => (
          <Pressable
            key={s}
            onPress={tampilkanHello}
            style={({ pressed }) => [styles.ringkasanItem, { opacity: pressed ? 0.5 : 1 }]}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: getStatusColor(s) }}>
              {hitungStatus(daftarTugas, s)}
            </Text>
            <Text style={styles.ringkasanLabel}>{getStatusLabel(s)}</Text>
          </Pressable>
        ))}
      </View>

      {/* router.push: pindah ke halaman tambah (ditumpuk di atas halaman ini) */}
      <Pressable style={styles.tombol} onPress={() => router.push("/tambah")}>
        <Text style={styles.tombolText}>+ Tambah Tugas</Text>
      </Pressable>

      <TextInput
        placeholder="Cari tugas..."
        style={styles.searchInput}
        value={kataKunci}
        onChangeText={setKataKunci}
      />

      <FlatList
        data={hasil}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#94a3b8", marginTop: 24 }}>
            Tugas tidak ditemukan
          </Text>
        }
        renderItem={({ item }) => (
          // router.push dengan parameter dinamis: id dikirim ke detail/[id]
          <Pressable
            style={styles.card}
            onPress={() => router.push({ pathname: "/detail/[id]", params: { id: item.id } })}
          >
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
          </Pressable>
        )}
      />
    </View>
  );
}