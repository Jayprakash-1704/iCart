import { MapPin, Search, X } from "lucide-react";
import { useState } from "react";
// import {LocationProvider }from "../Context/LocationContext";
import { useLocation } from "../Context/LocationContext";


const Location = ({ onClose }) => {
    const { saveLocation } = useLocation();
  const [search, setSearch] = useState("");
  const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      const response = await fetch(
         `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=18&addressdetails=1`
      );

      const data = await response.json();
      console.log(data.address);

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village;

      const state = data.address.state;
 
      console.log("Location:", city, state);

      saveLocation(`${city}, ${state}`);
      onClose();
    },
    () => {
      console.log("Location permission denied");
    }
  );
};

  const locations = [
    "Bhopal, Madhya Pradesh",
    "Indore, Madhya Pradesh",
    "Delhi",
    "Mumbai, Maharashtra",
    "Bengaluru, Karnataka",
    "Hyderabad, Telangana",
    "Pune, Maharashtra",
    "Noida, Uttar Pradesh",
  ];

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center  px-4 pt-24">

      {/* Location Box */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-2 py-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-indigo-600" size={22} />

            <h2 className="text-md font-bold text-gray-900">
              Select Location
            </h2>
          </div>

          <button 
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20}  />
          </button>
        </div>

        {/* Search */}
        <div className="p-2">

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
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                py-3
                pl-10
                pr-4
                text-sm
                outline-none
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            />
          </div>

          {/* Use Current Location */}
          <button onClick={getLocation}
            type="button"
            className="
              mt-4
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              border
              border-indigo-100
              bg-indigo-50
              px-4
              py-1
              text-left
              text-sm
              font-semibold
              text-indigo-600
              hover:bg-indigo-100
            "
          >
            <MapPin size={19} />

            <div>
              <p>Use my current location</p>
              <span className="text-xs font-normal text-indigo-400">
                Detect location automatically
              </span>
            </div>
          </button>

          {/* Popular Locations */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Popular Locations
            </p>

            <div className="max-h-32 overflow-y-auto">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-3
                      text-left
                      text-sm
                      text-gray-700
                      hover:bg-gray-50
                      hover:text-indigo-600
                    "
                  >
                    <MapPin size={17} className="text-gray-400" />

                    {location}
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