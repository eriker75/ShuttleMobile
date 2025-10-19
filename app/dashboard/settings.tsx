import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MobileNavigation } from "../../components/dashboard/MobileNavigation";
import { useDriverAuthStore } from "../../src/stores/driverAuthStore";

const SettingsScreen = () => {
  const router = useRouter();
  const { driverProfile, setDriverProfile } = useDriverAuthStore();

  const [settings, setSettings] = useState({
    isActive: driverProfile?.isActive ?? true,
    allowNotifications: true,
    locationTracking: true,
    darkMode: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));

    // Update driver profile if it's the active status
    if (key === 'isActive') {
      setDriverProfile({
        ...driverProfile,
        isActive: value,
      });
    }
  };


  const SettingItem = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
    type = "toggle"
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    type?: "toggle" | "button";
  }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg items-center justify-center mr-3">
          <Ionicons name={icon} size={20} color="#6B7280" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 dark:text-white font-medium">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {type === "toggle" && onValueChange !== undefined ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#E5E7EB", true: "#EC1F81" }}
          thumbColor={value ? "#FFFFFF" : "#FFFFFF"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      )}
    </View>
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
            Settings
          </Text>
          <View className="w-6" />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Driver Status */}
        <View className="bg-white dark:bg-gray-800 rounded-lg mx-4 mt-4 shadow-sm">
          <View className="p-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Driver Status
            </Text>
            <SettingItem
              icon="person-circle-outline"
              title="Active Status"
              subtitle="Enable to receive trip requests"
              value={settings.isActive}
              onValueChange={(value) => updateSetting("isActive", value)}
            />
          </View>
        </View>

        {/* Notifications & Location */}
        <View className="bg-white dark:bg-gray-800 rounded-lg mx-4 mt-4 shadow-sm">
          <View className="p-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Notifications & Location
            </Text>
            <SettingItem
              icon="notifications-outline"
              title="Allow Notifications"
              subtitle="Receive push notifications for trips"
              value={settings.allowNotifications}
              onValueChange={(value) => updateSetting("allowNotifications", value)}
            />
            <SettingItem
              icon="location-outline"
              title="Location Tracking"
              subtitle="Allow location tracking for trip matching"
              value={settings.locationTracking}
              onValueChange={(value) => updateSetting("locationTracking", value)}
            />
          </View>
        </View>

        {/* App Settings */}
        <View className="bg-white dark:bg-gray-800 rounded-lg mx-4 mt-4 shadow-sm">
          <View className="p-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              App Settings
            </Text>
            <SettingItem
              icon="moon-outline"
              title="Dark Mode"
              subtitle="Switch between light and dark themes"
              value={settings.darkMode}
              onValueChange={(value) => updateSetting("darkMode", value)}
            />
          </View>
        </View>


        {/* App Version */}
        <View className="items-center py-6">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            Shuttle Mobile Driver App
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-xs mt-1">
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </SafeAreaView>
  );
};

export default SettingsScreen;
