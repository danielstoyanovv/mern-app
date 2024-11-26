import {Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { STATUS_ERROR } from "../constants/data"


export async function existsUser(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const existsUser = await User.findOne({ 'email': email }, 'email').exec();
    if (existsUser && existsUser.email) {
        return res.status(400).json({
            status: STATUS_ERROR, 
            data: [],
            message: "User already exists"
        })
    }
    next();
}