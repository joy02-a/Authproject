import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../db/utils.js";
import jwt from "jsonwebtoken";

export const register  = async (req, res) => {
    const {fullName, email, password} = req.body

    try {
        
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        if(password.length < 6){
            return res.status(400).json({message: "password must be at least 6 characters"})
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"});
        }

        const user = await User.findOne({email});

        if(user)
        {
            return res.status(400).json({message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
            })
        }

        else{
            res.status(400).json({message: "Invalud user data"});
        }

    } catch (error) {
        console.log("Error in signup controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}  

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
        });

    } catch (error) {
        console.log("Error in login controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (_, res) => {
    res.cookie("jwt", "", {maxAge:0});
    res.status(200).json({message: "Logged out successfully"})
}

export const dashboard = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) 
            {
            return res.status(401).json({ message:"No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) 
        {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            fullName:user.fullName
        });
    } catch (error) {
        console.log("Dashboard error:", error);
        res.status(500).json({ message: "Server error" });
    }
};