import {config} from "dotenv";
config();

const getEnv = (key: string) => {
    const env = process.env[key];
    if (!env) throw new Error("Missing environment variable");
    return env;
}

const Config = {
    SERVER_PORT: getEnv("SERVER_PORT") || 3000,
    DATABASE_HOST: getEnv("DATABASE_HOST") || "localhost",
    DATABASE_POST: getEnv("DATABASE_POST") || 5432,
    DATABASE_USERNAME: getEnv("DATABASE_USERNAME") || "postgres",
    DATABASE_PASSWORD: getEnv("DATABASE_PASSWORD") || "postgres",
    DATABASE_NAME: getEnv("DATABASE_NAME") || "school_mgmt",
    PASSWORD_SALT: getEnv("PASSWORD_SALT") || "12",
    JWT_SECRET_KEY: getEnv("JWT_SECRET_KEY") || 'secret',
    JWT_EXPIRE_TIME: getEnv("JWT_EXPIRE_TIME") || 24,
}

export default Config;