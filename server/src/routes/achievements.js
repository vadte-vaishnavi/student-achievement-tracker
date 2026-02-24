import express from "express";
import { query } from "../config/db.js";
import { authMiddleware, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// List achievements
// Admin: all; Student: own only
router.get("/", async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const rows = await query(
        `SELECT ach.id,
                ach.student_id,
                ach.activity_id,
                ach.type,
                ach.title,
                ach.description,
                ach.achieved_date,
                ach.certificate_url,
                ach.approved,
                ach.created_at,
                s.college_id,
                s.name AS student_name,
                s.branch,
                a.name AS activity_name
           FROM achievements ach
      LEFT JOIN students s ON ach.student_id = s.id
      LEFT JOIN activities a ON ach.activity_id = a.id
       ORDER BY ach.created_at DESC`
      );
      return res.json(rows);
    }

    const rows = await query(
      `SELECT ach.id,
              ach.activity_id,
              ach.type,
              ach.title,
              ach.description,
              ach.achieved_date,
              ach.certificate_url,
              ach.approved,
              a.name AS activity_name
         FROM achievements ach
    LEFT JOIN activities a ON ach.activity_id = a.id
        WHERE ach.student_id = ?
     ORDER BY ach.achieved_date DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
});

// Achievements by student id (admin or self)
router.get("/student/:studentId", async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId, 10);
    if (req.user.role === "student" && req.user.id !== studentId) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const rows = await query(
      `SELECT ach.id,
              ach.type,
              ach.title,
              ach.description,
              ach.achieved_date,
              ach.certificate_url,
              ach.approved,
              a.name AS activity_name
         FROM achievements ach
    LEFT JOIN activities a ON ach.activity_id = a.id
        WHERE ach.student_id = ?
     ORDER BY ach.achieved_date DESC`,
      [studentId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
});

// Create achievement (admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const {
      student_id,
      activity_id,
      type,
      title,
      description,
      achieved_date,
      certificate_url,
    } = req.body;
    if (!student_id || !type || !title || !achieved_date) {
      return res.status(400).json({
        error:
          "student_id, type (award|participation|certification), title, achieved_date required",
      });
    }
    await query(
      `INSERT INTO achievements
         (student_id, activity_id, type, title, description, achieved_date, certificate_url, approved)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        student_id,
        activity_id || null,
        type,
        title,
        description || null,
        achieved_date,
        certificate_url || null,
      ]
    );
    const rows = await query(
      "SELECT * FROM achievements WHERE id = LAST_INSERT_ID()"
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add achievement" });
  }
});

// Update achievement (admin)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const {
      activity_id,
      type,
      title,
      description,
      achieved_date,
      certificate_url,
      approved,
    } = req.body;
    await query(
      `UPDATE achievements
          SET activity_id    = COALESCE(?, activity_id),
              type           = COALESCE(?, type),
              title          = COALESCE(?, title),
              description    = ?,
              achieved_date  = COALESCE(?, achieved_date),
              certificate_url= ?,
              approved       = COALESCE(?, approved)
        WHERE id = ?`,
      [
        activity_id,
        type,
        title,
        description,
        achieved_date,
        certificate_url,
        approved != null ? (approved ? 1 : 0) : null,
        id,
      ]
    );
    const rows = await query("SELECT * FROM achievements WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Achievement not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update achievement" });
  }
});

// Delete achievement (admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await query("DELETE FROM achievements WHERE id = ?", [id]);
    if (!result.affectedRows) {
      return res.status(404).json({ error: "Achievement not found" });
    }
    res.json({ message: "Achievement deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete achievement" });
  }
});

export default router;

