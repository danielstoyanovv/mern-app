import {Request, Response, NextFunction } from "express";

export const validateUserRequest = (req: Request, res: Response, next: NextFunction) => {
    const ROLES = ['admin', 'user']
    const { username, password, role } = req.body;
    const validationErrors = [];
    if (!username || username.length > 20 || username.length < 6) {
        validationErrors.push('username is not valid')
    }
    if (!password || password.length > 20 || password.length < 6) {
        validationErrors.push("password is not valid");
    }
    if (!role || !ROLES.includes(role) ) {
        validationErrors.push("role is not valid, valid roles: 'admin', 'user'")
    }
    if (validationErrors.length > 0) {
        return res.status(400).json({error: validationErrors})
    }
    next();
}
