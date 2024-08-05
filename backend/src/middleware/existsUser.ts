import {Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export async function existsUser(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const existsUser = await User.findOne({ 'email': email }, 'email').exec();
    if (existsUser && existsUser.email) {
        return res.status(400).json({error: "User already exists"})
    }
    next();
}