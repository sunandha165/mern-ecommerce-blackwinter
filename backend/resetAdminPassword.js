import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const resetPassword = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.updateOne(
    { email: "YOUR_ADMIN_EMAIL" }, // 👈 change this
    { password: hashedPassword }
  );

  console.log("✅ Password reset to: admin123");
  process.exit();
};

resetPassword();