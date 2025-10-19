import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useDriverAuthStore } from "../../src/stores/driverAuthStore";

interface DashboardHeaderProps {
  title: string;
  notificationsOpen: boolean;
  onToggleNotifications: () => void;
  showNotifications?: boolean;
}

export function DashboardHeader({
  title,
  notificationsOpen,
  onToggleNotifications,
  showNotifications = true,
}: DashboardHeaderProps) {
  const router = useRouter();
  const { logout } = useDriverAuthStore();

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/auth/login");
        },
      },
    ]);
  };
  return (
    <View className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <View className="flex-row items-center justify-between">
        {/* Title */}
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </Text>
        </View>

        {/* Right side actions */}
        <View className="flex-row items-center space-x-3">
          {/* Notifications */}
          {showNotifications && (
            <TouchableOpacity
              onPress={onToggleNotifications}
              className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-700"
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={notificationsOpen ? "#EC1F81" : "#6B7280"}
              />
              {/* Notification badge - you can add logic to show/hide based on notifications */}
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </TouchableOpacity>
          )}

          {/* Profile/Menu button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
          >
            <Ionicons name="log-out-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
