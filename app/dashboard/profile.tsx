import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DashboardLayout } from "../../components/dashboard";
import { useDriverAuthStore } from "../../src/stores/driverAuthStore";

const DriverProfileScreen = () => {
  const { driverProfile, driverVehicle } = useDriverAuthStore();

  return (
    <DashboardLayout title="Profile">
      <View className="space-y-4">
        {/* Profile Header */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full items-center justify-center mb-3">
              <Ionicons name="person" size={40} color="#6B7280" />
            </View>
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              {driverProfile?.name || 'Driver Name'}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              {driverProfile?.email || 'driver@example.com'}
            </Text>
            {driverProfile?.phone && (
              <Text className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {driverProfile.phone}
              </Text>
            )}
          </View>
        </View>

        {/* Vehicle Information */}
        {driverVehicle && (
          <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Vehicle Information
            </Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Make & Model:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle.make} {driverVehicle.model}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Year:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle.year}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">License Plate:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle.licensePlate}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Color:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle.color}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Capacity:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle.capacity} passengers
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Profile Options */}
        <View className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={24} color="#6B7280" />
              <Text className="ml-3 text-gray-900 dark:text-white">Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <Ionicons name="settings-outline" size={24} color="#6B7280" />
              <Text className="ml-3 text-gray-900 dark:text-white">Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <Ionicons name="help-circle-outline" size={24} color="#6B7280" />
              <Text className="ml-3 text-gray-900 dark:text-white">Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={24} color="#EF4444" />
              <Text className="ml-3 text-red-500">Sign Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </DashboardLayout>
  );
};

export default DriverProfileScreen;
