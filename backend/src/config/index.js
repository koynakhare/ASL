import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "your-default-secret",
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/signsdb",
  baseURL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
  uploadDir: process.env.UPLOAD_DIR || "public/images",
};
