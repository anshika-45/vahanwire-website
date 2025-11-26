import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { getAMCPlansByCategory } from "../api/amcApi";

const AMCPlansContext = createContext();
const CACHE_EXPIRY_TIME = 5 * 60 * 1000;

export const AMCPlansProvider = ({ children }) => {
  const [plansCache, setPlansCache] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchPlans = useCallback(
    async (vehicleType, amcType, cityName) => {
      if (!vehicleType || !amcType) {
        return [];
      }

      if (!cityName) {
        return [];
      }

      const cacheKey = `${vehicleType}-${amcType}-${cityName}`;
      const cached = plansCache[cacheKey];

      if (
        cached &&
        cached.timestamp &&
        Date.now() - cached.timestamp < CACHE_EXPIRY_TIME
      ) {
        return cached.data;
      }

      setLoading(true);

      try {
        const res = await getAMCPlansByCategory(vehicleType, amcType, cityName);
        if (res?.success && Array.isArray(res.data)) {
          setPlansCache((prev) => ({
            ...prev,
            [cacheKey]: {
              data: res.data,
              timestamp: Date.now(),
            },
          }));
          return res.data;
        }
        return [];
      } catch (error) {
        console.error("Failed to fetch AMC plans:", error);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [plansCache]
  );

  const clearCache = useCallback(() => {
    setPlansCache({});
  }, []);

  const value = useMemo(
    () => ({ fetchPlans, loading, clearCache }),
    [fetchPlans, loading, clearCache]
  );

  return (
    <AMCPlansContext.Provider value={value}>
      {children}
    </AMCPlansContext.Provider>
  );
};

export const useAMCPlans = () => {
  const ctx = useContext(AMCPlansContext);
  if (!ctx) throw new Error("useAMCPlans must be used inside AMCPlansProvider");
  return ctx;
};