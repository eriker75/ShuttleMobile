import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDriverAuthStore } from "../../src/stores/driverAuthStore";

const VehicleStatusScreen = () => {
  const router = useRouter();
  const { driverVehicle, setDriverVehicle } = useDriverAuthStore();
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeactivate = async () => {
    if (!reason.trim()) {
      Alert.alert("Error", "Please provide a reason for putting the vehicle out of service");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setDriverVehicle({
        ...driverVehicle!,
        isActive: false,
      });

      Alert.alert("Success", "Vehicle has been put out of service", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch {
      Alert.alert("Error", "Failed to update vehicle status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            Vehicle Status
          </Text>
          <View className="w-6" />
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="space-y-6">
          {/* Vehicle Information */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Vehicle Information
            </Text>
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">
                  Make & Model:
                </Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle?.make} {driverVehicle?.model}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Year:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle?.year}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">
                  License Plate:
                </Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle?.licensePlate}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Color:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle?.color}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">
                  Capacity:
                </Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {driverVehicle?.capacity} passengers
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">
                  Current Status:
                </Text>
                <View className="flex-row items-center">
                  <View className="w-2 h-2 rounded-full mr-2 bg-green-500" />
                  <Text className="text-gray-900 dark:text-white font-medium">
                    Active
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Warning Message */}
          <View className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <View className="flex-row items-start">
              <Ionicons name="warning-outline" size={20} color="#F59E0B" />
              <View className="ml-3 flex-1">
                <Text className="text-yellow-800 dark:text-yellow-200 font-semibold mb-1">
                  Important Notice
                </Text>
                <Text className="text-yellow-700 dark:text-yellow-300 text-sm">
                  Putting your vehicle out of service will prevent you from receiving trip requests.
                  Make sure to provide a valid reason for this action.
                </Text>
              </View>
            </View>
          </View>

          {/* Reason Input */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Reason for Deactivation
            </Text>
            <View>
              <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                Please provide a reason for putting your vehicle out of service
              </Text>
              <TextInput
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 text-gray-900 dark:text-white"
                placeholder="Enter the reason (e.g., maintenance, personal reasons, etc.)"
                placeholderTextColor="#9CA3AF"
                value={reason}
                onChangeText={setReason}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Deactivate Button */}
          <TouchableOpacity
            onPress={handleDeactivate}
            disabled={isLoading}
            className={`bg-red-500 rounded-lg py-4 items-center ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            <Text className="text-white font-semibold text-lg">
              {isLoading ? "Processing..." : "Put Vehicle Out of Service"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default VehicleStatusScreen;
