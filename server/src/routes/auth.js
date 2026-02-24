import express from "express";
import bcrypt from "bcryptjs";
import { query } from "../config/db.js";
import { signToken } from "../middleware/auth.js";

const router = express.Router();

// POST /api/auth/login
// Admin:  { role: "admin", email, password }
// Student:{ role: "student", collegeId | college_id, password }
router.post("/login", async (req, res) => {
  try {
    const { role, email, collegeId, college_id, password } = req.body;
    const collegeIdVal = collegeId ?? college_id;

    if (role === "admin") {
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }
      const admins = await query(
        "SELECT id, email, password_hash FROM admin WHERE email = ?",
        [email.trim()]
      );
      if (!admins.length) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const admin = admins[0];
      const valid = await bcrypt.compare(password, admin.password_hash);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = signToken({ id: admin.id, role: "admin", email: admin.email });
      return res.json({
        token,
        role: "admin",
        user: { id: admin.id, email: admin.email },
      });
    }

    if (role === "student") {
      if (!collegeIdVal || !password) {
        return res.status(400).json({ error: "College ID and password required" });
      }
      const students = await query(
        "SELECT id, college_id, name, branch, password_hash FROM students WHERE college_id = ?",
        [String(collegeIdVal).trim()]
      );
      if (!students.length) {
        return res.status(401).json({ error: "Invalid College ID or password" });
      }
      const student = students[0];
      const valid = await bcrypt.compare(password, student.password_hash);
      if (!valid) {
        return res.status(401).json({ error: "Invalid College ID or password" });
      }
      const token = signToken({
        id: student.id,
        role: "student",
        college_id: student.college_id,
      });
      const user = {
        id: student.id,
        college_id: student.college_id,
        name: student.name,
        branch: student.branch,
      };
      return res.json({ token, role: "student", user });
    }

    return res.status(400).json({ error: "Invalid role. Use 'admin' or 'student'." });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

