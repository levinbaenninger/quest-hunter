import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type ProximityResult = {
  isNearby: boolean;
  isLoading: boolean;
  permissionDenied: boolean;
  locationGranted: boolean;
};

function haversineDistance(a: Coordinates, b: Coordinates): number {
  const R = 6371000; // Earth radius in metres
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const h =
    sinLat * sinLat +
    Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * sinLon * sinLon;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function useProximity(
  target: Coordinates,
  radiusMeters = 20,
): ProximityResult {
  const [isNearby, setIsNearby] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const wasNearbyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (cancelled) return;

      if (status !== "granted") {
        setPermissionDenied(true);
        setIsLoading(false);
        return;
      }

      setLocationGranted(true);

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 5,
          timeInterval: 5000,
        },
        (position) => {
          if (cancelled) return;

          const distance = haversineDistance(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            target,
          );

          const nearby = distance <= radiusMeters;

          if (nearby && !wasNearbyRef.current) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }

          wasNearbyRef.current = nearby;
          setIsNearby(nearby);
          setIsLoading(false);
        },
      );
    };

    start();

    return () => {
      cancelled = true;
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
    };
  }, [target.latitude, target.longitude, radiusMeters]);

  return { isNearby, isLoading, permissionDenied, locationGranted };
}
