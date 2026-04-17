import "dotenv/config";

if (!process.env.JWT_SECRET) {

 throw new Error("JWT_SECRET is not defined in .env");

}

if (!process.env.DATABASE_URL) {

 throw new Error("DATABASE_URL is not defined in .env");

}

export const env = {

 JWT_SECRET: process.env.JWT_SECRET,

 DATABASE_URL: process.env.DATABASE_URL

};