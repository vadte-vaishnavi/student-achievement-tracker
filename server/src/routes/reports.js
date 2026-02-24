import express from "express";
import { query } from "../config/db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// Student: own report; Admin: pass ?studentId= to view a specific student
router.get("/achievement-summary", async (req, res) => {
  try {
    const studentId = req.user.role === "admin" ? req.query.studentId : req.user.id;
    if (req.user.role === "admin" && !studentId) {
      return res.status(400).json({ error: "studentId required for admin" });
    }
    if (req.user.role === "student" && Number(studentId) !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const student = await query(
      "SELECT id, college_id, name, branch FROM students WHERE id = ?",
      [studentId]
    );
    if (!student.length) {
      return res.status(404).json({ error: "Student not found" });
    }

    const achievements = await query(
      `SELECT ach.type,
              ach.title,
              ach.description,
              ach.achieved_date,
              a.name AS activity_name
         FROM achievements ach
    LEFT JOIN activities a ON ach.activity_id = a.id
        WHERE ach.student_id = ? AND ach.approved = 1
     ORDER BY ach.achieved_date DESC`,
      [studentId]
    );

    const registrations = await query(
      `SELECT er.status,
              a.name AS activity_name,
              er.created_at
         FROM event_registrations er
         JOIN activities a ON er.activity_id = a.id
        WHERE er.student_id = ?
     ORDER BY er.created_at DESC`,
      [studentId]
    );

    res.json({
      student: student[0],
      achievements,
      eventRegistrations: registrations,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

export default router;

