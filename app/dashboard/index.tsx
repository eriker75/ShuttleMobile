import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DashboardLayout } from '../../components/dashboard';

const DashboardHomeScreen = () => {
  return (
    <DashboardLayout title="Dashboard">
      <View className="space-y-4">
        {/* Welcome Card */}
        <View className="bg-gradient-to-r from-[#EC1F81] to-[#FF6B9D] rounded-lg p-6 shadow-sm">
          <Text className="text-white text-xl font-bold mb-2">
            Welcome back, Driver!
          </Text>
          <Text className="text-white/90">
            Ready to start your next trip?
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="flex-row space-x-3">
          <View className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <Ionicons name="car" size={24} color="#EC1F81" />
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                12
              </Text>
            </View>
            <Text className="text-gray-600 dark:text-gray-400 text-sm">
              Trips Today
            </Text>
          </View>

          <View className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <Ionicons name="star" size={24} color="#F59E0B" />
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                4.8
              </Text>
            </View>
            <Text className="text-gray-600 dark:text-gray-400 text-sm">
              Rating
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </Text>

          <View className="space-y-3">
            <TouchableOpacity className="flex-row items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Ionicons name="car-outline" size={24} color="#EC1F81" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-900 dark:text-white font-medium">
                  Start New Trip
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  Begin accepting ride requests
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Ionicons name="time-outline" size={24} color="#EC1F81" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-900 dark:text-white font-medium">
                  View Schedule
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  Check your upcoming trips
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Ionicons name="analytics-outline" size={24} color="#EC1F81" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-900 dark:text-white font-medium">
                  Earnings Report
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  View your daily earnings
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </Text>

          <View className="space-y-3">
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="text-gray-900 dark:text-white">
                  Trip completed to Downtown
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  2 hours ago • $15.50
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="text-gray-900 dark:text-white">
                  New trip request accepted
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  4 hours ago • Airport pickup
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="text-gray-900 dark:text-white">
                  Rating received: 5 stars
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  6 hours ago
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </DashboardLayout>
  );
};

export default DashboardHomeScreen;
