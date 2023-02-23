const {
  Guests,
  Transactions,
  Accounts,
  PointOfCheckins,
  EventsMng,
} = require("../models");

/**
 * Thống kê số lượng khách tham gia đã check-in qua hệ thống
 * Nếu tenant => Số lượng khách tham gia của tất cả sự kiện mình tổ chức
 * Nếu admin => Tổng số lượng khách tham gia của tất cả tenant
 *
 * @param {Object} req
 * @param {Object} res
 * @returns Số lượng khách tham dự tất cả sự kiện
 */
exports.number_of_guest = async (req, res) => {
  try {
    if (req.user.userRole === "admin") {
      const numberOfGuest = await Transactions.count({
        distinct: true,
        col: "guestCode",
        where: {
          enable: true,
        },
      });
      return res.json({ numberOfGuest: numberOfGuest });
    } else if (req.user.userRole === "tenant") {
      const tenantCode = await Accounts.findOne({
        where: {
          username: req.user.username,
        },
        attributes: ["tenantCode"],
        raw: true,
      });
      console.log("************************", tenantCode);
      const listEvent = await EventsMng.findAll({
        where: {
          tenantCode: tenantCode.tenantCode,
          enable: true,
        },
        attributes: ["eventCode"],
        raw: true,
      });

      const listEventCode = listEvent.map((event) => event.eventCode);
      console.log("************************", listEventCode);
      const listPoc = await PointOfCheckins.findAll({
        where: {
          enable: true,
          eventCode: listEventCode,
        },
        attributes: ["pointCode"],
        raw: true,
      });

      const listPointCode = listPoc.map((point) => point.pointCode);
      console.log("************************", listPointCode);
      const numberOfGuest = await Transactions.count({
        distinct: true,
        col: "guestCode",
        where: {
          pointCode: listPointCode,
          enable: true,
        },
      });
      return res.json({ numberOfGuest: numberOfGuest });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Thống kê số lượng khách tham gia một sự kiện cụ thể nào đó
 *
 * @param {Object} req
 * @param {Object} res
 * @returns Số lượng khách tham dự của một sự kiện cụ thể
 */
exports.number_of_guest_each_event = async (req, res) => {
  const eventCode = req.body.eventCode;
  if (!eventCode) {
    res.sendStatus(400);
  }
  try {
    const listPoc = await PointOfCheckins.findAll({
      where: {
        enable: true,
        eventCode: eventCode,
      },
      attributes: ["pointCode"],
      raw: true,
    });

    const listPointCode = listPoc.map((point) => point.pointCode);

    const numberOfGuest = await Transactions.count({
      distinct: true,
      col: "guestCode",
      where: {
        pointCode: listPointCode,
        enable: true,
      },
    });
    return res.json({ numberOfGuest: numberOfGuest, eventCode: eventCode });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Tổng số lượng khách checkin tại gian hàng mà tài khoản poc phụ trách
 *
 * @param {Object} req
 * @param {Object} res
 * @returns Số lượng khách checkin tại các gian hàng mà tài khoản poc phụ trách (nếu hiểu mỗi poc account đại diện
 * cho một doanh nghiệp tham gia vào sự kiện thì đây là số lượng khách tham quan gian hàng của doanh nghiệp này
 * trong các sự kiện khác nhau)
 */
exports.number_of_guest_poc_account = async (req, res) => {
  const username = req.user.username;

  try {
    const listPoc = await PointOfCheckins.findAll({
      where: {
        username: username,
        enable: true,
      },
      raw: true,
      attributes: ["pointCode"],
    });
    const listPointCode = listPoc.map((poc) => poc.pointCode);
    const numberOfGuest = await Transactions.count({
      distinct: true,
      col: "guestCode",
      where: {
        pointCode: listPointCode,
        enable: true,
      },
    });

    return res.json({ numberOfGuest: numberOfGuest });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
