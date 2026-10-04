import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },
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
});
