import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDriverAuthStore } from "../../src/stores/driverAuthStore";

const DriverVerificationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { login } = useDriverAuthStore();

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  const userEmail = (params.email as string) || "driverUser";

  // Timer for resend code
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleVerifyCode = async () => {
    if (!code.trim() || code.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate code verification - any 6-digit code works for demo
      const success = await login(userEmail, "1234");

      if (success) {
        Alert.alert("Success", "Verification successful!", [
          { text: "OK", onPress: () => router.replace("/dashboard/tripRequests") },
        ]);
      } else {
        Alert.alert("Error", "Invalid verification code");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;

    setTimeLeft(300);
    setCanResend(false);
    Alert.alert("Code Sent", `Verification code sent to ${userEmail}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 justify-center items-center px-6">
        {/* Header */}
        <View className="w-full max-w-sm mb-8">
          <View className="bg-black rounded-t-3xl p-8 items-center justify-center h-32">
            <View className="w-24 h-24 bg-white rounded-lg items-center justify-center">
              <Ionicons name="shield-checkmark" size={48} color="#EC1F81" />
            </View>
          </View>
        </View>

        {/* Verification Form */}
        <View className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm p-8">
          <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Enter Verification Code
          </Text>

          <Text className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4">
            We sent a verification code to
          </Text>

          <Text className="text-[#EC1F81] text-sm text-center font-medium mb-6">
            {userEmail}
          </Text>

          {/* Code Input */}
          <View className="mb-6">
            <TextInput
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-center text-2xl tracking-widest text-gray-900 dark:text-white"
              placeholder="000000"
              placeholderTextColor="#9CA3AF"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
              maxLength={6}
              autoFocus
            />
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleVerifyCode}
            disabled={isLoading || code.length !== 6}
            className={`bg-[#EC1F81] rounded-lg py-4 items-center mb-4 ${
              isLoading || code.length !== 6 ? "opacity-50" : ""
            }`}
          >
            {isLoading ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-semibold ml-2">
                  Verifying...
                </Text>
              </View>
            ) : (
              <Text className="text-white font-semibold text-lg">
                Verify Code
              </Text>
            )}
          </TouchableOpacity>

          {/* Resend Code */}
          <View className="items-center">
            {canResend ? (
              <TouchableOpacity onPress={handleResendCode}>
                <Text className="text-[#EC1F81] font-medium">Resend Code</Text>
              </TouchableOpacity>
            ) : (
              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                Resend code in {formatTime(timeLeft)}
              </Text>
            )}
          </View>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-6 items-center"
          >
            <Text className="text-[#EC1F81] font-medium">← Back to login</Text>
          </TouchableOpacity>
        </View>

        {/* Demo Info */}
        <View className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full max-w-sm">
          <Text className="text-gray-600 dark:text-gray-400 text-sm text-center mb-2">
            Demo: Enter any 6-digit code
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriverVerificationScreen;
