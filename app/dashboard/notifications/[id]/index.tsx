import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MobileNavigation } from "../../../../components/dashboard/MobileNavigation";
import { Notification, useNotificationsStore } from "../../../../src/stores/notificationsStore";

const NotificationDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notifications, markAsRead } = useNotificationsStore();
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (id) {
      const foundNotification = notifications.find((n) => n.id === id);
      if (foundNotification) {
        setNotification(foundNotification);
        // Mark as read when viewing
        if (!foundNotification.isRead) {
          markAsRead(id);
        }
      } else {
        // Notification not found, go back
        Alert.alert("Error", "Notification not found", [
          { text: "OK", onPress: () => router.back() }
        ]);
      }
    }
  }, [id, notifications, markAsRead, router]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "trip":
        return "car-outline";
      case "payment":
        return "card-outline";
      case "system":
        return "settings-outline";
      default:
        return "notifications-outline";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "trip":
        return "#EC1F81";
      case "payment":
        return "#10B981";
      case "system":
        return "#3B82F6";
      default:
        return "#6B7280";
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const handleAction = () => {
    if (!notification) return;

    switch (notification.type) {
      case "trip":
        router.push("/dashboard/tripRequests");
        break;
      case "payment":
        router.push("/dashboard/profile");
        break;
      case "system":
        router.push("/dashboard/settings");
        break;
      default:
        Alert.alert("Info", "No specific action available for this notification");
    }
  };

  if (!notification) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 dark:text-gray-400">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            Notification
          </Text>
          <View className="w-6" />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4 space-y-6">
          {/* Notification Header */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <View className="flex-row items-start space-x-4">
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: `${getNotificationColor(notification.type)}20` }}
              >
                <Ionicons
                  name={getNotificationIcon(notification.type) as any}
                  size={24}
                  color={getNotificationColor(notification.type)}
                />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {notification.title}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  {formatTimestamp(notification.timestamp.getTime())}
                </Text>
              </View>
            </View>
          </View>

          {/* Notification Content */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Details
            </Text>
            <Text className="text-gray-700 dark:text-gray-300 leading-6">
              {notification.message}
            </Text>
          </View>

          {/* Additional Information */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Information
            </Text>
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Type:</Text>
                <Text className="text-gray-900 dark:text-white capitalize">
                  {notification.type}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Status:</Text>
                <View className="flex-row items-center">
                  <View
                    className={`w-2 h-2 rounded-full mr-2 ${
                      notification.isRead ? "bg-gray-400" : "bg-blue-500"
                    }`}
                  />
                  <Text className="text-gray-900 dark:text-white">
                    {notification.isRead ? "Read" : "Unread"}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Date:</Text>
                <Text className="text-gray-900 dark:text-white">
                  {notification.timestamp.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={handleAction}
            className="bg-[#EC1F81] rounded-lg py-4 items-center"
          >
            <Text className="text-white font-semibold text-lg">
              {notification.type === "trip" && "View Trip Requests"}
              {notification.type === "payment" && "View Profile"}
              {notification.type === "system" && "Open Settings"}
              {!["trip", "payment", "system"].includes(notification.type) && "Take Action"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </SafeAreaView>
  );
};

export default NotificationDetailScreen;
