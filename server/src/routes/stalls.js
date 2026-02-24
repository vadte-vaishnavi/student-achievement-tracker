import express from "express";
import { query } from "../config/db.js";
import { authMiddleware, requireAdmin, requireStudent } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// List bookings
// Admin: all; Student: own
router.get("/bookings", async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const rows = await query(
        `SELECT sb.id,
                sb.student_id,
                sb.stall_type,
                sb.stall_name,
                sb.description,
                sb.payment_status,
                sb.amount,
                sb.created_at,
                s.college_id,
                s.name AS student_name,
                s.branch
           FROM stall_bookings sb
           JOIN students s ON sb.student_id = s.id
       ORDER BY sb.created_at DESC`
      );
      return res.json(rows);
    }

    const rows = await query(
      "SELECT id, stall_type, stall_name, description, payment_status, amount, created_at FROM stall_bookings WHERE student_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Create booking (student)
router.post("/bookings", requireStudent, async (req, res) => {
  try {
    const { stall_type, stall_name, description, amount } = req.body;
    if (!stall_type || !["food", "event"].includes(stall_type)) {
      return res
        .status(400)
        .json({ error: "stall_type required: 'food' or 'event'" });
    }
    await query(
      "INSERT INTO stall_bookings (student_id, stall_type, stall_name, description, payment_status, amount) VALUES (?, ?, ?, ?, 'pending', ?)",
      [req.user.id, stall_type, stall_name || null, description || null, amount || 0]
    );
    const rows = await query(
      "SELECT * FROM stall_bookings WHERE id = LAST_INSERT_ID()"
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Update payment status / amount (admin)
router.patch("/bookings/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { payment_status, status, amount } = req.body;
    const newStatus = payment_status ?? status;
    if (!["pending", "paid", "refunded"].includes(newStatus)) {
      return res.status(400).json({
        error: "payment_status/status must be 'pending', 'paid', or 'refunded'",
      });
    }
    const updates = ["payment_status = ?"];
    const values = [newStatus];
    if (amount != null) {
      updates.push("amount = ?");
      values.push(amount);
    }
    values.push(id);
    await query(`UPDATE stall_bookings SET ${updates.join(", ")} WHERE id = ?`, values);
    const rows = await query("SELECT * FROM stall_bookings WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Booking not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

export default router;

