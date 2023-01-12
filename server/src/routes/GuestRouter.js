const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddlewares");
const guestController = require("../controller/GuestController");
const { authPermission } = require("../middlewares/AuthPermission");

/**
 * Thống kê số lượng khách tham gia, check-in hệ thống
 */
router.get(
  "/statistic/number-of-guest",
  validateToken,
  authPermission(["admin", "tenant"]),
  guestController.number_of_guest
);

/**
 * Thống kê số lượng khách tham gia sự kiện cụ thể
 */
router.post(
  "/statistic/number-of-guest-event",
  validateToken,
  authPermission(["tenant", "admin"]),
  guestController.number_of_guest_each_event
);

module.exports = router;
