import { styles } from "@/app/constants/styles";
import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import { useTugas } from "@/context/TugasContext";
import { StatusTugas, Tugas } from "@/types/tugas";
import { daftarStatus, getStatusColor, getStatusLabel } from "@/utils/status";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

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

// Custom function: selisih hari antara hari ini dan deadline (format "YYYY-MM-DD")
// Negatif = sudah lewat, 0 = hari ini
function hitungSisaHari(deadline: string): number {
  const tanggal = new Date(deadline + "T00:00:00");
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);
  const selisih = tanggal.getTime() - hariIni.getTime();
  return Math.round(selisih / (1000 * 60 * 60 * 24));
}

// Custom function: ubah sisa hari menjadi label + warna badge
function getBadgeDeadline(sisa: number): {
  teks: string;
  warna: string;
  latar: string;
} {
  if (sisa < 0)
    return {
      teks: `Terlambat ${Math.abs(sisa)} hari`,
      warna: "#b91c1c",
      latar: "#fee2e2",
    };
  if (sisa === 0)
    return { teks: "Hari ini", warna: "#c2410c", latar: "#ffedd5" };
  if (sisa === 1) return { teks: "Besok", warna: "#c2410c", latar: "#ffedd5" };
  if (sisa <= 3)
    return { teks: `Sisa ${sisa} hari`, warna: "#a16207", latar: "#fef9c3" };
  return { teks: `Sisa ${sisa} hari`, warna: "#475569", latar: "#e2e8f0" };
}

// Tugas dianggap selesai kalau labelnya "Selesai" (tidak bergantung pada nilai internal status)
function sudahSelesai(status: StatusTugas): boolean {
  return getStatusLabel(status) === "Selesai";
}

