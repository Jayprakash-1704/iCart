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

        const { name, description, price, category, subCategory, stock, discount, rating, numReviews } = req.body;
        let imageUrl = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
            imageUrl = result.secure_url;
        }
        const product = new Product({
            name,
            description,
            price,
            category,
            subCategory,
            stock,
            imageUrl,
            discount,
            rating,
            numReviews

        })
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

}

//put 
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category,rating, subCategory, stock, discount,numReviews } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.rating = rating || product.rating;
            product.numReviews = numReviews || product.numReviews;
            product.category = category || product.category;
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



export { getProducts, getProductbyId, createProduct, updateProduct, deleteProduct };