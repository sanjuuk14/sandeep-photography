import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"], // e.g., "wedding", "pre-wedding"
    },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    url: {
      type: String,
      required: [true, "Please provide media URL"],
    },
    thumbnail: {
      type: String,
    },
    public_id: String,
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
