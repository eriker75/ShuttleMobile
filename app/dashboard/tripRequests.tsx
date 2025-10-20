import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { DashboardLayout } from "../../components/dashboard";
import { HStack } from "../../components/ui/hstack";
import { VStack } from "../../components/ui/vstack";

const { height: screenHeight } = Dimensions.get("window");

// Sample trip request data with New York coordinates
const sampleTripRequests = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    phoneNumber: "+1 (555) 123-4567",
    pickupLocation: {
      latitude: 40.7589 + (Math.random() - 0.5) * 0.01,
      longitude: -73.9851 + (Math.random() - 0.5) * 0.01,
      address: "Times Square, New York, NY",
    },
    destination: {
      latitude: 40.7505 + (Math.random() - 0.5) * 0.01,
      longitude: -73.9934 + (Math.random() - 0.5) * 0.01,
      address: "Central Park, New York, NY",
    },
    distance: "1.2 mi",
    estimatedTime: "8 min",
    requestTime: "2 min ago",
    pickupTime: "2024-01-15 14:30:00",
    status: "pending",
    tripType: "pickUpMarket",
  },
  {
    id: "2",
    customerName: "Michael Chen",
    phoneNumber: "+1 (555) 234-5678",
    pickupLocation: {
      latitude: 40.7614 + (Math.random() - 0.5) * 0.01,
      longitude: -73.9776 + (Math.random() - 0.5) * 0.01,
      address: "Brooklyn Bridge, New York, NY",
    },
    destination: {
      latitude: 40.6892 + (Math.random() - 0.5) * 0.01,
      longitude: -74.0445 + (Math.random() - 0.5) * 0.01,
      address: "Statue of Liberty, New York, NY",
    },
    distance: "3.8 mi",
    estimatedTime: "15 min",
    requestTime: "5 min ago",
    pickupTime: "2024-01-15 15:00:00",
    status: "pending",
    tripType: "fromMarket",
  },
  {
    id: "3",
    customerName: "Emily Rodriguez",
    phoneNumber: "+1 (555) 345-6789",
    pickupLocation: {
      latitude: 40.7505 + (Math.random() - 0.5) * 0.01,
      longitude: -73.9934 + (Math.random() - 0.5) * 0.01,
      address: "Central Park, New York, NY",
    },
    destination: {
      latitude: 40.7484 + (Math.random() - 0.5) * 0.01,
      longitude: -73.9857 + (Math.random() - 0.5) * 0.01,
      address: "Empire State Building, New York, NY",
    },
    distance: "2.1 mi",
    estimatedTime: "12 min",
    requestTime: "1 min ago",
    pickupTime: "2024-01-15 16:15:00",
    status: "pending",
    tripType: "pickUpMarket",
  },
];

