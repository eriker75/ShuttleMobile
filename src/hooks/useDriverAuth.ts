import { useDriverAuthStore } from '../stores/driverAuthStore';

export const useDriverAuth = () => {
  const store = useDriverAuthStore();

  return {
    // State
    isAuthenticated: store.isAuthenticated,
    driverProfile: store.driverProfile,
    driverVehicle: store.driverVehicle,
    token: store.token,

    // Actions
    login: store.login,
    logout: store.logout,
    setToken: store.setToken,
    setDriverProfile: store.setDriverProfile,
    setDriverVehicle: store.setDriverVehicle,
    setAuthenticated: store.setAuthenticated,

    // Getters
    getDriverProfile: store.getDriverProfile,
    getDriverVehicle: store.getDriverVehicle,
    getAccessToken: store.getAccessToken,
  };
};
