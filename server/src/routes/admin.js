import express from "express";
import { query } from "../config/db.js";
import { authMiddleware, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);
router.use(requireAdmin);

// Dashboard statistics
router.get("/stats", async (req, res) => {
  try {
    const [students] = await query("SELECT COUNT(*) AS count FROM students");
    const [activities] = await query("SELECT COUNT(*) AS count FROM activities");
    const [achievements] = await query("SELECT COUNT(*) AS count FROM achievements");
    const [pendingRegistrations] = await query(
      "SELECT COUNT(*) AS count FROM event_registrations WHERE status = 'pending'"
    );
    const [stallBookings] = await query(
      "SELECT COUNT(*) AS count FROM stall_bookings"
    );

    res.json({
      totalStudents: students?.count ?? 0,
      totalActivities: activities?.count ?? 0,
      totalAchievements: achievements?.count ?? 0,
      pendingRegistrations: pendingRegistrations?.count ?? 0,
      stallBookings: stallBookings?.count ?? 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// High-level reports for admin UI (summary view)
router.get("/reports", async (req, res) => {
  try {
    const students = await query(
      "SELECT id, college_id, name, branch FROM students ORDER BY name"
    );
    const rows = await Promise.all(
      students.map(async (s) => {
        const [ach] = await query(
          "SELECT COUNT(*) AS count FROM achievements WHERE student_id = ?",
          [s.id]
        );
        const [reg] = await query(
          "SELECT COUNT(*) AS count FROM event_registrations WHERE student_id = ?",
          [s.id]
        );
        return {
          ...s,
          achievementsCount: ach?.count ?? 0,
          registrationsCount: reg?.count ?? 0,
        };
      })
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

export default router;

