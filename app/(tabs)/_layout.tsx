import { Link, Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable } from "react-native";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// Warna tetap, tidak bergantung tema HP (terang/gelap)
const WARNA_AKTIF = "#2563eb";
const WARNA_TIDAK_AKTIF = "#64748b";
const WARNA_TEKS = "#0f172a";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: WARNA_AKTIF,
        tabBarInactiveTintColor: WARNA_TIDAK_AKTIF,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tugas Kuliah",
          headerTitle: "Tracker Tugas & Deadline",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "list.bullet",
                android: "list",
                web: "list",
              }}
              tintColor={color}
              size={28}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable style={{ marginRight: 15 }}>
                {({ pressed }) => (
                  <SymbolView
                    name={{ ios: "info.circle", android: "info", web: "info" }}
                    size={25}
                    tintColor={WARNA_TEKS}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Statistik",
          headerTitle: "Ringkasan Tugas",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "chart.bar",
                android: "bar_chart",
                web: "bar_chart",
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}