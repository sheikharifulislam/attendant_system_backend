const router = require("express").Router();
const userController = require("../controller/user");

/**
 * get user by email or id
 **/

router.get("/:userid/", (rq, res) => {});
/**
 * update use by id
 **/

router.patch("/:userid/", (req, res) => {});
/**
 * delete use by id
 **/
router.delete("/:userid/", (req, res) => {});
router.get("/", userController.getUsers);
router.post("/", (req, res) => {});

module.exports = router;
