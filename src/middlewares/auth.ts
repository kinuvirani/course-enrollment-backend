import {Request, Response, NextFunction} from "express";
import { JwtPayload } from "jsonwebtoken";
import {decodeAccessToken} from "../utils/token";

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({message: "Authorization token missing or invalid"})
        return;
    }
    try {
        const decoded = await decodeAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
        return ;
    }
}