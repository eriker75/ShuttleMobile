import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDriverAuthStore } from '../../src/stores/driverAuthStore';

const DriverLoginScreen = () => {
  const router = useRouter();
  const { login } = useDriverAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email.trim(), password.trim());

      if (success) {
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => router.replace('/dashboard') }
        ]);
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 justify-center items-center px-6">
        {/* Logo Section */}
        <View className="w-full max-w-sm mb-8">
          <View className="bg-black rounded-t-3xl p-8 items-center justify-center h-32">
            <View className="w-24 h-24 bg-white rounded-lg items-center justify-center">
              <Ionicons name="car" size={48} color="#EC1F81" />
            </View>
          </View>
        </View>

        {/* Login Form */}
        <View className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm p-8">
          <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Driver Access
          </Text>

          <Text className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
            Enter your credentials to access the driver dashboard
          </Text>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">Email</Text>
            <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-900 dark:text-white"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">Password</Text>
            <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3">
              <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-900 dark:text-white"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="ml-2"
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`bg-[#EC1F81] rounded-lg py-4 items-center ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            {isLoading ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-semibold ml-2">Signing in...</Text>
              </View>
            ) : (
              <Text className="text-white font-semibold text-lg">Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Demo Credentials */}
          <View className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Text className="text-gray-600 dark:text-gray-400 text-sm text-center mb-2">
              Demo Credentials:
            </Text>
            <Text className="text-gray-800 dark:text-gray-200 text-sm text-center font-medium">
              Email: driverUser
            </Text>
            <Text className="text-gray-800 dark:text-gray-200 text-sm text-center font-medium">
              Password: 1234
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-8">
          <Text className="text-gray-500 dark:text-gray-400 text-xs text-center">
            Shuttle Mobile Driver App
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriverLoginScreen;
