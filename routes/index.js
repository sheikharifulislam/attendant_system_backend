const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/user");
const adminAttendanceRoutes = require("../routes/admin-attendance");
router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/admin/attendance", authenticate, adminAttendanceRoutes);

module.exports = router;
