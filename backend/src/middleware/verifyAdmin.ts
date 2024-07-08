import {Request, Response, NextFunction } from "express";

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {

    if (req.body.role !== "admin") {
        return res.status(401).json({ message: "Access denied. You need an Admin role to get access." });
    }
    next();
}