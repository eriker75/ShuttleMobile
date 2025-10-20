import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { AuthGuard } from "../../components/auth/AuthGuard";

export default function DashboardLayout() {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#000000",
            borderTopColor: "#374151",
            borderTopWidth: 1,
            paddingBottom: 20, // Increased bottom padding for better spacing
            paddingTop: 8,
            height: Platform.OS === "android" ? 110 : 80, // Increased height to accommodate more padding
          },
          tabBarActiveTintColor: "#EC1F81",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="tripRequests"
          options={{
            title: "Trips",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="car-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
