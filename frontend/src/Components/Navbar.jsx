
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../Context/AuthContext.jsx";
import { Astroid, BadgePercent, House, LayoutList, MapPin, Search, ShoppingCart, Store } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "../Context/LocationContext";

import Location from "../Pages/Location";

function Navbar() {
  const { location } = useLocation();

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const { user, logout } = useContext(AuthContext)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const navigate = useNavigate();

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  }

  const handleLogOut = () => {
    logout();
    navigate("/login")
  }


  const navLinks = [
    { name: "Home", path: "/", icon: <House /> },
    { name: "Shop", path: "/shop", icon: <Store /> },
    { name: "Categories", path: "/categories", icon: <LayoutList /> },
    { name: "Deals", path: "/deals", icon: <BadgePercent /> },
    { name: "Mihy AI", path: "/mihy", icon: <Astroid /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/20 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-18 flex items-center justify-between  gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="https://res.cloudinary.com/dhaztslbj/image/upload/v1789927947/iCart-fevicon_zbkgj6.jpg"
              alt="iCart Logo"
              className=" w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          </Link>



















          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm flex flex-col items-center font-medium transition-all duration-200
                  ${isActive
                    ? "text-indigo-500"
                    : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.icon}
                    {link.name}

                    {isActive && (
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-500 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>


          {/* Search */}
          {showSearchBox && (
            <div className="hidden md:block flex-1 max-w-xs lg:max-w-sm transition-all duration-1000 ease-in-out ">

              <div className="relative">

                {/* Search Icon */}
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search products..."
                  className="
                  w-full
                  h-11
                  pl-11
                  pr-4
                  rounded-full
                  bg-gray-50
                  border border-gray-200
                  text-sm
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  focus:bg-white
                  focus:border-gray-400
                  transition
                "
                />
              </div>
            </div>
          )}



          {/* Right Actions */}
          <div className="flex items-center gap-2 ">




            {/* search */}
            <button onClick={toggleSearchBox} className="hidden md:flex items-center justify-center p-2.5 cursor-pointer rounded-full bg-gray-100 text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-200" title="Search">
              <Search className=" w-5 h-5" />
            </button>




            <button
              onClick={() => setShowLocation(true)}
              className="
                  flex
                  items-center
                  gap-1
                  p-2
                  md:p-2.5
                  cursor-pointer
                  rounded-full
                  bg-gray-100 text-gray-700 hover:bg-indigo-600 hover:text-white transition
                "
              title={`Location: ${location || "Select Location"}`}
            >

              <MapPin size={20} />

              <div className="text-left">
                
                <p className="text-sm  md:block hidden  font-semibold">
                  {location?.area || "Select Location"}
                </p>
                <p className=" block md:hidden text-xs  md:text-25px font-semibold">
                  {location?.area || "Select Location"}
                </p>
              </div>



            </button>



            {/* Cart */}
            <Link to="/cart">
              <button
                className="
                  relative
                  p-2
                  md:p-2.5
                  rounded-full
                  cursor-pointer
                bg-gray-100
                hover:bg-indigo-500  
                hover:text-white
                  transition
                "
                title="Shopping Cart"
              >
                <ShoppingCart />
                <span
                  className="
                    absolute
                    -top-0.5
                    -right-0.5
                    w-4
                    h-4
                    rounded-full
                    bg-red-500
                    text-white
                    text-[12px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartItems.length}
                </span>
              </button>
            </Link>


            {/* Account */}
            {user ? (
              <div className="flex items-center gap-1">
                <button
                  className="
                hidden sm:flex
                items-center
                cursor-pointer
                gap-2
                ml-2
                px-4
                py-2.5
                rounded-full
                bg-indigo-600
                text-white
                hover:bg-gray-800
                transition
              "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                    />
                  </svg>

                  <span className="text-sm font-medium">
                    Account
                  </span>
                </button>
                <button
                  onClick={handleLogOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                >
                  Login
                </Link>

              </div>
            )}









            {/* Mobile Menu */}
            <button
              className="
                lg:hidden
                ml-1
                p-2.5
                rounded-full
                cursor-pointer
                hover:bg-gray-100
                transition
              "
              title="Menu"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

          </div>
        </div>
      </div>
      {showLocation && (
        <Location
          onClose={() => setShowLocation(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;

