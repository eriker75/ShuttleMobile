import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { DashboardLayout } from "../../../components/dashboard";
import { useDriverAuthStore } from "../../../src/stores/driverAuthStore";

const DriverProfileScreen = () => {
  const router = useRouter();
  const { driverProfile, driverVehicle } = useDriverAuthStore();

  return (
    <DashboardLayout title="Profile">
      <View className="space-y-4">
        {/* Personal Information */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </Text>

          {/* Profile Image */}
          <View className="items-center mb-6">
            <View className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full items-center justify-center">
              <Ionicons name="person" size={64} color="#6B7280" />
            </View>
          </View>

          {/* Personal Details */}
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">
                Full Name:
              </Text>
              <Text className="text-gray-900 dark:text-white font-medium">
                {driverProfile?.name || "Driver Name"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">Email:</Text>
              <Text className="text-gray-900 dark:text-white font-medium">
                {driverProfile?.email || "driver@example.com"}
              </Text>
            </View>
            {driverProfile?.phone && (
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Phone:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverProfile.phone}
                </Text>
              </View>
            )}
            {driverProfile?.idCard && (
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">
                  ID Card:
                </Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverProfile.idCard}
                </Text>
              </View>
            )}
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">Status:</Text>
              <View className="flex-row items-center">
                <View
                  className={`w-2 h-2 rounded-full mr-2 ${
                    driverProfile?.isActive !== false
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverProfile?.isActive !== false ? "Active" : "Inactive"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Vehicle Information */}
        {driverVehicle && (
          <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Vehicle Information
            </Text>

            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">
                  Make & Model:
                </Text>
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
                <Text className="text-gray-600 dark:text-gray-400">
                  License Plate:
                </Text>
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
                <Text className="text-gray-600 dark:text-gray-400">
                  Capacity:
                </Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle.capacity} passengers
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">
                  Status:
                </Text>
                <View className="flex-row items-center">
                  <View
                    className={`w-2 h-2 rounded-full mr-2 ${
                      driverVehicle.isActive !== false
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                  <Text className="text-gray-900 dark:text-white font-medium">
                    {driverVehicle.isActive !== false
                      ? "Active"
                      : "Unavailable"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Profile Options */}
        <View className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <TouchableOpacity
            onPress={() => router.push("/dashboard/profile/editProfile")}
            className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
          >
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={24} color="#6B7280" />
              <Text className="ml-3 text-gray-900 dark:text-white">
                Edit Profile
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          {driverVehicle && (
            <TouchableOpacity
              onPress={() => {
                if (driverVehicle.isActive !== false) {
                  // Vehicle is active, navigate to deactivation view
                  router.push("/dashboard/profile/vehicleStatus");
                } else {
                  // Vehicle is inactive, show confirmation to activate
                  Alert.alert(
                    "Activate Vehicle",
                    "Are you sure you want to activate your vehicle?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Activate",
                        onPress: () => {
                          const { setDriverVehicle } =
                            useDriverAuthStore.getState();
                          setDriverVehicle({
                            ...driverVehicle,
                            isActive: true,
                          });
                        },
                      },
                    ]
                  );
                }
              }}
              className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={
                    driverVehicle.isActive !== false
                      ? "car-outline"
                      : "car-sport-outline"
                  }
                  size={24}
                  color={
                    driverVehicle.isActive !== false ? "#6B7280" : "#F59E0B"
                  }
                />
                <Text
                  className={`ml-3 ${
                    driverVehicle.isActive !== false
                      ? "text-gray-900 dark:text-white"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                >
                  {driverVehicle.isActive !== false
                    ? "Put Vehicle Out of Service"
                    : "Reactivate Vehicle"}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => router.push("/dashboard/profile/settings")}
            className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
          >
            <View className="flex-row items-center">
              <Ionicons name="settings-outline" size={24} color="#6B7280" />
              <Text className="ml-3 text-gray-900 dark:text-white">
                Settings
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/dashboard/profile/helpSupport")}
            className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
          >
            <View className="flex-row items-center">
              <Ionicons name="help-circle-outline" size={24} color="#6B7280" />
              <Text className="ml-3 text-gray-900 dark:text-white">
                Help & Support
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert("Sign Out", "Are you sure you want to sign out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Sign Out",
                  style: "destructive",
                  onPress: () => {
                    const { logout } = useDriverAuthStore.getState();
                    logout();
                    router.replace("/auth/login");
                  },
                },
              ]);
            }}
            className="flex-row items-center justify-between p-4"
          >
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
