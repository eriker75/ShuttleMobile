import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDriverAuthStore } from '../../src/stores/driverAuthStore';
import { DashboardHeader } from './DashboardHeader';
import { MobileNavigation } from './MobileNavigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  showNotifications?: boolean;
  isLoading?: boolean;
}

export function DashboardLayout({
  children,
  title = "Dashboard",
  showNotifications = true,
  isLoading = false
}: DashboardLayoutProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { isAuthenticated } = useDriverAuthStore();

  const handleToggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  // Show loading state
  if (isLoading || !isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#EC1F81" />
          <View className="mt-4">
            <Text className="text-gray-600 dark:text-gray-400 text-center">
              Verifying authentication...
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <DashboardHeader
        title={title}
        notificationsOpen={notificationsOpen}
        onToggleNotifications={handleToggleNotifications}
        showNotifications={showNotifications}
      />

      {/* Main Content */}
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </SafeAreaView>
  );
}
