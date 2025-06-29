import Config from "../config";
import jwt, {JwtPayload, SignOptions} from "jsonwebtoken";

const timeInSeconds = (addSeconds = 0) => {
    return Math.floor(Date.now()/ 1000 + addSeconds)
};

export const encodeAccessToken = (user: object): Promise<string> => {
    return new Promise((resolve, reject) => {
        const options: SignOptions = {
            expiresIn: timeInSeconds() + Number(Config.JWT_EXPIRE_TIME) * 60 * 60,
            issuer: "school_management"
        };

        jwt.sign(user, Config.JWT_SECRET_KEY, options, (err, token) => {
            if (err || !token) {
                return reject(err ?? new Error("Failed to sign JWT token"));
            }
            resolve(token);
        });
    });
};


export const decodeAccessToken = (token: string): Promise<JwtPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, Config.JWT_SECRET_KEY, (error, decoded) => {
            try {
                if (error?.name === "TokenExpiredError") return reject(new Error("TOKEN_EXPIRED"));
                if (!decoded || typeof decoded !== "object") return reject(new Error("INVALID_TOKEN"));

                resolve(decoded as JwtPayload);
            } catch (err) {
                reject(err);
            }
        });
    });
};
