// const UserModel = import("../models/userModel.js");
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import getToken from "../utils/token.js";

export const signUp = async (req, res) => {
    try {
        // take this from userModel.js
        // const { fullname, email, password, role, mobile } = req.body;
        const { fullName, email, password, role, mobile } = req.body;


        // check if user already exists
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if (!/^\d{10}$/.test(mobile)) {
            return res.status(400).json({ message: "Mobile number must be 10 digits" });
        }

        // hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

      user =  await UserModel.create({
            fullName,
            email,
            role,
            mobile,
            password: hashedPassword
        });


        const token = await getToken(user._id);
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });




        res.status(201).json({ message: "User registered successfully- signup", user });
    } catch (error) {
        res.status(500).json({ message: "Error registering user- signup", error });
    }
};



export const signIn = async (req, res) => {
    try {
        // take this from userModel.js
        const { email, password } = req.body;

        // check if user already exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }


        const token = await getToken(user._id);
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });




        res.status(201).json({ message: "User logged in successfully- signIn", user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user- signIn", error });
    }
};


export const signOut = async(req, res) => {
    try{
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully- signOut" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out user- signOut", error });
    }
}
