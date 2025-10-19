import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
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
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
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
          name="editProfile"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="helpSupport"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="vehicleStatus"
          options={{
            href: null,
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
