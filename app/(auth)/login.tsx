import { supabase } from "@/lib/supabase";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    if (isRegistering) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nama } },
      });
      setMessage(
        error
          ? error.message
          : "Pendaftaran berhasil, cek email untuk verifikasi.",
      );
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          {isRegistering ? "Buat Akun" : "Selamat Datang"}
        </Text>
        <Text style={styles.subtitle}>
          {isRegistering
            ? "Daftar untuk mulai mencatat tugas"
            : "Masuk untuk melihat tugas kuliahmu"}
        </Text>

        {isRegistering && (
          <TextInput
            style={styles.input}
            placeholder="Nama lengkap"
            placeholderTextColor="#9CA3AF"
            value={nama}
            onChangeText={setNama}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {!!message && <Text style={styles.message}>{message}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? "Daftar" : "Masuk"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsRegistering(!isRegistering);
            setMessage("");
          }}
        >
          <Text style={styles.link}>
            {isRegistering
              ? "Sudah punya akun? Masuk"
              : "Belum punya akun? Daftar di sini"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 24,
    gap: 12,
  },
  title: { fontSize: 26, fontWeight: "700", color: "#FFFFFF" },
  subtitle: { fontSize: 14, color: "#94A3B8", marginBottom: 8 },
  input: {
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#FFFFFF",
  },
  message: { color: "#FBBF24", fontSize: 13 },
  button: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  link: { color: "#60A5FA", textAlign: "center", marginTop: 8 },
});
