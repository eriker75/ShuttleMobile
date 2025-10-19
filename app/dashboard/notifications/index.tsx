import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MobileNavigation } from "../../../components/dashboard/MobileNavigation";
import { Notification, useNotificationsStore } from "../../../src/stores/notificationsStore";

const NotificationsScreen = () => {
  const router = useRouter();
  const {
    notifications,
    markAllAsRead,
    clearAll
  } = useNotificationsStore();

  const handleNotificationPress = (notification: Notification) => {
    // Navigate to notification detail screen
    router.push(`/dashboard/notifications/${notification.id}` as any);
  };

  const handleMarkAllAsRead = () => {
    Alert.alert(
      "Mark All as Read",
      "Are you sure you want to mark all notifications as read?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Mark All", onPress: markAllAsRead }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to delete all notifications? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", style: "destructive", onPress: clearAll }
      ]
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trip':
        return 'car-outline';
      case 'payment':
        return 'card-outline';
      case 'system':
        return 'settings-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'trip':
        return '#EC1F81';
      case 'payment':
        return '#10B981';
      case 'system':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <TouchableOpacity
      onPress={() => handleNotificationPress(notification)}
      className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
        notification.isRead ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20'
      }`}
    >
      <View className="flex-row items-start">
        <View className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center mr-3 flex-shrink-0">
          <Ionicons
            name={getNotificationIcon(notification.type) as any}
            size={20}
            color={getNotificationColor(notification.type)}
          />
        </View>

        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-1">
            <Text className={`font-semibold text-sm flex-1 ${
              notification.isRead
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-900 dark:text-white'
            }`}>
              {notification.title}
            </Text>
            {!notification.isRead && (
              <View className="w-2 h-2 bg-[#EC1F81] rounded-full ml-2 flex-shrink-0" />
            )}
          </View>

          <Text className={`text-sm mb-2 ${
            notification.isRead
              ? 'text-gray-600 dark:text-gray-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {notification.message}
          </Text>

          <Text className="text-xs text-gray-500 dark:text-gray-500">
            {formatTimestamp(notification.timestamp)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            Notifications
          </Text>
          <View className="w-6" />
        </View>
      </View>

      {/* Actions */}
      {notifications.length > 0 && (
        <View className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={handleMarkAllAsRead}
              className="flex-row items-center"
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
              <Text className="text-green-600 dark:text-green-400 font-medium ml-2">
                Mark All Read
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleClearAll}
              className="flex-row items-center"
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
              <Text className="text-red-500 font-medium ml-2">
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Notifications List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="notifications-off-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 dark:text-gray-400 text-lg font-medium mt-4">
              No Notifications
            </Text>
            <Text className="text-gray-400 dark:text-gray-500 text-sm text-center mt-2">
              You&apos;re all caught up! New notifications will appear here.
            </Text>
          </View>
        ) : (
          <View className="bg-white dark:bg-gray-800">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
