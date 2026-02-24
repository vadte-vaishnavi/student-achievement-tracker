import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import studentsRoutes from "./routes/students.js";
import activitiesRoutes from "./routes/activities.js";
import achievementsRoutes from "./routes/achievements.js";
import eventsRoutes from "./routes/events.js";
import stallsRoutes from "./routes/stalls.js";
import adminRoutes from "./routes/admin.js";
import reportsRoutes from "./routes/reports.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/achievements", achievementsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/stalls", stallsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportsRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Generic error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});

