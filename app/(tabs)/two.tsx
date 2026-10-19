import { styles } from "@/app/constants/styles";
import { useTugas } from "@/context/TugasContext";
import { getDeadlineColor, getStatusLabel } from "@/utils/status";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

export default function Statistik() {
  const router = useRouter();
  const { daftarTugas } = useTugas();

  // useMemo: hitung ulang hanya kalau daftarTugas berubah
  const ringkasan = useMemo(() => {
    const total = daftarTugas.length;
    const selesai = daftarTugas.filter((t) => t.status === "selesai").length;
    const persen = total === 0 ? 0 : Math.round((selesai / total) * 100);
    const terdekat = daftarTugas
      .filter((t) => t.status !== "selesai")
      .sort((a, b) => a.deadline.localeCompare(b.deadline))
      .slice(0, 3);
    return { total, selesai, persen, terdekat };
  }, [daftarTugas]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.matkul}>Tugas yang sudah selesai</Text>
        <Text style={styles.statAngka}>{ringkasan.persen}%</Text>
        <Text style={styles.matkul}>
          {ringkasan.selesai} dari {ringkasan.total} tugas
        </Text>
      </View>

      <Text style={styles.subJudul}>Deadline Terdekat</Text>

      {ringkasan.terdekat.map((item) => (
        <Pressable
          key={item.id}
          style={styles.card}
          onPress={() =>
            router.push({ pathname: "/detail/[id]", params: { id: item.id } })
          }
        >
          <Text style={styles.judul}>{item.judul}</Text>
          <Text style={styles.matkul}>
            {item.matkul} - {getStatusLabel(item.status)}
          </Text>
          <Text
            style={[styles.deadline, { color: getDeadlineColor(item.status) }]}
          >
            Deadline: {item.deadline}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
