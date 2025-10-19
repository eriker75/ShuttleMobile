import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MobileNavigation } from "../../components/dashboard/MobileNavigation";

const HelpSupportScreen = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportPhone = "+1 (555) 123-4567";
  const supportWhatsApp = "+15551234567";

  const handleCall = () => {
    Linking.openURL(`tel:${supportPhone}`).catch(() => {
      Alert.alert("Error", "Unable to open phone app");
    });
  };

  const handleWhatsApp = () => {
    const whatsappUrl = `whatsapp://send?phone=${supportWhatsApp}&text=Hello, I need help with the Shuttle Driver App.`;
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed on this device");
    });
  };

  const handleSubmitSupport = async () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert("Error", "Please fill in both subject and message");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert(
        "Message Sent",
        "Your support request has been submitted. We'll get back to you within 24 hours.",
        [{ text: "OK", onPress: () => {
          setSubject("");
          setMessage("");
        }}]
      );
    } catch {
      Alert.alert("Error", "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const SupportButton = ({
    icon,
    title,
    subtitle,
    onPress,
    color = "#6B7280"
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-3"
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg items-center justify-center mr-4">
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 dark:text-white font-semibold">
            {title}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {subtitle}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            Help & Support
          </Text>
          <View className="w-6" />
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Support */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Support
          </Text>

          <SupportButton
            icon="call"
            title="Call Support"
            subtitle={supportPhone}
            onPress={handleCall}
            color="#10B981"
          />

          <SupportButton
            icon="logo-whatsapp"
            title="WhatsApp Support"
            subtitle="Chat with us on WhatsApp"
            onPress={handleWhatsApp}
            color="#25D366"
          />
        </View>

        {/* Send Message */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Send us a Message
          </Text>

          <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                Subject
              </Text>
              <TextInput
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 text-gray-900 dark:text-white"
                placeholder="What can we help you with?"
                placeholderTextColor="#9CA3AF"
                value={subject}
                onChangeText={setSubject}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                Message
              </Text>
              <TextInput
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 text-gray-900 dark:text-white"
                placeholder="Describe your issue or question..."
                placeholderTextColor="#9CA3AF"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmitSupport}
              disabled={isSubmitting}
              className={`bg-[#EC1F81] rounded-lg py-3 items-center ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              <Text className="text-white font-semibold">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </Text>

          <View className="space-y-3">
            <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <Text className="text-gray-900 dark:text-white font-semibold mb-2">
                How do I accept a trip request?
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                When you receive a trip request, tap &quot;Accept&quot; on the notification or in the Trips tab.
              </Text>
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <Text className="text-gray-900 dark:text-white font-semibold mb-2">
                How do I update my vehicle information?
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                Go to Profile → Vehicle Information → Edit to update your vehicle details.
              </Text>
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <Text className="text-gray-900 dark:text-white font-semibold mb-2">
                What should I do if I can&apos;t find a passenger?
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                Call the passenger using the number provided in the trip details, or contact support for assistance.
              </Text>
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <Text className="text-gray-900 dark:text-white font-semibold mb-2">
                How do I report a technical issue?
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                Use the &quot;Send us a Message&quot; form above or call our support line for immediate assistance.
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </SafeAreaView>
  );
};

export default HelpSupportScreen;
