import express from "express";
import { query } from "../config/db.js";
import { authMiddleware, requireAdmin, requireStudent } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// List registrations
// Admin: all; Student: own
router.get("/registrations", async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const rows = await query(
        `SELECT er.id,
                er.student_id,
                er.activity_id,
                er.status,
                er.notes,
                er.created_at,
                er.reviewed_at,
                s.college_id,
                s.name  AS student_name,
                s.branch,
                a.name  AS activity_name,
                c.name  AS category_name
           FROM event_registrations er
           JOIN students s            ON er.student_id = s.id
           JOIN activities a          ON er.activity_id = a.id
           JOIN activity_categories c ON a.category_id = c.id
       ORDER BY er.created_at DESC`
      );
      return res.json(rows);
    }

    const rows = await query(
      `SELECT er.id,
              er.activity_id,
              er.status,
              er.notes,
              er.created_at,
              a.name  AS activity_name,
              c.name  AS category_name
         FROM event_registrations er
         JOIN activities a          ON er.activity_id = a.id
         JOIN activity_categories c ON a.category_id = c.id
        WHERE er.student_id = ?
     ORDER BY er.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

// Register for event (student)
router.post("/registrations", requireStudent, async (req, res) => {
  try {
    const { activity_id, notes } = req.body;
    if (!activity_id) {
      return res.status(400).json({ error: "activity_id required" });
    }
    await query(
      "INSERT INTO event_registrations (student_id, activity_id, status, notes) VALUES (?, ?, 'pending', ?)",
      [req.user.id, activity_id, notes || null]
    );
    const rows = await query(
      `SELECT er.*, a.name AS activity_name
         FROM event_registrations er
         JOIN activities a ON er.activity_id = a.id
        WHERE er.id = LAST_INSERT_ID()`
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Already registered for this event" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to register" });
  }
});

// Approve / reject registration (admin)
router.patch("/registrations/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "status must be 'approved' or 'rejected'" });
    }
    await query(
      "UPDATE event_registrations SET status = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?",
      [status, id]
    );
    const rows = await query("SELECT * FROM event_registrations WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Registration not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update registration" });
  }
});

export default router;

