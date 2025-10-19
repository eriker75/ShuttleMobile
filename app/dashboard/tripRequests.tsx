import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { DashboardLayout } from "../../components/dashboard";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { HStack } from "../../components/ui/hstack";
import { VStack } from "../../components/ui/vstack";

// Sample trip request data with random coordinates
const sampleTripRequests = [
  {
    id: "1",
    passengerName: "María González",
    passengerRating: 4.8,
    pickupLocation: {
      latitude: 19.4326 + (Math.random() - 0.5) * 0.1,
      longitude: -99.1332 + (Math.random() - 0.5) * 0.1,
      address: "Av. Reforma 123, Ciudad de México"
    },
    destination: {
      latitude: 19.4326 + (Math.random() - 0.5) * 0.1,
      longitude: -99.1332 + (Math.random() - 0.5) * 0.1,
      address: "Polanco, Ciudad de México"
    },
    distance: "8.5 km",
    estimatedFare: "$120 MXN",
    estimatedTime: "25 min",
    requestTime: "2 min ago"
  },
  {
    id: "2",
    passengerName: "Carlos Rodríguez",
    passengerRating: 4.6,
    pickupLocation: {
      latitude: 19.4326 + (Math.random() - 0.5) * 0.1,
      longitude: -99.1332 + (Math.random() - 0.5) * 0.1,
      address: "Centro Histórico, CDMX"
    },
    destination: {
      latitude: 19.4326 + (Math.random() - 0.5) * 0.1,
      longitude: -99.1332 + (Math.random() - 0.5) * 0.1,
      address: "Aeropuerto Internacional"
    },
    distance: "15.2 km",
    estimatedFare: "$180 MXN",
    estimatedTime: "35 min",
    requestTime: "5 min ago"
  },
  {
    id: "3",
    passengerName: "Ana Martínez",
    passengerRating: 4.9,
    pickupLocation: {
      latitude: 19.4326 + (Math.random() - 0.5) * 0.1,
      longitude: -99.1332 + (Math.random() - 0.5) * 0.1,
      address: "Coyoacán, Ciudad de México"
    },
    destination: {
      latitude: 19.4326 + (Math.random() - 0.5) * 0.1,
      longitude: -99.1332 + (Math.random() - 0.5) * 0.1,
      address: "Santa Fe, CDMX"
    },
    distance: "12.8 km",
    estimatedFare: "$150 MXN",
    estimatedTime: "30 min",
    requestTime: "1 min ago"
  }
];

const DriverTripRequestsScreen = () => {
  const [tripRequests, setTripRequests] = useState(sampleTripRequests);

  const handleAcceptTrip = (tripId: string) => {
    Alert.alert(
      "Trip Accepted",
      "You have accepted this trip request. Navigate to pickup location.",
      [
        {
          text: "OK",
          onPress: () => {
            // Remove accepted trip from the list
            setTripRequests(prev => prev.filter(trip => trip.id !== tripId));
          }
        }
      ]
    );
  };

  const handleRejectTrip = (tripId: string) => {
    Alert.alert(
      "Reject Trip",
      "Are you sure you want to reject this trip request?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reject",
          style: "destructive",
          onPress: () => {
            setTripRequests(prev => prev.filter(trip => trip.id !== tripId));
          }
        }
      ]
    );
  };

  const renderTripRequestCard = (trip: typeof sampleTripRequests[0]) => (
    <Card key={trip.id} className="mb-4 mx-4">
      <VStack className="p-4">
        {/* Passenger Info */}
        <HStack className="justify-between items-center mb-3">
          <VStack>
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">
              {trip.passengerName}
            </Text>
            <HStack className="items-center">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                ⭐ {trip.passengerRating}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-500 ml-2">
                • {trip.requestTime}
              </Text>
            </HStack>
          </VStack>
          <Badge className="bg-green-100 dark:bg-green-900">
            <Text className="text-green-800 dark:text-green-200 text-xs">
              {trip.estimatedFare}
            </Text>
          </Badge>
        </HStack>

        {/* Map */}
        <View className="h-48 rounded-lg overflow-hidden mb-3">
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: trip.pickupLocation.latitude,
              longitude: trip.pickupLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={trip.pickupLocation}
              title="Pickup Location"
              pinColor="green"
            />
            <Marker
              coordinate={trip.destination}
              title="Destination"
              pinColor="red"
            />
          </MapView>
        </View>

        {/* Trip Details */}
        <VStack className="mb-4">
          <HStack className="justify-between mb-2">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              From:
            </Text>
            <Text className="text-sm text-gray-900 dark:text-white flex-1 ml-2">
              {trip.pickupLocation.address}
            </Text>
          </HStack>
          <HStack className="justify-between mb-2">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              To:
            </Text>
            <Text className="text-sm text-gray-900 dark:text-white flex-1 ml-2">
              {trip.destination.address}
            </Text>
          </HStack>
          <HStack className="justify-between">
            <HStack className="items-center">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                📍 {trip.distance}
              </Text>
            </HStack>
            <HStack className="items-center">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                ⏱️ {trip.estimatedTime}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        {/* Action Buttons */}
        <HStack className="space-x-3">
          <Button
            className="flex-1 bg-red-500 hover:bg-red-600"
            onPress={() => handleRejectTrip(trip.id)}
          >
            <Text className="text-white font-semibold">Reject</Text>
          </Button>
          <Button
            className="flex-1 bg-green-500 hover:bg-green-600"
            onPress={() => handleAcceptTrip(trip.id)}
          >
            <Text className="text-white font-semibold">Accept</Text>
          </Button>
        </HStack>
      </VStack>
    </Card>
  );

  return (
    <DashboardLayout title="Trip Requests">
      <ScrollView className="flex-1">
        {tripRequests.length > 0 ? (
          <VStack className="py-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-4">
              Available Trip Requests ({tripRequests.length})
            </Text>
            {tripRequests.map(renderTripRequestCard)}
          </VStack>
        ) : (
          <View className="flex-1 justify-center items-center p-8">
            <Text className="text-6xl mb-4">🚗</Text>
            <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Trip Requests
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 text-center">
              There are no available trip requests at the moment. Check back later!
            </Text>
          </View>
        )}
      </ScrollView>
    </DashboardLayout>
  );
};

export default DriverTripRequestsScreen;
