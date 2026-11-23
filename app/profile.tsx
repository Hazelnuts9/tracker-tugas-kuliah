import { useAuth } from "@/context/AuthContext";
import { useTugas } from "@/context/TugasContext";
import { supabase } from "@/lib/supabase";
import { daftarStatus, getStatusColor, getStatusLabel } from "@/utils/status";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();
  const { daftarTugas } = useTugas();
  const [keluar, setKeluar] = useState(false);

  const nama =
    user?.user_metadata?.nama ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Pengguna";
  const email = user?.email ?? "-";
  const inisial = nama.charAt(0).toUpperCase();

  // Progres keseluruhan: tugas selesai / total tugas
  const total = daftarTugas.length;
  const selesai = daftarTugas.filter(
    (t) => getStatusLabel(t.status) === "Selesai",
  ).length;
  const persen = total === 0 ? 0 : Math.round((selesai / total) * 100);

  const pesanProgres =
    total === 0
      ? "Belum ada tugas"
      : persen === 100
        ? "Semua tugas selesai, kerja bagus! 🎉"
        : persen >= 50
          ? "Sudah lebih dari separuh, lanjutkan! 💪"
          : "Ayo mulai dicicil pelan-pelan 🚀";

async function handleLogout() {
  if (keluar) return;
  setKeluar(true);
  try {
    await supabase.auth.signOut();
    // Guard di app/_layout.tsx otomatis mengarahkan ke halaman login
  } finally {
    setKeluar(false);
  }
}

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Pressable onPress={() => router.back()} style={s.back}>
        <Text style={s.backText}>← Kembali</Text>
      </Pressable>

      {/* Identitas */}
      <View style={s.kartu}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{inisial}</Text>
        </View>
        <Text style={s.nama}>{nama}</Text>
        <Text style={s.email}>{email}</Text>
      </View>

      {/* Progres keseluruhan */}
      <View style={s.kartu}>
        <Text style={s.judulKartu}>Progres Keseluruhan</Text>
        <Text style={s.persen}>{persen}%</Text>
        <View style={s.barLatar}>
          <View style={[s.barIsi, { width: `${persen}%` }]} />
        </View>
        <Text style={s.keterangan}>
          {selesai} dari {total} tugas selesai
        </Text>
        <Text style={s.pesan}>{pesanProgres}</Text>

        <View style={s.baris}>
          {daftarStatus.map((st) => {
            const jumlah = daftarTugas.filter((t) => t.status === st).length;
            return (
              <View
                key={st}
                style={[s.item, { borderBottomColor: getStatusColor(st) }]}
              >
                <Text style={[s.itemAngka, { color: getStatusColor(st) }]}>
                  {jumlah}
                </Text>
                <Text style={s.itemLabel}>{getStatusLabel(st)}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Logout */}
      <Pressable
        style={({ pressed }) => [
          s.logout,
          { opacity: pressed || keluar ? 0.6 : 1 },
        ]}
        onPress={handleLogout}
        disabled={keluar}
      >
        {keluar ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={s.logoutText}>Keluar</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f2ff" },
  content: { padding: 20, paddingTop: 50, gap: 16 },
  back: { alignSelf: "flex-start", paddingVertical: 6 },
  backText: { color: "#3730a3", fontSize: 15, fontWeight: "600" },
  kartu: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3730d9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: { color: "#fff", fontSize: 34, fontWeight: "700" },
  nama: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
  email: { fontSize: 14, color: "#64748b", marginTop: 2 },
  judulKartu: { fontSize: 14, fontWeight: "600", color: "#475569" },
  persen: {
    fontSize: 56,
    fontWeight: "800",
    color: "#3730d9",
    marginVertical: 4,
  },
  barLatar: {
    width: "100%",
    height: 12,
    borderRadius: 999,
    backgroundColor: "#e2e8f0",
    overflow: "hidden",
  },
  barIsi: { height: "100%", borderRadius: 999, backgroundColor: "#22c55e" },
  keterangan: { marginTop: 10, color: "#334155", fontSize: 14 },
  pesan: { marginTop: 4, color: "#64748b", fontSize: 13 },
  baris: { flexDirection: "row", gap: 8, marginTop: 16, width: "100%" },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    borderBottomWidth: 4,
  },
  itemAngka: { fontSize: 22, fontWeight: "700" },
  itemLabel: { fontSize: 12, color: "#475569" },
  logout: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
