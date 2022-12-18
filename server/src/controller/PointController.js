const { PointOfCheckins, Transactions } = require("../models");

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
    const updatedListPoc = await PointOfCheckins.bulkCreate(post, {
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
  const listPointCode = req.body.listPointCode;
  if (!listPointCode) return res.sendStatus(400);

  try {
    const updateRes = await Transactions.update(
      { enable: false },
      {
        where: {
          pointCode: listPointCode,
        },
      }
    );
    res.json({ update: "success" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.check_delete_condition = async (req, res) => {
  const listPointCode = req.body.listPointCode;
  if (!listPointCode) return res.sendStatus(400);
  console.log(listPointCode);
  try {
    const listTransactions = await Transactions.findAll({
      where: {
        pointCode: listPointCode,
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
