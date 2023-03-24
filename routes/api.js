const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User");

router.get("/users", userController.getAppointments);

router.post("/users", userController.postAppointments);

router.delete("/users/:id", userController.deleteAppointments);

router.put("/users/:id", userController.updateAppointments);

module.exports = router;
