const router = require("express").Router();
const userController = require("../controller/user");

/**
 * get user by email or id
 **/
router.get("/:userId/", userController.getUserById);

/**
 * update use by id
 * @method put
 **/
router.put("/:userId/", userController.putUserById);

/**
 * update use by id
 * @method patch
 **/
router.patch("/:userId/", userController.patchUserById);

/**
 * delete use by id
 **/
router.delete("/:userId/", userController.deleteUserById);
router.get("/", userController.getUsers);
router.post("/", userController.postUser);

module.exports = router;
