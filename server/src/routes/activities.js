import express from "express";
import { query } from "../config/db.js";
import { authMiddleware, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// Categories with nested activities
router.get("/categories", async (req, res) => {
  try {
    const categories = await query(
      "SELECT id, name, type FROM activity_categories ORDER BY id"
    );
    const activities = await query(
      "SELECT id, category_id, name, description, is_event, event_date, max_participants FROM activities ORDER BY category_id, name"
    );
    const result = categories.map((c) => ({
      ...c,
      activities: activities.filter((a) => a.category_id === c.id),
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Flat activities list
router.get("/", async (req, res) => {
  try {
    const activities = await query(
      `SELECT a.id, a.category_id, a.name, a.description, a.is_event, a.event_date, a.max_participants,
              c.name AS category_name, c.type AS category_type
         FROM activities a
         JOIN activity_categories c ON a.category_id = c.id
        ORDER BY c.type, a.name`
    );
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

// Create category (admin)
router.post("/categories", requireAdmin, async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
      return res
        .status(400)
        .json({ error: "name and type required. type: cultural|sports|ncc_outreach|college_fest" });
    }
    await query("INSERT INTO activity_categories (name, type) VALUES (?, ?)", [
      name,
      type,
    ]);
    const rows = await query(
      "SELECT * FROM activity_categories WHERE id = LAST_INSERT_ID()"
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add category" });
  }
});

// Create activity (admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { category_id, name, description, is_event, event_date, max_participants } =
      req.body;
    if (!category_id || !name) {
      return res.status(400).json({ error: "category_id and name required" });
    }
    await query(
      "INSERT INTO activities (category_id, name, description, is_event, event_date, max_participants) VALUES (?, ?, ?, ?, ?, ?)",
      [
        category_id,
        name,
        description || null,
        is_event ? 1 : 0,
        event_date || null,
        max_participants || null,
      ]
    );
    const rows = await query("SELECT * FROM activities WHERE id = LAST_INSERT_ID()");
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add activity" });
  }
});

// Update activity (admin)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { category_id, name, description, is_event, event_date, max_participants } =
      req.body;
    await query(
      `UPDATE activities
          SET category_id = COALESCE(?, category_id),
              name        = COALESCE(?, name),
              description = ?,
              is_event    = COALESCE(?, is_event),
              event_date  = ?,
              max_participants = ?
        WHERE id = ?`,
      [
        category_id,
        name,
        description,
        is_event != null ? (is_event ? 1 : 0) : null,
        event_date || null,
        max_participants ?? null,
        id,
      ]
    );
    const rows = await query("SELECT * FROM activities WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Activity not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update activity" });
  }
});

// Delete activity (admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await query("DELETE FROM activities WHERE id = ?", [id]);
    if (!result.affectedRows) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.json({ message: "Activity deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete activity" });
  }
});

export default router;

