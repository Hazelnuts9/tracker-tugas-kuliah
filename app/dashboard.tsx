import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/app/constants/styles";
import { useTugas } from "@/context/TugasContext";

export default function Dashboard() {
  const router = useRouter();
  const { daftarTugas } = useTugas();

  const total = daftarTugas.length;
  const selesai = daftarTugas.filter((t) => t.status === "selesai").length;
  const belumSelesai = total - selesai;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.matkul}>Total tugas</Text>
        <Text style={styles.statAngka}>{total}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.matkul}>Sudah selesai</Text>
        <Text style={[styles.statAngka, { color: "#22c55e" }]}>{selesai}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.matkul}>Belum selesai</Text>
        <Text style={[styles.statAngka, { color: "#ef4444" }]}>{belumSelesai}</Text>
      </View>

      <Pressable style={[styles.tombol, styles.tombolSekunder]} onPress={() => router.back()}>
        <Text style={styles.tombolText}>Kembali</Text>
      </Pressable>
    </View>
  );
}