import express from "express"
import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendMail from "../utils/sendMail.js"

//c generate token 

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}






// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message:
                    "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();


            user.otp = otp;
            await user.save();

            
            const message = ` Welcome to iCart, ${name}! Thank You for registering with us. We are excited to have you as part of our community. To complete your registration, please use following One Time Password (OTP) for iCard is ${otp} `;

            await sendMail(email, "Welcome to iCart Your OTP for Registration", message);


            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                message: "User Registered Successfully. Please check your Email"
            })
        }
        else {
            res.status(400).json({
                message: "Invalid User Data"
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Login a user

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (user && checkPassword) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id)
                })
            }
        }
        else {
            res.status(400).json({ message: "Invalid email or password" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}


const getUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }

}

const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.otp === otp) {
            user.isVerified = true;
            user.otp = undefined;
            await user.save();

            res.json({ message: "Email verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export { loginUser, registerUser, getUser, verifyEmail };