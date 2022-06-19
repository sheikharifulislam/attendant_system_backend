const router = require("express").Router();
const {
    registrationController,
    loginController,
} = require("../controller/auth");

router.post("/registration", registrationController);
router.post("/login", loginController);

module.exports = router;
