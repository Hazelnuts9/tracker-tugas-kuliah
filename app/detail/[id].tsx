import { styles } from "@/app/constants/styles";
import { useTugas } from "@/context/TugasContext";
import {
    getDeadlineColor,
    getStatusColor,
    getStatusLabel,
} from "@/utils/status";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function DetailTugas() {
  const router = useRouter();
  // Ambil id dari URL, contoh: /detail/3 -> id = "3"
  const { id } = useLocalSearchParams<{ id: string }>();
  const { daftarTugas, ubahStatus, hapusTugas } = useTugas();

  // State: apakah tombol hapus sudah ditekan sekali (minta konfirmasi)
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);

  const tugas = daftarTugas.find((t) => t.id === id);

  // useEffect dengan [id] : jalan setiap id berubah
  useEffect(() => {
    console.log("Membuka detail tugas dengan id:", id);
  }, [id]);

  // canGoBack: cek dulu apakah ada halaman sebelumnya
  function kembali() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  function hapus() {
    hapusTugas(id);
    kembali();
  }

  if (!tugas) {
    return (
      <View style={styles.container}>
        <Text style={styles.detailBaris}>Tugas tidak ditemukan</Text>
        <Pressable
          style={[styles.tombol, styles.tombolSekunder]}
          onPress={kembali}
        >
          <Text style={styles.tombolText}>Kembali</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.detailJudul}>{tugas.judul}</Text>
        <Text style={styles.detailBaris}>Mata kuliah: {tugas.matkul}</Text>
        <Text
          style={[
            styles.detailBaris,
            { color: getDeadlineColor(tugas.status) },
          ]}
        >
          Deadline: {tugas.deadline}
        </Text>
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: getStatusColor(tugas.status),
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Text style={{ color: "white", fontSize: 13 }}>
            {getStatusLabel(tugas.status)}
          </Text>
        </View>
      </View>

      <Pressable style={styles.tombol} onPress={() => ubahStatus(tugas.id)}>
        <Text style={styles.tombolText}>Ubah Status</Text>
      </Pressable>

      {konfirmasiHapus ? (
        <Pressable style={[styles.tombol, styles.tombolBahaya]} onPress={hapus}>
          <Text style={styles.tombolText}>Yakin hapus? Tekan lagi</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.tombol, styles.tombolBahaya]}
          onPress={() => setKonfirmasiHapus(true)}
        >
          <Text style={styles.tombolText}>Hapus Tugas</Text>
        </Pressable>
      )}

      <Pressable
        style={[styles.tombol, styles.tombolSekunder]}
        onPress={kembali}
      >
        <Text style={styles.tombolText}>Kembali</Text>
      </Pressable>
    </View>
  );
}