const DriverTripRequestsScreen = () => {
  const [tripRequests, setTripRequests] = useState(sampleTripRequests);
  const [activeTrip, setActiveTrip] = useState<string | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number, longitude: number}[]>([]);
  const mapRef = useRef<MapView>(null);

  const getRoute = async (origin: {latitude: number, longitude: number}, destination: {latitude: number, longitude: number}) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=AIzaSyDTjhqMf2Oc_1E9fJkoiSGyKBhK1AFSuW0`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const points = data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        setRouteCoordinates(decodedPoints);
      }
    } catch (error) {
      console.log('Error fetching route:', error);
    }
  };

  const decodePolyline = (encoded: string) => {
    const points = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

  const openInMaps = (trip: any) => {
    const url = `https://www.google.com/maps/dir/${trip.pickupLocation.latitude},${trip.pickupLocation.longitude}/${trip.destination.latitude},${trip.destination.longitude}`;
    Linking.openURL(url).catch(err => console.error('Error opening maps:', err));
  };

  const makePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err => console.error('Error opening phone dialer:', err));
  };

  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: mapRef.current.props.initialRegion?.latitude || 0,
        longitude: mapRef.current.props.initialRegion?.longitude || 0,
        latitudeDelta: (mapRef.current.props.initialRegion?.latitudeDelta || 0.01) * 0.5,
        longitudeDelta: (mapRef.current.props.initialRegion?.longitudeDelta || 0.01) * 0.5,
      }, 1000);
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: mapRef.current.props.initialRegion?.latitude || 0,
        longitude: mapRef.current.props.initialRegion?.longitude || 0,
        latitudeDelta: (mapRef.current.props.initialRegion?.latitudeDelta || 0.01) * 2,
        longitudeDelta: (mapRef.current.props.initialRegion?.longitudeDelta || 0.01) * 2,
      }, 1000);
    }
  };

  const handleAcceptTrip = (tripId: string) => {
    setActiveTrip(tripId);
    setTripRequests((prev) =>
      prev.map((trip) =>
        trip.id === tripId ? { ...trip, status: "accepted" } : trip
      )
    );

    // Get route for the accepted trip
    const trip = tripRequests.find(t => t.id === tripId);
    if (trip) {
      getRoute(trip.pickupLocation, trip.destination);
    }
  };

  const handleNextStatus = (tripId: string) => {
    setTripRequests((prev) =>
      prev.map((trip) => {
        if (trip.id === tripId) {
          const statuses = [
            "accepted",
            "on_the_way",
            "arrived",
            "picked_up",
            "completed",
          ];
          const currentIndex = statuses.indexOf(trip.status);
          const nextStatus = statuses[currentIndex + 1] || "completed";
          return { ...trip, status: nextStatus };
        }
        return trip;
      })
    );
  };

  const handleCancelTrip = (tripId: string) => {
    Alert.alert("Cancel Trip", "Are you sure you want to cancel this trip?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          setActiveTrip(null);
          setTripRequests((prev) =>
            prev.map((trip) =>
              trip.id === tripId ? { ...trip, status: "pending" } : trip
            )
          );
        },
      },
    ]);
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${dateStr} ${time}`;
  };

  const getStatusButtonText = (trip: any) => {
    switch (trip.status) {
      case "accepted":
        return "Start Trip";
      case "on_the_way":
        return "Arrived at Pickup";
      case "arrived":
        return "Start Ride to Supermarket";
      case "picked_up":
        return "Complete at Supermarket";
      default:
        return "Accept Trip";
    }
  };

  const renderTripRequestCard = (trip: (typeof sampleTripRequests)[0]) => {
    const isActive = activeTrip === trip.id;

    // Calculate dynamic height: screen height - header - tabs - padding - breathing room
    // Approximate header height: 60px, tabs height: 80px, padding: 40px, breathing room: 60px
    const availableHeight = screenHeight - 240;
    const minHeight = 280;
    const cardHeight = isActive ? Math.max(availableHeight, minHeight) : "auto";

    const mapHeight = isActive ? Math.max(availableHeight - 240, 180) : 160;

    return (
      <View
        key={trip.id}
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm mb-4 ${
          isActive ? "border-2 border-[#ec1381] rounded-xl" : "rounded-xl"
        }`}
        style={{
          minHeight: cardHeight,
          width: isActive ? "96%" : "92%",
          alignSelf: "center",
        }}
      >
        <VStack className={isActive ? "p-3" : "p-5"}>
          {/* Destination at the top */}
          <VStack className="mb-2">
            <HStack className="items-center mb-1">
              <Ionicons name="location" size={24} color="#ec1381" />
              <Text className="text-xl font-bold text-gray-900 dark:text-white ml-2">
                {trip.destination.address}
              </Text>
            </HStack>
          </VStack>

          {/* Trip Information Block - 4 single lines */}
          <VStack className="mb-5 space-y-3">
            {/* Customer */}
            <HStack className="items-center">
              <Ionicons name="person-outline" size={20} color="#ec1381" />
              <Text className="font-bold text-gray-900 dark:text-white ml-2">Customer:</Text>
              <Text className="text-gray-900 dark:text-white ml-2">{trip.customerName}</Text>
            </HStack>

            {/* Location */}
            <HStack className="items-start">
              <Ionicons name="location-outline" size={20} color="#ec1381" />
              <Text className="font-bold text-gray-900 dark:text-white ml-2">Location:</Text>
              <Text className="text-gray-900 dark:text-white ml-2 flex-1">{trip.pickupLocation.address}</Text>
            </HStack>

            {/* Time */}
            <HStack className="items-center">
              <Ionicons name="calendar-outline" size={20} color="#ec1381" />
              <Text className="font-bold text-gray-900 dark:text-white ml-2">Time:</Text>
              <Text className="text-gray-900 dark:text-white ml-2">{formatDateTime(trip.pickupTime)}</Text>
            </HStack>

            {/* Distance/Time */}
            <HStack className="items-center">
              <Ionicons name="car-outline" size={20} color="#ec1381" />
              <Text className="font-bold text-gray-900 dark:text-white ml-2">Distance & Time:</Text>
              <Text className="text-gray-900 dark:text-white ml-2">{trip.distance} • {trip.estimatedTime}</Text>
            </HStack>
          </VStack>

          {/* Map with border */}
          <View
            className="rounded-lg overflow-hidden border-2 border-[#ec1381] mb-5 relative"
            style={{ height: mapHeight }}
          >
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              initialRegion={{
                latitude: trip.pickupLocation.latitude,
                longitude: trip.pickupLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={isActive}
              zoomEnabled={isActive}
              showsUserLocation={true}
              showsMyLocationButton={false}
            >
              <Marker
                coordinate={trip.pickupLocation}
                title="Pickup Location"
                pinColor="#ec1381"
              />
              <Marker
                coordinate={trip.destination}
                title="Destination"
                pinColor="#10b981"
              />
              {routeCoordinates.length > 0 && (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeColor="#ec1381"
                  strokeWidth={4}
                  lineDashPattern={[5, 5]}
                />
              )}
            </MapView>

            {/* Botones de zoom - solo en vista activa */}
            {isActive && (
              <>
                {/* Botones de zoom en esquina superior derecha */}
                <View className="absolute top-3 right-3 flex-col" style={{ gap: 8 }}>
                  <TouchableOpacity
                    className="bg-white rounded-full w-10 h-10 items-center justify-center shadow-lg"
                    onPress={zoomIn}
                  >
                    <Ionicons name="add" size={20} color="#ec1381" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-white rounded-full w-10 h-10 items-center justify-center shadow-lg"
                    onPress={zoomOut}
                  >
                    <Ionicons name="remove" size={20} color="#ec1381" />
                  </TouchableOpacity>
                </View>

                {/* Botón de abrir en Maps - parte inferior centrado */}
                <View className="absolute bottom-2 left-0 right-0 items-center">
                  <TouchableOpacity
                    className="bg-[#ec1381] px-4 py-2 rounded-full flex-row items-center shadow-lg"
                    onPress={() => openInMaps(trip)}
                  >
                    <Ionicons name="open-outline" size={16} color="white" />
                    <Text className="text-white font-semibold ml-2">Abrir en Maps</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          {/* Action Buttons */}
          <HStack className="gap-3">
            {trip.status === "pending" ? (
              <TouchableOpacity
                onPress={() => handleAcceptTrip(trip.id)}
                className="flex-1 bg-[#ec1381] py-3 px-4 rounded-lg"
              >
                <HStack className="items-center justify-center">
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    Start Trip
                  </Text>
                </HStack>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => handleNextStatus(trip.id)}
                  className="flex-1 bg-[#ec1381] py-3 px-4 rounded-lg"
                >
                  <HStack className="items-center justify-center">
                    <Ionicons name="checkmark-circle" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">
                      {getStatusButtonText(trip)}
                    </Text>
                  </HStack>
                </TouchableOpacity>

                {trip.status !== "completed" && (
                  <TouchableOpacity
                    onPress={() => handleCancelTrip(trip.id)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 py-3 px-4 rounded-lg"
                  >
                    <HStack className="items-center justify-center">
                      <Ionicons name="close-circle" size={20} color="#6B7280" />
                      <Text className="text-gray-800 dark:text-gray-200 font-semibold ml-2">
                        Cancel
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  className="border border-[#ec1381] py-3 px-4 rounded-lg"
                  style={{ minWidth: 60 }}
                  onPress={() => makePhoneCall(trip.phoneNumber)}
                >
                  <HStack className="items-center justify-center">
                    <Ionicons name="call" size={20} color="#ec1381" />
                  </HStack>
                </TouchableOpacity>
              </>
            )}
          </HStack>
        </VStack>
      </View>
    );
  };

  // If there's an active trip, show expanded view but keep dashboard header
  if (activeTrip) {
    const activeTripData = tripRequests.find((trip) => trip.id === activeTrip);
    if (activeTripData) {
      return (
        <DashboardLayout title="Trip Requests">
          <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
            <View className="mt-4">
              {renderTripRequestCard(activeTripData)}
            </View>
          </ScrollView>
        </DashboardLayout>
      );
    }
  }

  return (
    <DashboardLayout title="Trip Requests">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        {tripRequests.length > 0 ? (
          <VStack className="py-4">
            {tripRequests.map(renderTripRequestCard)}
          </VStack>
        ) : (
          <View className="flex-1 justify-center items-center p-8">
            <Text className="text-6xl mb-4">🚗</Text>
            <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Trip Requests
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 text-center">
              There are no available trip requests at the moment. Check back
              later!
            </Text>
          </View>
        )}
      </ScrollView>
    </DashboardLayout>
  );
};

export default DriverTripRequestsScreen;
