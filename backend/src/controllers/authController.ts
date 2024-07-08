"use strict";

import User from '../models/userModel'
import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import {config} from "dotenv"
config()

export const loginUser = async ( req: Request,  res: Response) => {
    const { username, password, role } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        if (user.role !== role) {
            return res.status(401).json({ message: 'Invalid role' });
        }
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}