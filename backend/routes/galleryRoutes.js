import express from "express";
import {
  createGalleryItem,
  getAllGallery,
  getGalleryByCategory,
  deleteGalleryItem,
} from "../controllers/galleryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all gallery items (Public)
router.get("/", getAllGallery);

// GET gallery by category (Public)
router.get("/category/:category", getGalleryByCategory);

// POST a new gallery item (Admin only)
router.post("/", protect, adminOnly, createGalleryItem);

// DELETE gallery item by ID (Admin only)
router.delete("/:id", protect, adminOnly, deleteGalleryItem);

export default router;
