const {
  PointOfCheckins,
  Accounts,
  Transactions,
  EventsMng,
} = require("../models");

/**
 * Thêm mới quầy hàng POC
 *
 * @param {Object} req {body{PointOfCheckins object}}
 * @param {Object} res
 * @returns Thông tin quầy hàng POC mới tạo thành công
 */
exports.add_point = async (req, res) => {
  const post = req.body;
  console.log(post);
  if (!post) return res.sendStatus(400);
  try {
    await PointOfCheckins.bulkCreate(post, {
      updateOnDuplicate: ["enable"],
    });
    res.json(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Cập nhật danh sách Poc (vì danh sách cập nhật có cập nhật poc đã có và thêm mới poc
 * nên dùng bulkCreate với option là updateOnDuplicate để thêm mới và cập nhật các poc bị trùng)
 *
 * @param {Object} req {body{List of PointOfCheckins object}}
 * @param {Object} res
 * @returns Danh sách poc đã cập nhật
 */
exports.update_list_poc = async (req, res) => {
  const post = req.body;
  console.log(post);
  if (!post) return res.sendStatus(400);
  try {
    if (post.length === 0) return res.json([]);
    const eventCode = post[0].eventCode;
    const listPoc = await PointOfCheckins.findAll({
      where: {
        eventCode: eventCode,
      },
      raw: true,
    });

    let filteredListPoc = [];
    for (let poc of post) {
      const checkDuplicate = listPoc.find((e) => e.pointCode === poc.pointCode);
      if (!checkDuplicate) {
        if (poc.enable) {
          filteredListPoc.push(poc);
        } else continue;
      }
      filteredListPoc.push(poc);
    }
    const updatedListPoc = await PointOfCheckins.bulkCreate(filteredListPoc, {
      updateOnDuplicate: ["enable"],
    });
    res.json(updatedListPoc);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Lấy danh sách thông tin Poc theo mã sự kiện
 *
 * @param {Object} req {body{eventCode}}
 * @param {Object} res
 * @returns Danh sách thông tin các poc của sự kiện
 */
exports.get_all_poc_by_event_code = async (req, res) => {
  const eventCode = req.body.eventCode;
  console.log(req.body);
  if (!eventCode) return res.sendStatus(400);
  try {
    const listPoc = await PointOfCheckins.findAll({
      where: { eventCode: eventCode },
    });
    return res.json(listPoc);
  } catch (err) {
    res.sendStatus(500);
  }
};

/**
 * Lấy thông tin của quầy hàng mà người phụ trách (poc account) đang phụ trách
 * (sử dụng username của người đó và eventCode mà người đó muốn xem thông tin)
 *
 * @param {Object} req {body{eventCode}, user{username}}
 * @param {Object} res
 * @returns Thông tin quầy hàng mà người phụ trách (poc account) đang phụ trách
 */
exports.get_poc_info_by_username = async (req, res) => {
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
};

exports.delete_point = async (req, res) => {
  const listPoc = req.body;
  if (!listPoc || listPoc.length === 0) return res.sendStatus(400);
  const listPocId = listPoc.map((poc) => poc.pointId);
  try {
    const updateRes = await PointOfCheckins.update(
      { enable: false },
      {
        where: {
          pointId: listPocId,
        },
      }
    );
    const listPocRemain = await PointOfCheckins.findAll({
      where: {
        eventCode: listPoc[0].eventCode,
        enable: true,
      },
    });
    res.json(listPocRemain);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.check_delete_condition = async (req, res) => {
  const listPoc = req.body;
  if (!listPoc) return res.sendStatus(400);
  const listPointCode = listPoc.map((poc) => poc.pointCode);
  try {
    const listTransactions = await Transactions.findAll({
      where: {
        pointCode: listPointCode,
        enable: true,
      },
      raw: true,
    });
    if (listTransactions.length > 0) {
      return res.json({ check: false });
    } else {
      return res.json({ check: true });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Thống kê số lượng poc
 * Nếu tenant = số lượng poc của tất cả sự kiện
 * Nếu admin = số lượng poc của tất cả tenant
 *
 * @param {Object} req
 * @param {Object} res
 * @returns Số lượng gian hàng poc
 */
exports.number_of_poc = async (req, res) => {
  const role = req.user.userRole;
  const username = req.user.username;
  try {
    if (role === "admin") {
      const numberOfPoc = await PointOfCheckins.count({
        distinct: true,
        col: "pointCode",
        where: {
          enable: true,
        },
      });

      return res.json({ numberOfPoc: numberOfPoc });
    } else if (role === "tenant") {
      const tenantCode = await Accounts.findOne({
        where: {
          username: username,
        },
        attributes: ["tenantCode"],
        raw: true,
      });

      const listEvent = await EventsMng.findAll({
        where: {
          tenantCode: tenantCode.tenantCode,
          enable: true,
        },
        attributes: ["eventCode"],
        raw: true,
      });

      const listEventCode = listEvent.map((event) => event.eventCode);

      const numberOfPoc = await PointOfCheckins.count({
        distinct: true,
        col: "pointCode",
        where: {
          enable: true,
          eventCode: listEventCode,
        },
      });

      return res.json({ numberOfPoc: numberOfPoc });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Thống kê số lượng gian hàng poc của một sự kiện cụ thể
 *
 * @param {Object} req
 * @param {Object} res
 * @returns Số lượng gian hàng poc của sự kiện cụ thể
 */
exports.number_of_poc_event = async (req, res) => {
  const eventCode = req.body.eventCode;
  if (!eventCode) {
    return res.sendStatus(400);
  }
  try {
    const numberOfPoc = await PointOfCheckins.count({
      distinct: true,
      col: "pointCode",
      where: {
        enable: true,
        eventCode: eventCode,
      },
    });

    return res.json({ numberOfPoc: numberOfPoc });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
