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
    if (loading) return; // cegah double submit

    //trim input untuk menghindari spasi di awal/akhir
    const cleanEmail = email.trim();
    const cleanNama = nama.trim();

    if (!cleanEmail || !password) {
      setMessage("Email dan password wajib diisi.");
      return;
    }
    if (isRegistering && !cleanNama) {
      setMessage("Nama lengkap wajib diisi.");
      return;
    }
    if (isRegistering && password.length < 6) {
      setMessage("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: { data: { nama: cleanNama } },
        });
        if (error) throw error;

        // Jika "Confirm email" aktif, session null -> user harus verifikasi dulu.
        // Jika nonaktif, session langsung ada dan guard akan mengarahkan masuk.
        setMessage(
          data.session
            ? "Pendaftaran berhasil!"
            : "Pendaftaran berhasil, cek email untuk verifikasi.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
        // Pengalihan layar ditangani route guard di app/_layout.tsx
      }
    } catch (e: any) {
      setMessage(e?.message ?? "Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
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
            autoCapitalize="words"
            value={nama}
            onChangeText={setNama}
            editable={!loading}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {!!message && <Text style={styles.message}>{message}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
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
          disabled={loading}
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
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  link: { color: "#60A5FA", textAlign: "center", marginTop: 8 },
});