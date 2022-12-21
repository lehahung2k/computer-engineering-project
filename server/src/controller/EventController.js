const { Tenants, Accounts, EventsMng, PointOfCheckins } = require("../models");

/**
 * Lấy danh sách các sự kiện của tenant (ban tổ chức đã tạo)
 *
 * @param {Object} req user (username, userRole) từ token
 * @param {Object} res
 * @returns response list event if success and error code (401, 500)
 */
// exports.get_list_event_of_tenant = async (req, res) => {
//   if (!req.user.username) return res.status(401).send("Invalid token");
//   try {
//     const tenantCode = await Accounts.findOne({
//       where: {
//         username: req.user.username,
//       },
//       attributes: ["tenantCode"],
//       raw: true,
//     });

//     const listEvent = await EventsMng.findAll({
//       where: {
//         tenantCode: tenantCode.tenantCode,
//       },
//       raw: true,
//     });
//     const formattedListEvent = listEvent.map((event) => {
//       const formattedEventImage = Buffer.from(event.eventImg).toString("utf8");
//       const formattedEvent = { ...event, eventImg: formattedEventImage };
//       return formattedEvent;
//     });

//     return res.json(formattedListEvent);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// };

/**
 * Lấy danh sách thông tin tât cả các sự kiện
 * Nếu là admin: Trả về tất cả các sự kiện
 * Nếu là tenant: Trả về các sự kiện mà tenant đã tạo
 * Nếu là poc: Trả về các sự kiện mà tài khoản poc đó được phân công tham gia
 *
 * @param {Object} req
 * @param {Object} res
 * @returns Danh sách các sự kiện
 */
exports.get_list_event = async (req, res) => {
  const username = req.user.username;
  const userRole = req.user.userRole;
  try {
    if (userRole === "tenant") {
      await getListEventsTenant(username, res);
    } else if (userRole === "admin") {
      await getListEventsAdmin(username, res);
    } else if (userRole === "poc") {
      await getListEventsPoc(username, res);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getListEventsAdmin = async (username, res) => {
  const listEvents = await EventsMng.findAll({
    where: { enable: true },
    raw: true,
  });
  const listTenant = await Tenants.findAll({ raw: true });

  const formattedListEvent = listEvents.map((event) => {
    const formattedEventImage = Buffer.from(event.eventImg).toString("utf8");
    const tenantName = listTenant.find(
      (tenant) => tenant.tenantCode === event.tenantCode
    );
    const formattedEvent = {
      ...event,
      eventImg: formattedEventImage,
      tenantName: tenantName.tenantName,
    };
    return formattedEvent;
  });
  return res.json(formattedListEvent);
};

const getListEventsTenant = async (username, res) => {
  const tenantCode = await Accounts.findOne({
    where: {
      username: username,
    },
    raw: true,
    attributes: ["tenantCode"],
  });

  const tenantName = await Tenants.findOne({
    where: {
      tenantCode: tenantCode.tenantCode,
    },
    attributes: ["tenantName"],
    raw: true,
  });

  const listEvents = await EventsMng.findAll({
    where: {
      tenantCode: tenantCode.tenantCode,
      enable: true,
    },
    raw: true,
  });
  const formattedListEvent = listEvents.map((event) => {
    const formattedEventImage = Buffer.from(event.eventImg).toString("utf8");
    const formattedEvent = {
      ...event,
      eventImg: formattedEventImage,
      ...tenantName,
    };
    return formattedEvent;
  });
  return res.json(formattedListEvent);
};

const getListEventsPoc = async (username, res) => {
  let listEventCode = await PointOfCheckins.findAll({
    where: { username: username },
    attributes: ["eventCode"],
  });
  let listEvent = [];
  console.log(listEventCode);
  for (let eventCode of listEventCode) {
    console.log(eventCode.dataValues.eventCode);
    let event = await EventsMng.findOne({
      where: { eventCode: eventCode.dataValues.eventCode, enable: true },
      raw: true,
    });
    const formattedEventImage = Buffer.from(event.eventImg).toString("utf8");
    let formattedEvent = { ...event, eventImg: formattedEventImage };
    listEvent.push(formattedEvent);
  }
  res.json(listEvent);
};
/**
 * Tạo mới event
 *
 * @param {Object} req {body{newEventObject}}
 * @param {Object} res
 * @returns Thông tin event mới đã tạo thành công
 */
exports.add_event = async (req, res) => {
  const post = req.body;
  if (!post || post === {}) return res.sendStatus(400);
  try {
    const newEvent = await EventsMng.create(post);
    return res.json(newEvent);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Cập nhật thông tin của sự kiện
 *
 * @param {Object} req {body{eventObject}}
 * @param {Object} res
 * @returns Trả về thông tin event đã update
 */
exports.update_event = async (req, res) => {
  const eventInfo = req.body;
  if (!eventInfo || eventInfo === {}) return res.sendStatus(400);
  const eventId = eventInfo.eventId;
  try {
    const updateResult = await EventsMng.update(eventInfo, {
      where: { eventId: eventId },
    });
    if (!updateResult) throw Error("Update failed!");
    const updatedEvent = await EventsMng.findOne({
      where: { eventId: eventId },
    });
    return res.json(updatedEvent);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Xóa thông tin của sự kiện
 *
 * @param {Object} req {body{eventObject}}
 * @param {Object} res
 * @returns
 */
exports.delete_event = async (req, res) => {
  const eventInfo = req.body;
  console.log(eventInfo);
  if (!eventInfo || eventInfo === {}) return res.sendStatus(400);
  const eventId = eventInfo.eventId;
  try {
    const updateResult = await EventsMng.update(
      { enable: false },
      {
        where: { eventId: eventId },
      }
    );
    if (!updateResult) throw Error("Update delete event failed!");

    return res.json({ delete: "Success" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

exports.check_delete_condition = async (req, res) => {
  const eventInfo = req.body;
  if (!eventInfo || eventInfo === {}) return res.sendStatus(400);

  try {
    const listPoc = await PointOfCheckins.findAll({
      where: {
        eventCode: eventInfo.eventCode,
        enable: true,
      },
      raw: true,
    });
    if (listPoc.length > 0) {
      return res.json({ check: false });
    } else {
      return res.json({ check: true });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
