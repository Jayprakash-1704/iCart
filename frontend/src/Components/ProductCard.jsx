import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import { useState } from "react";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAdded, setShowAdded] = useState(false);

  const handleProductId = (id) => {
    navigate(`/shop/product/${id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    setShowAdded(false);

    // Restart animation even if user clicks quickly
    requestAnimationFrame(() => {
      setShowAdded(true);
    });

    setTimeout(() => {
      setShowAdded(false);
    }, 1200);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-contain group-hover:scale-105 transition duration-500"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {product.discount}% OFF
          </span>
        )}

        {/* Cart Button */}
        <div className="absolute top-4 right-4">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`
      relative
      w-10 h-10
      rounded-full
      bg-black
      text-white
      flex
      items-center
      justify-center
      shadow-sm
      hover:bg-indigo-600
      transition-all
      duration-200
      ${showAdded ? "scale-110" : "scale-100"}
    `}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart
              size={20}
              className={`transition-transform duration-300 ${showAdded ? "-rotate-12 scale-110" : ""
                }`}
            />

            {/* +1 Animation */}
            {showAdded && (
              <span
                className="
          absolute
          -top-2
          -right-2
          flex
          items-center
          justify-center
          min-w-6
          h-6
          px-1
          rounded-full
          bg-green-500
          text-white
          text-xs
          font-bold
          shadow-lg
          animate-cart-success
        "
              >
                +1
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Category */}
        <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
          {product.category}
        </p>

        {/* Product Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-gray-900 mt-1 line-clamp-1 hover:text-indigo-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3 text-sm">
          <span className="text-yellow-500">★</span>

          <span className="font-semibold text-gray-900">
            {product.rating || "Rating not available"}
          </span>

          <span className="text-gray-400">({product.numReviews || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-black text-gray-900">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* View Details */}
        <button
          onClick={() => handleProductId(product._id)}
          type="button"
          className="w-full mt-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-indigo-600 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
