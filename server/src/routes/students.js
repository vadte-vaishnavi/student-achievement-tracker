import express from "express";
import bcrypt from "bcryptjs";
import { query } from "../config/db.js";
import { authMiddleware, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// All routes require auth
router.use(authMiddleware);

// Current student profile
router.get("/me/profile", async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Student access only" });
    }
    const rows = await query(
      "SELECT id, college_id, name, branch, created_at FROM students WHERE id = ?",
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Student not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// List students (admin)
router.get("/", requireAdmin, async (req, res) => {
  try {
    const students = await query(
      "SELECT id, college_id, name, branch, created_at FROM students ORDER BY created_at DESC"
    );
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Get one student (admin or self)
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (req.user.role === "student" && req.user.id !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const rows = await query(
      "SELECT id, college_id, name, branch, created_at FROM students WHERE id = ?",
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: "Student not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

// Create student (admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { college_id, name, password, branch } = req.body;
    if (!college_id || !name || !password || !branch) {
      return res
        .status(400)
        .json({ error: "college_id, name, password, and branch are required" });
    }
    const hash = await bcrypt.hash(password, 10);
    await query(
      "INSERT INTO students (college_id, name, password_hash, branch) VALUES (?, ?, ?, ?)",
      [String(college_id).trim(), name, hash, branch]
    );
    const [inserted] = await query(
      "SELECT id, college_id, name, branch, created_at FROM students WHERE college_id = ?",
      [college_id]
    );
    res.status(201).json(inserted);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "College ID already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to add student" });
  }
});

// Update student (admin)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { college_id, name, password, branch } = req.body;
    const updates = [];
    const values = [];
    if (college_id !== undefined) {
      updates.push("college_id = ?");
      values.push(String(college_id).trim());
    }
    if (name !== undefined) {
      updates.push("name = ?");
      values.push(name);
    }
    if (branch !== undefined) {
      updates.push("branch = ?");
      values.push(branch);
    }
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      updates.push("password_hash = ?");
      values.push(hash);
    }
    if (!updates.length) {
      return res.status(400).json({ error: "No fields to update" });
    }
    values.push(id);
    await query(`UPDATE students SET ${updates.join(", ")} WHERE id = ?`, values);
    const [updated] = await query(
      "SELECT id, college_id, name, branch, created_at FROM students WHERE id = ?",
      [id]
    );
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.json(updated);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "College ID already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to update student" });
  }
});

// Delete student (admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await query("DELETE FROM students WHERE id = ?", [id]);
    if (!result.affectedRows) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

export default router;

