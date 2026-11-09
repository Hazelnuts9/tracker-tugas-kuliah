import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f3ff", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },

  // Header sapaan (halaman utama)
  heroBox: {
    backgroundColor: "#4338ca",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },
  heroSapaan: { fontSize: 26, fontWeight: "800", color: "white" },
  heroRingkasan: { fontSize: 14, color: "#c7d2fe", marginTop: 4 },

  // Kartu fokus (tugas terdekat)
  fokusCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "#c7d2fe",
  },
  fokusLabel: { fontSize: 12, fontWeight: "700", color: "#4338ca", marginBottom: 6 },
  fokusJudul: { fontSize: 18, fontWeight: "bold", color: "#0f172a" },
  fokusMatkul: { fontSize: 14, color: "#475569", marginTop: 2 },

  // Ringkasan status
  ringkasanRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  ringkasanItem: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 14,
    marginHorizontal: 4,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#4338ca",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  ringkasanLabel: { fontSize: 12, color: "#475569", marginTop: 2 },

  searchInput: {
    borderWidth: 1,
    borderColor: "#c7d2fe",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },
  filterAktif: {
    backgroundColor: "#e0e7ff",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  filterAktifText: { fontSize: 12, color: "#3730a3", fontWeight: "600" },

  // Kartu tugas
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#4338ca",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  judul: { fontSize: 16, fontWeight: "bold", color: "#0f172a", flex: 1 },
  matkul: { fontSize: 14, color: "#475569", marginBottom: 6 },
  deadlineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deadline: { fontSize: 13, color: "#64748b" },
  badgeDeadline: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  badgeDeadlineText: { fontSize: 12, fontWeight: "700" },

  // Tombol
  tombol: {
    backgroundColor: "#4338ca",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  tombolText: { color: "white", fontWeight: "bold", fontSize: 14 },
  tombolSekunder: { backgroundColor: "#64748b" },
  tombolBahaya: { backgroundColor: "#ef4444" },

  // Form tambah tugas
  label: { fontSize: 14, fontWeight: "bold", color: "#0f172a", marginBottom: 4 },
  inputForm: {
    borderWidth: 1,
    borderColor: "#c7d2fe",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  errorText: { color: "#ef4444", marginBottom: 12 },

  // Halaman detail dan statistik
  detailJudul: { fontSize: 20, fontWeight: "bold", color: "#0f172a", marginBottom: 8 },
  detailBaris: { fontSize: 15, color: "#475569", marginBottom: 6 },
  statAngka: { fontSize: 36, fontWeight: "bold", color: "#4338ca" },
  subJudul: { fontSize: 16, fontWeight: "bold", color: "#0f172a", marginBottom: 8, marginTop: 8 },
});