import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MobileNavigation } from "../../components/dashboard/MobileNavigation";
import { useDriverAuthStore } from "../../src/stores/driverAuthStore";

const EditVehicleScreen = () => {
  const router = useRouter();
  const { driverVehicle, setDriverVehicle } = useDriverAuthStore();

  const [formData, setFormData] = useState({
    make: driverVehicle?.make || "",
    model: driverVehicle?.model || "",
    year: driverVehicle?.year?.toString() || "",
    licensePlate: driverVehicle?.licensePlate || "",
    color: driverVehicle?.color || "",
    capacity: driverVehicle?.capacity?.toString() || "",
    isActive: driverVehicle?.isActive ?? true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.make.trim() || !formData.model.trim() || !formData.licensePlate.trim()) {
      Alert.alert("Error", "Make, model, and license plate are required");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setDriverVehicle({
        ...driverVehicle,
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year) || 2020,
        licensePlate: formData.licensePlate,
        color: formData.color,
        capacity: parseInt(formData.capacity) || 4,
        isActive: formData.isActive,
      });

      Alert.alert("Success", "Vehicle information updated successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch {
      Alert.alert("Error", "Failed to update vehicle information");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            Edit Vehicle
          </Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={isLoading}
            className={`px-3 py-1 rounded-lg ${
              isLoading ? "opacity-50" : "bg-[#EC1F81]"
            }`}
          >
            <Text className="text-white font-medium">
              {isLoading ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="space-y-6">
          {/* Vehicle Status */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Vehicle Status
            </Text>

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-gray-900 dark:text-white font-medium mb-1">
                  Vehicle Active Status
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  {formData.isActive
                    ? "Vehicle is active and can receive trip requests"
                    : "Vehicle is disabled and will not receive trip requests"
                  }
                </Text>
              </View>
              <Switch
                value={formData.isActive}
                onValueChange={(value) => updateField("isActive", value)}
                trackColor={{ false: "#E5E7EB", true: "#EC1F81" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Vehicle Information */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Vehicle Information
            </Text>

            <View className="space-y-4">
              {/* Make */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Make
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="car-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter vehicle make"
                    placeholderTextColor="#9CA3AF"
                    value={formData.make}
                    onChangeText={(value) => updateField("make", value)}
                  />
                </View>
              </View>

              {/* Model */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Model
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="car-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter vehicle model"
                    placeholderTextColor="#9CA3AF"
                    value={formData.model}
                    onChangeText={(value) => updateField("model", value)}
                  />
                </View>
              </View>

              {/* Year */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Year
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter vehicle year"
                    placeholderTextColor="#9CA3AF"
                    value={formData.year}
                    onChangeText={(value) => updateField("year", value)}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* License Plate */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  License Plate
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="card-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter license plate"
                    placeholderTextColor="#9CA3AF"
                    value={formData.licensePlate}
                    onChangeText={(value) => updateField("licensePlate", value)}
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              {/* Color */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Color
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="color-palette-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter vehicle color"
                    placeholderTextColor="#9CA3AF"
                    value={formData.color}
                    onChangeText={(value) => updateField("color", value)}
                  />
                </View>
              </View>

              {/* Capacity */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Passenger Capacity
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="people-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter passenger capacity"
                    placeholderTextColor="#9CA3AF"
                    value={formData.capacity}
                    onChangeText={(value) => updateField("capacity", value)}
                    keyboardType="numeric"
                  />
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
                  Changing your vehicle status will affect your ability to receive trip requests.
                  Make sure all information is accurate before saving.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </SafeAreaView>
  );
};

export default EditVehicleScreen;
