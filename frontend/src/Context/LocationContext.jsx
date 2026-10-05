import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(
    localStorage.getItem("location") || ""
  );

  const saveLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  return (
    <LocationContext.Provider value={{ location, saveLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLocation = () => {
  return useContext(LocationContext);
};