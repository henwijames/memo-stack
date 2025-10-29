import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  searchNotes,
  updateNote,
} from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/search", protect, searchNotes);

router.get("/", protect, getAllNotes);
router.get("/:id", getNoteById);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", deleteNote);

export default router;
