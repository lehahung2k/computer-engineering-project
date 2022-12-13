const express = require("express");
const router = express.Router();
const { PointOfCheckins } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

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
  async (req, res) => {
    const post = req.body;
    await PointOfCheckins.bulkCreate(post);
    res.json(post);
  }
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
  async (req, res) => {
    const eventCode = req.body.eventCode;
    console.log(req.body);
    if (!eventCode) return res.sendStatus(400);
    try {
      const listPoc = await PointOfCheckins.findAll({
        where: { eventCode: eventCode },
        attributes: ["pointName", "username", "pointNote"],
      });
      return res.json(listPoc);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

/**
 * Lấy danh sách Poc theo tài khoản Poc (danh sách Poc mà tài khoản phụ trách)
 */
router.post("/get-poc-info-by-username", validateToken, async (req, res) => {
  const username = req.user.username;
  const eventCode = req.body.eventCode;
  if (!username) res.status(401).send("Invalid token");
  if (!eventCode) res.sendStatus(400);

  try {
    const pocInfo = await PointOfCheckins.findOne({
      where: { username: username, eventCode: eventCode },
    });
    res.json(pocInfo);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
module.exports = router;
