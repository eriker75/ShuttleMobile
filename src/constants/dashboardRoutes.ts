import { Ionicons } from '@expo/vector-icons';

export const DRIVER_DASHBOARD_ROUTES = [
  {
    href: '/dashboard',
    label: 'Home',
    icon: 'home-outline' as keyof typeof Ionicons.glyphMap,
  },
  {
    href: '/dashboard/tripRequests',
    label: 'Trips',
    icon: 'car-outline' as keyof typeof Ionicons.glyphMap,
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: 'person-outline' as keyof typeof Ionicons.glyphMap,
  },
];

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  VERIFICATION: '/auth/verification',
  DASHBOARD: '/dashboard',
} as const;
