const express = require("express");
const router = express.Router();
const { PointOfCheckins } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const pointController = require("../controller/PointController");
const { route } = require("./AccountRouter");
const { authPermission } = require("../middlewares/AuthPermission");

// router.get("/:event_id", async (req, res) => {
//   const id = req.params.event_id;
//   console.log(id);
//   const listPointOfCheck = await PointOfCheckins.findAll({
//     where: { event_id: id },
//   });
//   res.json(listPointOfCheck);
// });

/**
 * Thêm mới danh sách quầy hàng Poc
 */
router.post(
  "/add-point",
  // validateToken,
  pointController.add_point
);

/**
 * Cập nhật danh sách các quầy hàng
 */
router.put(
  "/update-list-poc",
  // validateToken,
  pointController.update_list_poc
);

// router.put("/:event_id/update-point/:point_id", async (req, res) => {
//   try {
//     const event_id = req.params.event_id;
//     const point_id = req.params.point_id;
//     await PointOfCheckins.update(req.body, {
//       where: {
//         event_id: event_id,
//         point_id: point_id,
//       },
//     });
//     res.json("Update success!");
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// });

// router.delete("/:event_id/delete-point/:point_id", async (req, res) => {
//   const event_id = req.params.event_id;
//   const point_id = req.params.point_id;
//   await PointOfCheckins.destroy({
//     where: {
//       event_id: event_id,
//       point_id: point_id,
//     },
//   });
//   res.json("Delete success");
// });

// router.delete("/delete-all-poc/:event_id", validateToken, async (req, res) => {
//   const event_id = req.params.event_id;
//   await PointOfCheckins.destroy({
//     where: {
//       event_id: event_id,
//     },
//   });

//   res.json("Delete success");
// });

/**
 * Lấy danh sách Poc theo mã sự kiện
 */
router.post(
  "/get-all-poc-by-event-code",
  // validateToken,
  pointController.get_all_poc_by_event_code
);

/**
 * Lấy danh sách Poc theo tài khoản Poc (danh sách Poc mà tài khoản phụ trách)
 */
router.post(
  "/get-poc-info-by-username",
  validateToken,
  pointController.get_poc_info_by_username
);

/**
 * Xóa các quầy hàng Poc
 */
router.post("/delete-point", validateToken, pointController.delete_point);

/**
 * Kiểm tra điều kiện xóa quầy hàng Poc
 */
router.post(
  "/check-delete-condition",
  validateToken,
  pointController.check_delete_condition
);

/**
 * Thống kê số lượng gian hàng poc
 * Nếu tenant = số lượng poc của tất cả sự kiện
 * Nếu admin = số lượng poc của tất cả tenant
 */
router.get(
  "/statistic/number-of-poc",
  validateToken,
  authPermission(["tenant", "admin"]),
  pointController.number_of_poc
);

/**
 * Thống kê số lượng gian hàng poc của sự kiện cụ thể
 */
router.post(
  "/statistic/number-of-poc-event",
  validateToken,
  authPermission(["tenant", "admin"]),
  pointController.number_of_poc_event
);

module.exports = router;
