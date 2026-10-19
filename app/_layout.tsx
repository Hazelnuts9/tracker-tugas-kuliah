import { Stack } from "expo-router";
import { TugasProvider } from "@/context/TugasContext";

export default function RootLayout() {
  return (
    // Provider membungkus seluruh halaman agar semua bisa mengakses data tugas
    <TugasProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detail/[id]" options={{ title: "Detail Tugas" }} />
        <Stack.Screen name="tambah" options={{ title: "Tambah Tugas" }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Info Aplikasi" }} />
      </Stack>
    </TugasProvider>
  );
}