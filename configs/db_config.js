const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ DATABASE_URL is not defined in .env");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Database connected successfully");
    return true;
  } catch (err) {
    console.error("❌ Error connecting to the database:", err.message);
    console.log("⚠️ Server will continue with fallback/placeholder data");
    return false;
  }
};

module.exports = connectDB;
