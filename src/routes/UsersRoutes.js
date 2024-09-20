const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddelware");

router.post("/sign-up", UsersController.createUser);
router.post("/sign-in", UsersController.loginUser);
router.put("/update-user/:id", UsersController.updateUser);
router.delete("/delete-user/:id", authMiddleWare, UsersController.deleteUser);
router.get("/get-allUser", authMiddleWare, UsersController.getAllUsers);
router.get("/get-user/:id", authUserMiddleWare, UsersController.getUserDetail);
router.post("/refresh-token", UsersController.refreshToken);

module.exports = router;
