import React from "react";
import { Text, View } from "react-native";
import { DashboardLayout } from "../../components/dashboard";

const DriverTripRequestsScreen = () => {
  return (
    <DashboardLayout title="Trip Requests">
      <View className="space-y-4">
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Active Trip Requests
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            No active trip requests at the moment.
          </Text>
        </View>

        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Recent Trips
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Your recent trip history will appear here.
          </Text>
        </View>
      </View>
    </DashboardLayout>
  );
};

export default DriverTripRequestsScreen;
