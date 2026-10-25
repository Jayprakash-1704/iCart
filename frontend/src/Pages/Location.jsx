
import { MapPin, Search, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "../Context/LocationContext";

const Location = ({ onClose }) => {
  const { saveLocation } = useLocation();

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Detect current location using browser GPS
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;

          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          console.log("GPS accuracy:", accuracy, "meters");

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&zoom=14&addressdetails=1`
          );

          if (!response.ok) {
            throw new Error("Unable to fetch your location");
          }

          const data = await response.json();
          const address = data.address || {};

          console.log("Complete address:", address);

          // Detect the most specific available area
          const area =
            address.neighbourhood ||
            address.suburb ||
            address.quarter ||
            address.residential ||
            address.city_district ||
            address.village ||
            address.hamlet ||
            "";
            
            

          // Detect city or town
          const city =
            address.city ||
            address.town ||
            address.municipality ||
            address.city_district ||
            address.village ||
            address.hamlet ||
            "";

          // Detect state
          const state = address.state || "";

          // Create a consistent location object
          const detectedLocation = {
            area,
            city,
            state,
            latitude,
            longitude,
            accuracy,
            displayName: data.display_name || "",
          };

          console.log("Detected location:", detectedLocation);

          // Save location to Context and localStorage
          saveLocation(detectedLocation);

          onClose();
        } catch (error) {
          console.error("Location error:", error);

          alert(
            "Unable to detect your location. Please try again."
          );
        } finally {
          setIsLoading(false);
        }
      },

      (error) => {
        console.error("Geolocation error:", error.message);

        setIsLoading(false);

        if (error.code === 1) {
          alert("Please allow location access and try again.");
        } else if (error.code === 2) {
          alert("Your location is currently unavailable.");
        } else if (error.code === 3) {
          alert("Location request timed out. Please try again.");
        } else {
          alert("Unable to detect your location. Please try again.");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  // Popular locations
  const locations = [
    {
      city: "Bhopal",
      state: "Madhya Pradesh",
      area: "",
    },
    {
      city: "Indore",
      state: "Madhya Pradesh",
      area: "",
    },
    {
      city: "Delhi",
      state: "",
      area: "",
    },
    {
      city: "Mumbai",
      state: "Maharashtra",
      area: "",
    },
    {
      city: "Bengaluru",
      state: "Karnataka",
      area: "",
    },
    {
      city: "Hyderabad",
      state: "Telangana",
      area: "",
    },
    {
      city: "Pune",
      state: "Maharashtra",
      area: "",
    },
    {
      city: "Noida",
      state: "Uttar Pradesh",
      area: "",
    },
  ];

  // Filter locations by city or state
  const filteredLocations = locations.filter((location) => {
    const locationName = `${location.city} ${location.state}`;

    return locationName
      .toLowerCase()
      .includes(search.toLowerCase().trim());
  });

  // Format location for display
  const formatLocation = (location) => {
    return [location.area, location.city, location.state]
      .filter(Boolean)
      .filter(
        (value, index, array) =>
          array.findIndex(
            (item) =>
              item.toLowerCase() === value.toLowerCase()
          ) === index
      )
      .join(", ");
  };

  // Select a popular location
  const handleSelectLocation = (location) => {
    saveLocation(location);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24">

      {/* Location Box */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-indigo-600" size={22} />

            <h2 className="text-md font-bold text-gray-900">
              Select Location
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close location selector"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search city or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Use Current Location */}
          <button
            type="button"
            onClick={getLocation}
            disabled={isLoading}
            className="mt-4 flex w-full items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-left text-sm font-semibold text-indigo-600 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <MapPin size={19} />

            <div>
              <p>
                {isLoading
                  ? "Detecting your location..."
                  : "Use my current location"}
              </p>

              <span className="text-xs font-normal text-indigo-400">
                {isLoading
                  ? "Please wait"
                  : "Detect location automatically"}
              </span>
            </div>
          </button>

          {/* Popular Locations */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Popular Locations
            </p>

            <div className="max-h-48 overflow-y-auto">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <button
                    key={`${location.city}-${location.state}`}
                    type="button"
                    onClick={() => handleSelectLocation(location)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <MapPin
                      size={17}
                      className="shrink-0 text-gray-400"
                    />

                    <span>{formatLocation(location)}</span>
                  </button>
                ))
              ) : (
                <p className="py-5 text-center text-sm text-gray-400">
                  No location found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;

