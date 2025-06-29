import { ZodSchema } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validate = (schema: ZodSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error: any) {
            if (error.errors && Array.isArray(error.errors)) {
                const simplifiedErrors = error.errors.map((err: any) => ({
                    code: err.code,
                    message: err.message,
                }));
                res.status(400).json({ errors: simplifiedErrors });
                return;
            }
            res.status(400).json({ error: error.message || "Validation failed" });
            return;
        }
    };
};
