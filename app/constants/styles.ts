import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },
  ringkasanRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  ringkasanItem: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
  },
  ringkasanLabel: { fontSize: 12, color: "#475569", marginTop: 2 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  judul: { fontSize: 16, fontWeight: "bold", color: "#0f172a", flex: 1 },
  matkul: { fontSize: 14, color: "#475569", marginBottom: 2 },
  deadline: { fontSize: 13, color: "#ef4444" },

  // Tombol
  tombol: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
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
    borderColor: "#cbd5e1",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  errorText: { color: "#ef4444", marginBottom: 12 },

  // Halaman detail dan statistik
  detailJudul: { fontSize: 20, fontWeight: "bold", color: "#0f172a", marginBottom: 8 },
  detailBaris: { fontSize: 15, color: "#475569", marginBottom: 6 },
  statAngka: { fontSize: 36, fontWeight: "bold", color: "#2563eb" },
  subJudul: { fontSize: 16, fontWeight: "bold", color: "#0f172a", marginBottom: 8, marginTop: 8 },
});