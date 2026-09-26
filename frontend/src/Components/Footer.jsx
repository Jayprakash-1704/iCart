
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 xs:grid-cols-2  lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://res.cloudinary.com/dhaztslbj/image/upload/v1789927947/iCart-fevicon_zbkgj6.jpg"
                alt="iCart Logo"
                className="w-12 h-12 rounded-xl object-contain bg-white"
              />

              <span className="text-2xl font-bold text-white">
                iCart
              </span>
            </div>

            <p className="text-sm leading-6 text-gray-400 max-w-xs">
              Your everyday shopping destination for quality products,
              great deals, and a simple shopping experience.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">

              {/* Instagram */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-gray-900 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    strokeWidth="1.8"
                  />
                  <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-gray-900 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v8h4v-8h3.3l.7-4H13V9c0-.7.3-1 1-1Z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-gray-900 transition"
              >
                <span className="text-sm font-semibold">𝕏</span>
              </a>

              {/* GitHub */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-gray-900 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 6.1 18.3 6.4 18.3 6.4c.6 1.6.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>

            </div>
          </div>


          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Shop
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition"
                >
                  All Products
                </a>
              </li>

              <li>
                <a
                  href="/categories"
                  className="hover:text-white transition"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="/deals"
                  className="hover:text-white transition"
                >
                  Today's Deals
                </a>
              </li>

              <li>
                <a
                  href="/new-arrivals"
                  className="hover:text-white transition"
                >
                  New Arrivals
                </a>
              </li>

              <li>
                <a
                  href="/wishlist"
                  className="hover:text-white transition"
                >
                  Wishlist
                </a>
              </li>
            </ul>
          </div>


          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Customer Service
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="/orders"
                  className="hover:text-white transition"
                >
                  Track Order
                </a>
              </li>

              <li>
                <a
                  href="/shipping"
                  className="hover:text-white transition"
                >
                  Shipping Information
                </a>
              </li>

              <li>
                <a
                  href="/returns"
                  className="hover:text-white transition"
                >
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a
                  href="/faq"
                  className="hover:text-white transition"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>


          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-sm text-gray-400 leading-6 mb-4">
              Subscribe to get special offers, new product updates,
              and exclusive deals.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="
                  min-w-0
                  flex-1
                  px-4
                  py-3
                  rounded-l-lg
                  bg-gray-900
                  border
                  border-gray-800
                  text-sm
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  focus:border-gray-600
                "
              />

              <button
                className="
                  px-5
                  py-3
                  rounded-r-lg
                  bg-white
                  text-gray-900
                  text-sm
                  font-semibold
                  hover:bg-gray-200
                  transition
                "
              >
                Subscribe
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>

        </div>
      </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-5
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          <p className="text-xs sm:text-sm text-gray-500">
            © 2026 iCart. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs sm:text-sm text-gray-500">
            <a
              href="/privacy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;

