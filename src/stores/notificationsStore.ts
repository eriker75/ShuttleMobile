import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'trip' | 'system' | 'payment' | 'general';
  isRead: boolean;
  timestamp: Date;
  data?: any;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
}

export interface NotificationsActions {
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  getUnreadCount: () => number;
  getNotifications: () => Notification[];
}

export type NotificationsStore = NotificationsState & NotificationsActions;

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Trip Request',
    message: 'You have a new trip request from Downtown to Airport',
    type: 'trip',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    data: { tripId: 'trip_123' }
  },
  {
    id: '2',
    title: 'Trip Completed',
    message: 'Your trip to Airport has been completed successfully',
    type: 'trip',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    data: { tripId: 'trip_122', earnings: 25.50 }
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of $45.20 has been added to your account',
    type: 'payment',
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    data: { amount: 45.20 }
  },
  {
    id: '4',
    title: 'System Update',
    message: 'App has been updated to version 1.2.0 with new features',
    type: 'system',
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: '5',
    title: 'Rating Received',
    message: 'You received a 5-star rating from your last passenger',
    type: 'general',
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    data: { rating: 5 }
  }
];

const notificationsStoreCreator = (set: any, get: any): NotificationsStore => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter(n => !n.isRead).length,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    };

    set((state: NotificationsState) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (id: string) => {
    set((state: NotificationsState) => {
      const updatedNotifications = state.notifications.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      );

      const unreadCount = updatedNotifications.filter(n => !n.isRead).length;

      return {
        notifications: updatedNotifications,
        unreadCount,
      };
    });
  },

  markAllAsRead: () => {
    set((state: NotificationsState) => ({
      notifications: state.notifications.map(notification => ({
        ...notification,
        isRead: true,
      })),
      unreadCount: 0,
    }));
  },

  clearAll: () => {
    set(() => ({
      notifications: [],
      unreadCount: 0,
    }));
  },

  getUnreadCount: () => {
    return get().unreadCount;
  },

  getNotifications: () => {
    return get().notifications;
  },
});

export const useNotificationsStore = create<NotificationsStore>()(
  persist(notificationsStoreCreator, {
    name: "notifications-store",
    storage: createJSONStorage(() => AsyncStorage),
  })
);
