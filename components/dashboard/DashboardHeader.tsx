import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNotificationsStore } from "../../src/stores/notificationsStore";

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
  const { unreadCount } = useNotificationsStore();

  const handleNotificationsPress = () => {
    router.push("/dashboard/notifications" as any);
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
              onPress={handleNotificationsPress}
              className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-700"
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={notificationsOpen ? "#EC1F81" : "#6B7280"}
              />
              {/* Notification badge - show only if there are unread notifications */}
              {unreadCount > 0 && (
                <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </TouchableOpacity>
          )}

        </View>
      </View>
    </View>
  );
}
