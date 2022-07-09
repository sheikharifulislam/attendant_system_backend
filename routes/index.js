const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/user");

router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);

module.exports = router;
