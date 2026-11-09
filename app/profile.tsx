import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/app/constants/styles";

const profil = {
  nama: "Hamzah Alwi Ramadhani",
  nim: "202410370110026",
  prodi: "Informatika",
  kampus: "Universitas Muhammadiyah Malang",
};

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.detailJudul}>{profil.nama}</Text>
        <Text style={styles.detailBaris}>NIM: {profil.nim}</Text>
        <Text style={styles.detailBaris}>Program Studi: {profil.prodi}</Text>
        <Text style={styles.detailBaris}>{profil.kampus}</Text>
      </View>

      <Pressable style={[styles.tombol, styles.tombolSekunder]} onPress={() => router.back()}>
        <Text style={styles.tombolText}>Kembali</Text>
      </Pressable>
    </View>
  );
}