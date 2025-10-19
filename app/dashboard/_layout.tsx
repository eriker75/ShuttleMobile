import { Stack } from "expo-router";
import React from "react";
import { AuthGuard } from "../../components/auth/AuthGuard";

export default function DashboardLayout() {
  return (
    <AuthGuard>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="tripRequests" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="editProfile" />
        <Stack.Screen name="editVehicle" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="helpSupport" />
      </Stack>
    </AuthGuard>
  );
}
