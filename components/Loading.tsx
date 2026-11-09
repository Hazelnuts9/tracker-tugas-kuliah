import { View, Text, ActivityIndicator } from "react-native";

export default function Loading({ teks = "Memuat..." }: { teks?: string }) {
  return (
    <View style={{ alignItems: "center", padding: 16 }}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={{ marginTop: 8, color: "#475569" }}>{teks}</Text>
    </View>
  );
}