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
import { useDriverAuthStore } from "../../../src/stores/driverAuthStore";

const EditProfileScreen = () => {
  const router = useRouter();
  const { driverProfile, setDriverProfile } = useDriverAuthStore();

  const [formData, setFormData] = useState({
    name: driverProfile?.name || "",
    email: driverProfile?.email || "",
    phone: driverProfile?.phone || "",
    idCard: driverProfile?.idCard || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      Alert.alert("Error", "Name and email are required");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setDriverProfile({
        ...driverProfile,
        ...formData,
      });

      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoEdit = () => {
    Alert.alert(
      "Change Profile Photo",
      "Choose an option",
      [
        { text: "Camera", onPress: () => console.log("Open camera") },
        { text: "Gallery", onPress: () => console.log("Open gallery") },
        { text: "Cancel", style: "cancel" }
      ]
    );
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
            Edit Profile
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
          {/* Profile Picture Section */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <View className="items-center">
              <TouchableOpacity className="relative" onPress={handlePhotoEdit}>
                <View className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full items-center justify-center">
                  <Ionicons name="person" size={48} color="#6B7280" />
                </View>
                {/* Edit indicator */}
                <View className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#EC1F81] rounded-full items-center justify-center border-2 border-white dark:border-gray-800">
                  <Ionicons name="pencil" size={16} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Personal Information */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Personal Information
            </Text>

            <View className="space-y-4">
              {/* Name */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Full Name
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="person-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    value={formData.name}
                    onChangeText={(value) => updateField("name", value)}
                  />
                </View>
              </View>

              {/* Email */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Email Address
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="mail-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    value={formData.email}
                    onChangeText={(value) => updateField("email", value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Phone */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Phone Number
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="call-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter your phone number"
                    placeholderTextColor="#9CA3AF"
                    value={formData.phone}
                    onChangeText={(value) => updateField("phone", value)}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* ID Card */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  ID Card Number
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
                  <Ionicons name="card-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Enter your ID card number"
                    placeholderTextColor="#9CA3AF"
                    value={formData.idCard || ""}
                    onChangeText={(value) => updateField("idCard", value)}
                  />
                </View>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={isLoading}
              className={`bg-[#EC1F81] rounded-lg py-4 items-center mt-6 ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              <Text className="text-white font-semibold text-lg">
                {isLoading ? "Saving..." : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default EditProfileScreen;
