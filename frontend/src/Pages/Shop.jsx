import ProductCard from "@/Components/ProductCard";
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Shop = () => {
  const { category, subCategory } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/products?category=${category}&subCategory=${subCategory}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        console.log("Products:", data);

        if (!ignore) {
          setProducts(data);
        }
      } catch (error) {
        console.log("Error fetching products:", error);

        if (!ignore) {
          setError("Unable to load products.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, [category, subCategory]);

  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Home / Shop / {category} / {subCategory}
          </p>

          <h1 className="mt-2 text-3xl font-bold capitalize text-gray-900">
            {subCategory}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {products.length} products found
          </p>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              We couldn't find products in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

            {products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}

          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;