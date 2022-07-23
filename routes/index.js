const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const adminAttendanceRoutes = require("./admin-attendance");
const studentAttendanceRoutes = require("./student-attendance");

router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/admin/attendance", authenticate, adminAttendanceRoutes);
router.use("/student/attendance", authenticate, studentAttendanceRoutes);

module.exports = router;
