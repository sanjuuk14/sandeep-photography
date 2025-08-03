import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config(); // ✅ Ensure this line is present and on top

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

console.log("Cloudinary ENV Values:");
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log(
  "CLOUD_API_KEY:",
  process.env.CLOUD_API_KEY ? "✓ loaded" : "❌ missing"
);
console.log(
  "CLOUD_API_SECRET:",
  process.env.CLOUD_API_SECRET ? "✓ loaded" : "❌ missing"
);

export default cloudinary;
