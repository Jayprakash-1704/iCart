import cloudinary from "../config/cloudinary.js";
import Product from "../models/product.models.js";


// get 

const getProducts = async (req, res) => {
    try {
        const { category, subCategory } = req.query;

        const filter = {};

        if (category) {
            filter.category = {
                $regex: `^${category}$`,
                $options: "i",
            };
        }

        if (subCategory) {
            filter.subCategory = {
                $regex: `^${subCategory}$`,
                $options: "i",
            };
        }


        const products = await Product.find(filter);

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);

        res.status(500).json({
            message: "Failed to fetch products",
        });
    }
};


const getProductbyId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: " Item Not Found" })
        }
    } catch (error) {
        res.status(500).json({ message: " Server Error" })
    }

}


//post 



const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            attributes,
            subCategory,
            stock,
            discount,
            rating,
            numReviews,
        } = req.body;

        
       
        // 3. Upload image
        let imageUrl = req.body.imageUrl || "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        // 4. Create product
        const product = new Product({
            name: name?.trim(),
            description,
            price: Number(price),
            category: category?.trim().toLowerCase(),
            subCategory: subCategory?.trim().toLowerCase(),
            attributes,
            stock: Number(stock),
            imageUrl,
            discount: Number(discount || 0),
            rating: Number(rating || 0),
            numReviews: Number(numReviews || 0),
        });

        // 5. Save product
        const savedProduct = await product.save();

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.error("Create product error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};



//put 
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, attributes, rating, subCategory, stock, discount, numReviews } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.rating = rating || product.rating;
            product.numReviews = numReviews || product.numReviews;
            product.category = category || product.category;
            product.attributes = attributes || product.attributes;
            product.subCategory = subCategory || product.subCategory;
            product.stock = stock || product.stock;
            product.discount = discount || product.discount;

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                console.log(result);
                product.imageUrl = result.secure_url;


            }
            // else if (imageUrl) {
            //     product.imageUrl = imageUrl;
            // }
            const updateProduct = await product.save();
            res.json(updateProduct);
        }
        else {
            res.status(404).json({ message: "Item not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed " })
        }
        else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }

}





export const searchProducts = async (filters) => {
  const query = {
    stock: { $gt: 0 },
  };

  // Search by category
  if (filters.category) {
    query.category = filters.category.toLowerCase();
  }

  // Search by subcategory
  if (filters.subCategory) {
    query.subCategory = filters.subCategory.toLowerCase();
  }

  // Filter by price
  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    query.price = {
      ...query.price,
      $gte: filters.minPrice,
    };
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    query.price = {
      ...query.price,
      $lte: filters.maxPrice,
    };
  }

  // Search product names using keywords
  if (filters.keywords?.length) {
    query.$and = filters.keywords.map((keyword) => ({
      name: {
        $regex: keyword,
        $options: "i",
      },
    }));
  }

  // Filter by attributes
  const allowedAttributes = [
    "brand",
    "color",
    "size",
    "material",
    "fit",
    "gender",
    "waistSize",
    "occasion",
    "pattern",
    "processor",
    "ram",
    "storage",
    "screenSize",
  ];

  for (const [key, value] of Object.entries(filters.attributes || {})) {
    if (allowedAttributes.includes(key) && value != null) {
      query[`attributes.${key}`] = {
        $regex: String(value),
        $options: "i",
      };
    }
  }

  return Product.find(query).limit(20).lean();
};



export { getProducts, getProductbyId, createProduct, updateProduct, deleteProduct };