
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    icon: <svg xmlns="http://www.w3.org/2000/svg"  height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z" /></svg>,
    slug: "electronics",
    subCategories: [
      { name: "Laptops", slug: "laptops" },
      { name:  "Mobiles", slug: "mobiles" },
      { name: "Tablets", slug: "tablets" },
      { name: "Cameras", slug: "cameras" },
      { name: "Headphones", slug: "headphones" },
      { name: "Televisions", slug: "televisions" },
      { name: "Gaming Consoles", slug: "gaming-consoles" },
      { name: "Smart Home Devices", slug: "smart-home-devices" },
      {name:"Wearable Technology", slug:"wearable-technology"}, 
      {name:"Home Appliances", slug:"home-appliances"},
      { name: "Computer Accessories", slug: "computer-accessories" },
    ],
  },
  {
    name: "Fashion",
    icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m240-522-40 22q-14 8-30 4t-24-18L66-654q-8-14-4-30t18-24l230-132h70q9 0 14.5 5.5T400-820v20q0 33 23.5 56.5T480-720q33 0 56.5-23.5T560-800v-20q0-9 5.5-14.5T580-840h70l230 132q14 8 18 24t-4 30l-80 140q-8 14-23.5 17.5T760-501l-40-20v361q0 17-11.5 28.5T680-120H280q-17 0-28.5-11.5T240-160v-362Zm80-134v456h320v-456l124 68 42-70-172-100q-15 51-56.5 84.5T480-640q-56 0-97.5-33.5T326-758L154-658l42 70 124-68Zm160 177Z" /></svg>,
    slug: "fashion",
    subCategories: [
      { name: "Men", slug: "men" },
      { name: "Women", slug: "women" },
      { name: "Kids", slug: "kids" },
      { name: "Shoes", slug: "shoes" },
      { name: "Watches", slug: "watches" },
      { name: "Bags", slug: "bags" },
      { name: "Jewellery", slug: "jewellery" },
    ],
  },
  {
    name: "Home & Kitchen",
    icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M320-200h60v-270q26-8 43-28.5t17-49.5v-152q0-8-6-14t-14-6q-8 0-14 6t-6 14v100h-30v-100q0-8-6-14t-14-6q-8 0-14 6t-6 14v100h-30v-100q0-8-6-14t-14-6q-8 0-14 6t-6 14v152q0 29 17 49.5t43 28.5v270Zm240 0h60v-254q33-16 51.5-51t18.5-82q0-57-28.5-95T590-720q-43 0-71.5 38T490-587q0 47 18.5 82t51.5 51v254ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v640q0 33-23.5 56.5T800-80H160Zm0-80h640v-640H160v640Zm0 0v-640 640Z" /></svg>,
    slug: "home-kitchen",
    subCategories: [
      { name: "Furniture", slug: "furniture" },
      { name: "Kitchen Appliances", slug: "kitchen-appliances" },
      { name: "Home Appliances", slug: "home-appliances" },
      { name: "Cookware", slug: "cookware" },
      { name: "Home Decor", slug: "home-decor" },
      { name: "Storage", slug: "storage" },
    ],
  },
  {
    name: "Beauty",
    icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-80 40-520l200-120v-240h160v240l200 120L440-80H200Zm480 0q-17 0-28.5-11.5T640-120q0-17 11.5-28.5T680-160h120v-80H680q-17 0-28.5-11.5T640-280q0-17 11.5-28.5T680-320h120v-80H680q-17 0-28.5-11.5T640-440q0-17 11.5-28.5T680-480h120v-80H680q-17 0-28.5-11.5T640-600q0-17 11.5-28.5T680-640h120v-80H680q-17 0-28.5-11.5T640-760q0-17 11.5-28.5T680-800h160q33 0 56.5 23.5T920-720v560q0 33-23.5 56.5T840-80H680Zm-424-80h128l118-326-124-74H262l-124 74 118 326Zm64-200Z" /></svg>,
    slug: "beauty",
    subCategories: [
      { name: "Makeup", slug: "makeup" },
      { name: "Skincare", slug: "skincare" },
      { name: "Haircare", slug: "haircare" },
      { name: "Fragrance", slug: "fragrance" },
      { name: "Personal Care", slug: "personal-care" },
    ],
  },
  {
    name: "Sports",
    icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm200-500 54-18 16-54q-32-48-77-82.5T574-786l-54 38v56l160 112Zm-400 0 160-112v-56l-54-38q-54 17-99 51.5T210-652l16 54 54 18Zm-42 308 46-4 30-54-58-174-56-20-40 30q0 65 18 118.5T238-272Zm293 108q25-4 49-12l28-60-26-44H378l-26 44 28 60q24 8 49 12t51 4q26 0 51-4ZM390-360h180l56-160-146-102-144 102 54 160Zm332 88q42-50 60-103.5T800-494l-40-28-56 18-58 174 30 54 46 4Z" /></svg>,
    slug: "sports",
    subCategories: [
      { name: "Cricket", slug: "cricket" },
      { name: "Football", slug: "football" },
      { name: "Fitness", slug: "fitness" },
      { name: "Running", slug: "running" },
      { name: "Outdoor Sports", slug: "outdoor-sports" },
    ],
  },
  {
    name: "Grocery",
    icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M296-500ZM640-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170T640-80Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-480 0q-33 0-56.5-23.5T80-240v-304q0-8 1.5-16t4.5-16l80-184h-6q-17 0-28.5-11.5T120-800v-40q0-17 11.5-28.5T160-880h280q17 0 28.5 11.5T480-840v40q0 17-11.5 28.5T440-760h-6l66 152q-19 10-36 21t-32 25l-84-198h-96l-92 216v304h170q5 21 13.5 41.5T364-160H160Zm480-440q-42 0-71-29t-29-71q0-42 29-71t71-29v200q0-42 29-71t71-29q42 0 71 29t29 71H640Zm0 280Z" /></svg>,
    slug: "grocery",
    subCategories: [
      { name: "Fruits & Vegetables", slug: "fruits-vegetables" },
      { name: "Snacks", slug: "snacks" },
      { name: "Beverages", slug: "beverages" },
      { name: "Dairy", slug: "dairy" },
      { name: "Staples", slug: "staples" },
    ],
  },
  {
    name: "Books",
    icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm80-200v-380l200-200v400L560-360Zm-160 65v-396q-33-14-68.5-21.5T260-720q-37 0-72 7t-68 21v397q35-13 69.5-19t70.5-6q36 0 70.5 6t69.5 19Zm0 0v-396 396Z" /></svg>,
    slug: "books",
    subCategories: [
      { name: "Programming", slug: "programming" },
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Academic", slug: "academic" },
      { name: "Competitive Exams", slug: "competitive-exams" },
    ],
  },
  {
    name: "Toys & Games",
    icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-160q-45 0-78.5-28.5T162-262q-38-20-60-57t-22-81q0-53 30.5-94.5T192-552l-72-72-12 12q-11 11-28 11t-28-11q-11-11-11-28t11-28l80-80q11-11 28-11t28 11q11 11 11 28t-11 28l-12 12 56 56 32-94q12-37 43.5-59.5T378-800h204q39 0 70.5 22.5T696-718l54 162q57 11 93.5 55T880-400q0 44-22 81t-60 57q-6 45-39.5 73.5T680-160q-38 0-68.5-22T568-240H392q-13 36-43.5 58T280-160Zm16-400h144v-160h-62q-13 0-23 7.5T340-692l-44 132Zm224 0h144l-44-132q-5-13-15-20.5t-23-7.5h-62v160ZM392-320h176q13-36 43.5-58t68.5-22q30 0 56 14t44 38q9-11 14.5-24.5T800-400q0-33-23.5-56.5T720-480H240q-33 0-56.5 23.5T160-400q0 14 5.5 27.5T180-348q18-24 44-38t56-14q38 0 68.5 22t43.5 58Zm-83.5 68.5Q320-263 320-280t-11.5-28.5Q297-320 280-320t-28.5 11.5Q240-297 240-280t11.5 28.5Q263-240 280-240t28.5-11.5Zm400 0Q720-263 720-280t-11.5-28.5Q697-320 680-320t-28.5 11.5Q640-297 640-280t11.5 28.5Q663-240 680-240t28.5-11.5ZM480-400Z" /></svg>,
    slug: "toys-games",
    subCategories: [
      { name: "Action Figures", slug: "action-figures" },
      { name: "Board Games", slug: "board-games" },
      { name: "Remote Control", slug: "remote-control" },
      { name: "Educational Toys", slug: "educational-toys" },
      { name: "Puzzles", slug: "puzzles" },
    ],
  },
  {
    name: "Automotive",
    icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z" /></svg>,
    slug: "automotive",
    subCategories: [
      { name: "Car Accessories", slug: "car-accessories" },
      { name: "Bike Accessories", slug: "bike-accessories" },
      { name: "Car Care", slug: "car-care" },
      { name: "Helmets", slug: "helmets" },
      { name: "Tools", slug: "tools" },
    ],
  },
];

