const { Guests, Transactions, Accounts } = require("../models");

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
          username: username,
        },
        attributes: ["tenantCode"],
        raw: true,
      });

      const listEvent = await Events.findAll({
        where: {
          tenantCode: tenantCode.tenantCode,
          enable: true,
        },
        attributes: ["eventCode"],
        raw: true,
      });

      const listEventCode = listEvent.map((event) => event.eventCode);

      const listPoc = await Events.findAll({
        where: {
          enable: true,
          eventCode: listEventCode,
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
      return res.json({ numberOfGuest: numberOfGuest });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.number_of_guest_each_event = async (req, res) => {
  const eventCode = req.body.eventCode;
  if (!eventCode) {
    res.sendStatus(400);
  }
  try {
    const listPoc = await Events.findAll({
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
    return res.json({ numberOfGuest: numberOfGuest });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
