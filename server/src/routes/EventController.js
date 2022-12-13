const express = require("express");
const router = express.Router();
const { EventsMng, PointOfCheckins } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { authPermission } = require("../middlewares/AuthPermission");

/**
 * Lấy danh sách tất cả các sự kiện (dành cho admin)
 */
router.get("/", validateToken, async (req, res) => {
  const listEvents = await EventsMng.findAll({ raw: true });
  const formattedListEvent = listEvents.map((event) => {
    const formattedEventImage = Buffer.from(event.eventImg).toString("utf8");
    const formattedEvent = { ...event, eventImg: formattedEventImage };
    return formattedEvent;
  });
  res.json(formattedListEvent);
});

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
router.post(
  "/add-event",
  // validateToken,
  async (req, res) => {
    const post = req.body;
    try {
      await EventsMng.create(post);
      res.json(req.body);
    } catch (err) {
      res.json(req.body);
    }
  }
);

/**
 * Cập nhật sự kiện
 */
router.put(
  "/update-event/:event_id",
  // validateToken,
  async (req, res) => {
    const event_id = req.params.event_id;
    await EventsMng.update(req.body, {
      where: { event_id: event_id },
    });
    res.json("Update success!");
  }
);

/**
 * Xóa sự kiện
 */
router.delete(
  "/delete-event-by-id/:event_id",
  validateToken,
  async (req, res) => {
    const event_id = req.params.event_id;
    await EventsMng.destroy({
      where: { event_id: event_id },
    });
    res.json("Delete success");
  }
);

/**
 * Lấy danh sách sự kiện theo tài khoản Poc
 */
router.get("/list-event-by-account", validateToken, async (req, res) => {
  const username = req.user.username;
  if (!username) {
    return res.status(401).send("Invalid token");
  }
  try {
    let listEventCode = await PointOfCheckins.findAll({
      where: { username: username },
      attributes: ["eventCode"],
    });
    let listEvent = [];
    console.log(listEventCode);
    for (let eventCode of listEventCode) {
      console.log(eventCode.dataValues.eventCode);
      let event = await EventsMng.findOne({
        where: { eventCode: eventCode.dataValues.eventCode },
        raw: true,
      });
      const formattedEventImage = Buffer.from(event.eventImg).toString("utf8");
      let formattedEvent = { ...event, eventImg: formattedEventImage };
      listEvent.push(formattedEvent);
    }
    res.json(listEvent);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
