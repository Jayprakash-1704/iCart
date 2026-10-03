
import CategoryMenu from "@/Components/NavigationMenu";
import { Link } from "react-router-dom";


const categories = [
    {
      name: "Electronics",
      count: "1,200+ Products",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Fashion",
      count: "2,500+ Products",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Home & Living",
      count: "900+ Products",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Beauty",
      count: "700+ Products",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
    },
  ];
function Categories() {

  return (
    <div className="min-h-screen">
      <CategoryMenu  />
      <div className="grid mt-10 grid-cols-2 gap-3 sm:gap-5 px-4 py-4 lg:grid-cols-4">

            {categories.map((category) => (
              <Link
                to={`/categories/${category.name.toLowerCase()}`}
                key={category.name}
                className="group relative h-52 overflow-hidden rounded-xl bg-gray-100 sm:h-64 sm:rounded-2xl lg:h-72"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute bottom-3 left-3 text-white sm:bottom-5 sm:left-5">
                  <h3 className="text-base font-bold sm:text-xl">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/80 sm:text-sm">
                    {category.count}
                  </p>

                  <span className="mt-2 inline-block text-xs font-semibold sm:mt-3 sm:text-sm">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}

          </div>
    </div>
  );
}

export default Categories;