import { View, Text, Pressable } from "react-native";

interface Props {
  pesan: string;
  onCoba: () => void;
}

export default function ErrorMessage({ pesan, onCoba }: Props) {
  return (
    <View style={{ backgroundColor: "#fee2e2", padding: 12, borderRadius: 10, marginBottom: 12 }}>
      <Text style={{ color: "#b91c1c", marginBottom: 8 }}>{pesan}</Text>
      <Pressable
        onPress={onCoba}
        style={{ backgroundColor: "#ef4444", padding: 8, borderRadius: 8, alignItems: "center" }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Coba Lagi</Text>
      </Pressable>
    </View>
  );
}