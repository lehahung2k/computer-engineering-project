const express = require("express");
const router = express.Router();
const { EventsMng, PointOfCheckins } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { authPermission } = require("../middlewares/AuthPermission");
const eventController = require("../controller/EventController");
/**
 * Lấy danh sách tất cả các sự kiện
 * Nếu là admin: Trả về tất cả các sự kiện
 * Nếu là tenant: Trả về các sự kiện mà tenant đã tạo
 * Nếu là poc: Trả về các sự kiện mà tài khoản poc đó được phân công tham gia
 */
router.get("/get-list-event", validateToken, eventController.get_list_event);

/**
 *
 */
// router.get(
//   "/get-list-event-by-tenant",
//   validateToken,
//   eventController.get_list_event_of_tenant
// );

// router.get(
//   "/find-event-by-id/:event_id", //authPermission([1]),
//   validateToken,
//   async (req, res) => {
//     const event_id = req.params.event_id;
//     const event = await EventsMng.findByPk(event_id);
//     res.json(event);
//   }
// );

// router.get("/find-event-by-code/:event_code", async (req, res) => {
//   const event_code = req.params.event_code;
//   const listEvents = await EventsMng.findAll({
//     where: { event_code: event_code },
//   });
//   res.json(listEvents);
// });

/**
 * Thêm sự kiện mới
 */
router.post("/add-event", validateToken, eventController.add_event);

/**
 * Cập nhật sự kiện
 */
router.put("/update-event", validateToken, eventController.update_event);

/**
 * Xóa sự kiện
 */
router.post("/delete-event", validateToken, eventController.delete_event);

/**
 *
 */
router.post(
  "/check-delete-condition",
  validateToken,
  eventController.check_delete_condition
);

/**
 * Lấy danh sách sự kiện theo tài khoản Poc
 */
router.get(
  "/list-event-by-account",
  validateToken,
  eventController.get_list_event
);

module.exports = router;
