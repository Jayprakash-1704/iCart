
import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    try {
      const savedLocation = localStorage.getItem("location");
      return savedLocation ? JSON.parse(savedLocation) : {};
    } catch (error) {
      console.error("Error reading saved location:", error);
      return {};
    }
  });

  const saveLocation = (newLocation) => {
    setLocation(newLocation);

    localStorage.setItem("location", JSON.stringify(newLocation));
  };

  return (
    <LocationContext.Provider value={{ location, saveLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLocation = () => useContext(LocationContext);

