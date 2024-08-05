"use strict";

import User from '../models/userModel'
import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import {config} from "dotenv"
config()

export const loginUser = async ( req: Request,  res: Response) => {
    const { email, password, role } = req.body;
    const INVALID_EMAIL_PASSWORD = "Invalid email or password";
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: INVALID_EMAIL_PASSWORD });
        }
        const bcrypt = require("bcrypt")
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).json({ message: INVALID_EMAIL_PASSWORD });
        }
        if (user.role !== role) {
            return res.status(401).json({ message: 'Invalid role' });
        }
        const token = jwt.sign({
            id: user._id,
            email: email,
            role: role
        }, process.env.JWT_SECRET!, {
            expiresIn: 180
        });
        res.json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}