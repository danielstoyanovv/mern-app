import {Request, Response, NextFunction } from "express";
import {config} from "dotenv"
config()
import jwt from 'jsonwebtoken'

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    const tokenData = jwt.verify(token, process.env.JWT_SECRET!, {})
    const isAdmin = Object.values(tokenData).includes("admin");
    if (!isAdmin) {
        return res.status(401).json({"error": true, "message": 'Unauthorized access - admins access required.' });
    }
    next();
}