import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DRIVER_DASHBOARD_ROUTES } from '../../src/constants/dashboardRoutes';

export function MobileNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    router.push(href as any);
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-black dark:bg-black border-t border-gray-200 dark:border-gray-700 px-2 py-2">
      <View className="flex-row justify-around">
        {DRIVER_DASHBOARD_ROUTES.map((item) => {
          const isActive = pathname === item.href;
          return (
            <TouchableOpacity
              key={item.href}
              onPress={() => handleNavigation(item.href)}
              className={`flex-1 items-center py-3 rounded-lg mx-1 ${
                isActive
                  ? 'bg-gray-800 dark:bg-white'
                  : 'bg-transparent'
              }`}
              style={{ minWidth: 80 }}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={isActive ? '#EC1F81' : '#9CA3AF'}
              />
              <View className="mt-1">
                <Text
                  className={`text-xs font-bold ${
                    isActive
                      ? 'text-[#EC1F81] dark:text-black'
                      : 'text-gray-300 dark:text-gray-400'
                  }`}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
