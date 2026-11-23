import { AuthProvider, useAuth } from "@/context/AuthContext";
import { TugasProvider } from "@/context/TugasContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

function Guard() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Rule 1: jangan redirect saat loading
    const inAuthGroup = segments[0] === "(auth)";
    if (!user && !inAuthGroup) router.replace("/(auth)/login");
    else if (user && inAuthGroup) router.replace("/");
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TugasProvider>
        <Guard />
      </TugasProvider>
    </AuthProvider>
  );
}