function CategoryMenu() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="relative w-full  mt-0">

      {/* ================= CATEGORY BAR ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full  border-b-4 bg-indigo-300 border-indigo-600  shadow-sm">

        <div
          className="
            flex
            items-center
            gap-2
            overflow-x-auto
            px-4
            py-3
            scrollbar-hide
            md:justify-center
            md:gap-6
            lg:gap-8
          "
        >
          {categories.map((category) => {
            const isActive =
              selectedCategory?.slug === category.slug;

            return (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category)}
                className={`
                  relative
                  whitespace-nowrap
                  px-1
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  
                  ${isActive
                    ? "text-indigo-600"
                    : "text-black hover:text-indigo-600"
                  }

                  after:absolute
                  after:bottom-0
                  after:left-1/2
                  after:h-0.5
                  after:-translate-x-1/2
                  after:rounded-full
                  after:bg-indigo-600
                  after:transition-all
                  after:duration-300

                  ${isActive
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                  }
                `}
              >
                {category.icon && (
                  <span className="mr-1 flex items-center justify-center">
                    {category.icon}
                  </span>
                )}
                <span>{category.name}</span>

              </button>
            );
          })}
        </div>

      </div>

      {/* ================= SUB CATEGORY PANEL ================= */}
      {selectedCategory && (
        <div
          className="
            w-full
            border-b
            border-gray-200
            bg-indigo-50
            shadow-sm
            animate-in
            fade-in
            slide-in-from-top-2
            duration-200
          "
        >
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">

            {/* Header */}
            <div className="mb-5 flex items-center justify-between">

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedCategory.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Explore {selectedCategory.name.toLowerCase()}
                </p>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="
                  rounded-full
                  px-3
                  py-1
                  text-sm
                  text-gray-500
                  transition
                  hover:bg-gray-200
                  hover:text-gray-900
                "
              >
                Close
              </button>

            </div>

            {/* Subcategories */}
            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
              "
            >
              {selectedCategory.subCategories.map(
                (subCategory) => (
                  <Link
                    key={subCategory.slug}
                    to={`/shop/${selectedCategory.slug}/${subCategory.slug}`}
                    className="
                      group
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-4
                      py-4
                      text-sm
                      font-medium
                      text-gray-700
                      shadow-sm
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-indigo-200
                      hover:bg-indigo-50
                      hover:text-indigo-600
                      hover:shadow-md
                    "
                  >
                    <div className="flex items-center justify-between">
                      <span>
                        {subCategory.name}
                      </span>

                      <span
                        className="
                          opacity-0
                          transition
                          group-hover:translate-x-1
                          group-hover:opacity-100
                        "
                      >
                        →
                      </span>
                    </div>
                  </Link>
                )
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default CategoryMenu;
