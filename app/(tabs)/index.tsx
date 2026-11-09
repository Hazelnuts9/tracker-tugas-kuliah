import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/app/constants/styles";
import { Tugas, StatusTugas } from "@/types/tugas";
import { useTugas } from "@/context/TugasContext";
import { daftarStatus, getStatusColor, getStatusLabel, getDeadlineColor } from "@/utils/status";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

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
  const { daftarTugas, sedangMemuat, pesanError, muatDariApi } = useTugas();

  // State: teks pencarian
  const [kataKunci, setKataKunci] = useState("");

  // useEffect dengan [] : jalan sekali saat halaman pertama dimuat -> ambil data dari API
  useEffect(() => {
    console.log("Halaman daftar tugas dimuat");
    muatDariApi();
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

      <View style={{ flexDirection: "row", gap: 8 }}>
        {/* router.push: pindah ke halaman tambah */}
        <Pressable style={[styles.tombol, { flex: 1 }]} onPress={() => router.push("/tambah")}>
          <Text style={styles.tombolText}>+ Tambah Tugas</Text>
        </Pressable>

        {/* Ambil ulang data dari API */}
        <Pressable
          style={[styles.tombol, styles.tombolSekunder, { flex: 1, opacity: sedangMemuat ? 0.5 : 1 }]}
          onPress={muatDariApi}
          disabled={sedangMemuat}
        >
          <Text style={styles.tombolText}>Muat dari API</Text>
        </Pressable>
      </View>

      {/* Status pengambilan data: loading atau error */}
      {sedangMemuat ? <Loading teks="Mengambil data dari API..." /> : null}
      {pesanError !== "" ? <ErrorMessage pesan={pesanError} onCoba={muatDariApi} /> : null}

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