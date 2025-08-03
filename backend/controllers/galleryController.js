import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// POST
export const createGalleryItem = async (req, res) => {
  try {
    const newItem = await Gallery.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET All
export const getAllGallery = async (req, res) => {
  try {
    const items = await Gallery.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET by Category
export const getGalleryByCategory = async (req, res) => {
  try {
    const items = await Gallery.find({ category: req.params.category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    console.log("Deleting item:", item.title);
    console.log("Cloudinary public_id:", item.public_id);

    // Delete image from Cloudinary
    if (item.public_id) {
      const cloudRes = await cloudinary.uploader.destroy(item.public_id);
      console.log("Cloudinary delete response:", cloudRes);
    }

    await item.deleteOne();

    res.json({ message: "Item and image deleted" });
  } catch (err) {
    console.error("Delete error:", err); // 👈 LOG THIS
    res.status(500).json({ message: "Server error" });
  }
  // try {
  //   await Gallery.findByIdAndDelete(req.params.id);
  //   res.json({ message: "Item deleted" });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};
