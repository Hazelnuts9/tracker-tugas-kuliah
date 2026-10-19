import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/app/constants/styles";
import { useTugas } from "@/context/TugasContext";

export default function TambahTugas() {
  const router = useRouter();
  const { tambahTugas } = useTugas();

  // State: satu state untuk satu kolom isian
  const [judul, setJudul] = useState("");
  const [matkul, setMatkul] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pesanError, setPesanError] = useState("");

  function simpan() {
    if (judul.trim() === "" || matkul.trim() === "" || deadline.trim() === "") {
      setPesanError("Semua kolom wajib diisi");
      return;
    }
    tambahTugas(judul.trim(), matkul.trim(), deadline.trim());
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul Tugas</Text>
      <TextInput
        style={styles.inputForm}
        placeholder="Contoh: Laporan Praktikum Modul 2"
        value={judul}
        onChangeText={setJudul}
      />

      <Text style={styles.label}>Mata Kuliah</Text>
      <TextInput
        style={styles.inputForm}
        placeholder="Contoh: Pemrograman Mobile"
        value={matkul}
        onChangeText={setMatkul}
      />

      <Text style={styles.label}>Deadline</Text>
      <TextInput
        style={styles.inputForm}
        placeholder="Format: 2026-10-30"
        value={deadline}
        onChangeText={setDeadline}
      />

      {pesanError !== "" ? <Text style={styles.errorText}>{pesanError}</Text> : null}

      <Pressable style={styles.tombol} onPress={simpan}>
        <Text style={styles.tombolText}>Simpan</Text>
      </Pressable>

      <Pressable style={[styles.tombol, styles.tombolSekunder]} onPress={() => router.back()}>
        <Text style={styles.tombolText}>Batal</Text>
      </Pressable>
    </View>
  );
}