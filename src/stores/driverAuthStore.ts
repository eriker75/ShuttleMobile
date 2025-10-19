import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types for Driver and Vehicle (simplified for mobile)
export interface Driver {
  id: string;
  email: string;
  name: string;
  phone?: string;
  idCard?: string;
  organizationId: number;
  isActive: boolean;
}

export interface Vehicle {
  id: string;
  driverId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  capacity: number;
  isActive?: boolean;
}

export interface DriverAuthState {
  token: string | null;
  driverProfile: Partial<Driver> | null;
  driverVehicle: Partial<Vehicle> | null;
  isAuthenticated: boolean;
}

export interface DriverAuthActions {
  setToken: (token: string) => void;
  clearToken: () => void;
  setDriverProfile: (driverProfile: Partial<Driver>) => void;
  setDriverVehicle: (driverVehicle: Partial<Vehicle>) => void;
  getDriverProfile: () => Partial<Driver> | null;
  getDriverVehicle: () => Partial<Vehicle> | null;
  getAccessToken: () => string | null;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
  // Simple login method for demo purposes
  login: (email: string, password: string) => Promise<boolean>;
}

export type DriverAuthStore = DriverAuthState & DriverAuthActions;

const initialAuthState = {
  token: null,
  driverProfile: null,
  driverVehicle: null,
  isAuthenticated: false,
};

const driverAuthStoreCreator = (set: any, get: any): DriverAuthStore => ({
  ...initialAuthState,

  setToken: (token: string) =>
    set((state: DriverAuthState) => ({
      ...state,
      token,
      isAuthenticated: true,
    })),

  clearToken: () =>
    set((state: DriverAuthState) => ({
      ...state,
      token: null,
      isAuthenticated: false,
    })),

  setDriverProfile: (driverProfile: Partial<Driver>) =>
    set((state: DriverAuthState) => ({
      ...state,
      driverProfile,
    })),

  setDriverVehicle: (driverVehicle: Partial<Vehicle>) =>
    set((state: DriverAuthState) => ({
      ...state,
      driverVehicle,
    })),

  getDriverProfile: () => get().driverProfile,
  getDriverVehicle: () => get().driverVehicle,
  getAccessToken: () => get().token,

  setAuthenticated: (authenticated: boolean) =>
    set((state: DriverAuthState) => ({
      ...state,
      isAuthenticated: authenticated,
    })),

  logout: () =>
    set((state: DriverAuthState) => ({
      ...state,
      token: null,
      driverProfile: null,
      driverVehicle: null,
      isAuthenticated: false,
    })),

  // Simple login method for demo - email: driverUser, password: 1234
  login: async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "driverUser" && password === "1234") {
          const mockToken = "mock-jwt-token-" + Date.now();
          const mockDriver: Partial<Driver> = {
            id: "1",
            email: "driverUser",
            name: "John Driver",
            phone: "+1234567890",
            organizationId: 1,
            isActive: true,
          };
          const mockVehicle: Partial<Vehicle> = {
            id: "1",
            driverId: "1",
            make: "Toyota",
            model: "Camry",
            year: 2022,
            licensePlate: "ABC-123",
            color: "White",
            capacity: 4,
            isActive: true,
          };

          set((state: DriverAuthState) => ({
            ...state,
            token: mockToken,
            driverProfile: mockDriver,
            driverVehicle: mockVehicle,
            isAuthenticated: true,
          }));

          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000); // Simulate network delay
    });
  },
});

export const useDriverAuthStore = create<DriverAuthStore>()(
  persist(driverAuthStoreCreator, {
    name: "auth-driver-profile-store",
  })
);