export default function Index() {
  const router = useRouter();
  const { daftarTugas, sedangMemuat, pesanError, muatDariApi } = useTugas();

  // State: teks pencarian dan filter status (null = tampilkan semua)
  const [kataKunci, setKataKunci] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusTugas | null>(null);

  // useEffect dengan [] : jalan sekali saat halaman pertama dimuat -> ambil data dari API
  useEffect(() => {
    console.log("Halaman daftar tugas dimuat");
    muatDariApi();
  }, []);

  // useEffect dengan [kataKunci] : jalan setiap kata kunci berubah
  useEffect(() => {
    console.log(`Kata kunci pencarian: "${kataKunci}"`);
  }, [kataKunci]);

  // Tekan kotak ringkasan: jalankan fungsi lama + aktifkan/matikan filter
  function tekanRingkasan(s: StatusTugas) {
    tampilkanHello();
    setFilterStatus(filterStatus === s ? null : s);
  }

  // Saring tugas: cocok dengan kata kunci DAN (kalau ada) cocok dengan filter status
  const hasil = daftarTugas
    .filter((item) => {
      const cocokKata =
        item.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
        item.matkul.toLowerCase().includes(kataKunci.toLowerCase());
      const cocokStatus = filterStatus === null || item.status === filterStatus;
      return cocokKata && cocokStatus;
    })
    .sort((a, b) => {
      // Urut sesuai daftarStatus (Belum Mulai -> Dikerjakan -> Selesai = merah -> oren -> hijau)
      const urutanA = daftarStatus.indexOf(a.status);
      const urutanB = daftarStatus.indexOf(b.status);
      if (urutanA !== urutanB) return urutanA - urutanB;
      // Status sama: deadline paling dekat di atas
      return a.deadline.localeCompare(b.deadline);
    });

  // Tugas belum selesai, diurutkan dari deadline terdekat
  const belumSelesai = daftarTugas
    .filter((t) => !sudahSelesai(t.status))
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  const tugasFokus = belumSelesai.length > 0 ? belumSelesai[0] : null;
  const jumlahMendesak = belumSelesai.filter(
    (t) => hitungSisaHari(t.deadline) <= 3,
  ).length;

  const ringkasanHero =
    jumlahMendesak > 0
      ? `${jumlahMendesak} tugas perlu perhatian segera`
      : "Semua tugas masih aman";

  return (
    <View style={styles.container}>
      <FlatList
        data={hasil}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header sapaan */}
            <View style={styles.heroBox}>
              <Text style={styles.heroSapaan}>Halo, Nopdek 👋</Text>
              <Text style={styles.heroRingkasan}>{ringkasanHero}</Text>
            </View>

            {/* Kartu fokus: tugas dengan deadline terdekat */}
            {tugasFokus ? (
              <Pressable
                style={styles.fokusCard}
                onPress={() =>
                  router.push({
                    pathname: "/detail/[id]",
                    params: { id: tugasFokus.id },
                  })
                }
              >
                <Text style={styles.fokusLabel}>Kerjakan berikutnya</Text>
                <Text style={styles.fokusJudul}>{tugasFokus.judul}</Text>
                <Text style={styles.fokusMatkul}>{tugasFokus.matkul}</Text>
                <View
                  style={[
                    styles.badgeDeadline,
                    {
                      backgroundColor: getBadgeDeadline(
                        hitungSisaHari(tugasFokus.deadline),
                      ).latar,
                      alignSelf: "flex-start",
                      marginTop: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeDeadlineText,
                      {
                        color: getBadgeDeadline(
                          hitungSisaHari(tugasFokus.deadline),
                        ).warna,
                      },
                    ]}
                  >
                    {getBadgeDeadline(hitungSisaHari(tugasFokus.deadline)).teks}
                  </Text>
                </View>
              </Pressable>
            ) : null}

            {/* Ringkasan: loop dengan map(), tiap kotak adalah tombol sekaligus filter */}
            <View style={styles.ringkasanRow}>
              {daftarStatus.map((s) => {
                const aktif = filterStatus === s;
                return (
                  <Pressable
                    key={s}
                    onPress={() => tekanRingkasan(s)}
                    style={({ pressed }) => [
                      styles.ringkasanItem,
                      {
                        borderBottomWidth: 4,
                        borderBottomColor: getStatusColor(s),
                      },
                      aktif && {
                        backgroundColor: getStatusColor(s) + "22",
                        borderColor: getStatusColor(s),
                        borderWidth: 1.5,
                        borderBottomWidth: 4,
                      },
                      { opacity: pressed ? 0.6 : 1 },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: getStatusColor(s),
                      }}
                    >
                      {hitungStatus(daftarTugas, s)}
                    </Text>
                    <Text style={styles.ringkasanLabel}>
                      {getStatusLabel(s)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={{ flexDirection: "row", gap: 8 }}>
              {/* router.push: pindah ke halaman tambah */}
              <Pressable
                style={[styles.tombol, { flex: 1 }]}
                onPress={() => router.push("/tambah")}
              >
                <Text style={styles.tombolText}>+ Tambah Tugas</Text>
              </Pressable>

              {/* Ambil ulang data dari API */}
              <Pressable
                style={[
                  styles.tombol,
                  styles.tombolSekunder,
                  { flex: 1, opacity: sedangMemuat ? 0.5 : 1 },
                ]}
                onPress={muatDariApi}
                disabled={sedangMemuat}
              >
                <Text style={styles.tombolText}>Muat dari API</Text>
              </Pressable>
            </View>

            {/* Status pengambilan data: loading atau error */}
            {sedangMemuat ? (
              <Loading teks="Mengambil data dari API..." />
            ) : null}
            {pesanError !== "" ? (
              <ErrorMessage pesan={pesanError} onCoba={muatDariApi} />
            ) : null}

            <TextInput
              placeholder="Cari tugas atau mata kuliah..."
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
              value={kataKunci}
              onChangeText={setKataKunci}
            />

            {kataKunci !== "" ? (
              <Text style={{ color: "#64748b", fontSize: 12, marginBottom: 8 }}>
                {hasil.length} hasil untuk "{kataKunci}"
              </Text>
            ) : null}

            {filterStatus !== null ? (
              <Pressable
                onPress={() => setFilterStatus(null)}
                style={styles.filterAktif}
              >
                <Text style={styles.filterAktifText}>
                  Menampilkan {hasil.length} tugas{" "}
                  {getStatusLabel(filterStatus)} (ketuk untuk reset)
                </Text>
              </Pressable>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          <Text
            style={{ textAlign: "center", color: "#94a3b8", marginTop: 24 }}
          >
            Tugas tidak ditemukan
          </Text>
        }
        renderItem={({ item }) => {
          const selesai = sudahSelesai(item.status);
          const badge = getBadgeDeadline(hitungSisaHari(item.deadline));
          return (
            // router.push dengan parameter dinamis: id dikirim ke detail/[id]
            <Pressable
              style={({ pressed }) => [
                styles.card,
                {
                  borderLeftWidth: 5,
                  borderLeftColor: getStatusColor(item.status),
                  opacity: selesai ? 0.65 : 1,
                },
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/detail/[id]",
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.cardHeader}>
                <Text
                  style={[
                    styles.judul,
                    selesai && { textDecorationLine: "line-through" },
                  ]}
                >
                  {item.judul}
                </Text>
                {/* Inline style dinamis */}
                <View
                  style={{
                    backgroundColor: getStatusColor(item.status),
                    borderRadius: 999,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: "600" }}
                  >
                    {getStatusLabel(item.status)}
                  </Text>
                </View>
              </View>
              <Text style={styles.matkul}>📚 {item.matkul}</Text>
              <View style={styles.deadlineRow}>
                <Text style={styles.deadline}>📅 {item.deadline}</Text>
                {!selesai ? (
                  <View
                    style={[
                      styles.badgeDeadline,
                      { backgroundColor: badge.latar },
                    ]}
                  >
                    <Text
                      style={[styles.badgeDeadlineText, { color: badge.warna }]}
                    >
                      {badge.teks}
                    </Text>
                  </View>
                ) : null}
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
