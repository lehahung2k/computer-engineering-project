const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddlewares");
const guestController = require("../controller/GuestController");

/**
 * Các api dành cho thống kê
 */
router.get("/number-of-guest", validateToken, guestController.number_of_guest);

router.post(
  "/number-of-guest-each-event",
  validateToken,
  guestController.number_of_guest_each_event
);

module.exports = router;
