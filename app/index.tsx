import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDriverAuthStore } from "../src/stores/driverAuthStore";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated } = useDriverAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard/tripRequests");
    } else {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
      }}
    >
      <ActivityIndicator size="large" color="#EC1F81" />
    </View>
  );
}
