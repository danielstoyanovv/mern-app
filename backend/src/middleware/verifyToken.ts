import {Request, Response, NextFunction } from "express";
import {config} from "dotenv"
config()

export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
        return res.status(403).json({"error": true, "message": 'No token provided.'});
    }
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    const expired = (Date.now() >= exp * 1000)
    if (expired) {
        return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
    }
    next();
}
