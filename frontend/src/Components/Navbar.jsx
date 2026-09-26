
import { useContext } from "react";
// import { useSelector } from "react-redux";
import { AuthContext } from "../Context/authContext";
import { Link, NavLink, useNavigate } from "react-router-dom";


function Navbar() {
  const {user,logout}=useContext(AuthContext)
  // const cartItems=useSelector((state)=>state.cart.cartItems)
  const navigate=useNavigate();
  

  const handleLogOut=()=>{
    logout();
    navigate("/login")
  }


  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Deals", path: "/deals" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-18 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="https://res.cloudinary.com/dhaztslbj/image/upload/v1789927947/iCart-fevicon_zbkgj6.jpg"
              alt="iCart Logo"
              className="w-12 h-12 object-contain"
            />
          </Link>

        

















          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}

                    {isActive && (
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-900 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
          

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-xs lg:max-w-sm">

            <div className="relative">

              {/* Search Icon */}
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                />
              </svg>

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


          {/* Right Actions */}
          <div className="flex items-center gap-2 ">

            {/* Wishlist */}
            <Link to="/wishlist">
              <button
                className="
                  relative
                  p-2.5
                  cursor-pointer
                  rounded-full
                  hover:bg-gray-100
                  transition
                "
                title="Wishlist"
              >
                <svg
                  className="w-5.5 h-5.5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                  />
                </svg>

                {/* <span
                  className="
                    absolute
                    -top-0.5
                    -right-0.5
                    w-4
                    h-4
                    rounded-full
                    bg-red-500
                    text-white
                    text-[9px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  3
                </span> */}
              </button>
            </Link>


            {/* Cart */}
            <Link to="/cart">
              <button
                className="
                  relative
                  p-2.5
                  rounded-full
                  cursor-pointer
                  hover:bg-gray-100
                  transition
                "
                title="Shopping Cart"
              >
                <svg
                  className="w-5.5 h-5.5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6"
                  />

                  <circle cx="10" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                </svg>

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
                    text-[9px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  {/* {cartItems.length} */}   2
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
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Sign Up
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
    </nav>
  );
}

export default Navbar;

