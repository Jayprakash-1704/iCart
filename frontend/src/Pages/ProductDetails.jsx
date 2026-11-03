import { ChevronLeft, CircleCheckBig, ShoppingCartPlus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

const ProductDetails = () => {
    const dispatch = useDispatch();

    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const existingItem = cartItems.find(
        (item) => item._id === product?._id
    );



    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:5000/api/products/${productId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }

                const data = await response.json();

                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError("Unable to load product details.");
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    // Loading
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-500">
                    Loading product details...
                </p>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <p className="text-lg text-red-500">{error}</p>

                <Link
                    to="/products"
                    className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    // Product not found
    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-500">
                    Product not found.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-6xl">

                {/* Back Button */}
                <Link
                    to="/shop"
                    className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-black"
                >
                    <span className="flex flex-row items-center gap-2"><ChevronLeft /> Back to Products</span>
                </Link>

                {/* Product Details Card */}
                <div className="grid overflow-hidden rounded-2xl bg-white border-2 border-indigo-300 shadow-md md:grid-cols-2">

                    {/* Product Image */}
                    <div className="flex items-center justify-center bg-gray-100 p-8">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="max-h-125 w-full object-contain"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="p-6 md:p-10">

                        {/* Category */}
                        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                            {product.category}
                        </p>

                        {/* Product Name */}
                        <h1 className="mb-4 text-3xl font-bold text-gray-900">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="mb-5 flex items-center gap-2">
                            <span className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white">
                                <span className="text-amber-300"><Star color="currentColor" fill="currentColor" /></span> {product.rating || 0}
                            </span>

                            <span className="text-sm text-gray-500">
                                {product.numReviews || 0} reviews
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-gray-900">
                                ₹{product.price}
                            </span>

                            {product.discount > 0 && (
                                <span className="ml-3 text-lg font-semibold text-green-600">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="mb-2 text-lg font-semibold text-gray-900">
                                Description
                            </h2>

                            <p className="leading-7 text-gray-600">
                                {product.description}
                            </p>
                        </div>

                        {/* Stock */}
                        <div className="mb-6">
                            {product.stock > 0 ? (
                                <p className="font-medium text-green-600">
                                    ✓ In Stock ({product.stock} available)
                                </p>
                            ) : (
                                <p className="font-medium text-red-600">
                                    ✕ Out of Stock
                                </p>
                            )}
                        </div>


<div className="mb-8">
  <ul>
    {Object.entries(
      typeof product.attributes === "string"
        ? JSON.parse(product.attributes || "{}")
        : product.attributes || {}
    ).map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong>{" "}
        {typeof value === "boolean"
          ? value
            ? "Yes"
            : "No"
          : String(value)}
      </li>
    ))}
  </ul>
</div>



                        {/* Buttons */}
                        <div className="flex flex-col gap-3 sm:flex-row">

                            <button
                                onClick={() => dispatch(addToCart(product))}
                                disabled={product.stock <= 0}
                                className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >

                                <span className="flex flex-row items-center gap-2">
                                    {
                                        existingItem ? <CircleCheckBig /> : <ShoppingCartPlus />
                                    }
                                    {
                                        existingItem ? " Added to Cart" : "Add to Cart"
                                    }

                                </span>


                            </button>

                            <button
                                disabled={product.stock <= 0}
                                className="rounded-lg border border-indigo-400 px-6 py-3 font-semibold text-white bg-indigo-500 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                            >
                                Buy Now
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;