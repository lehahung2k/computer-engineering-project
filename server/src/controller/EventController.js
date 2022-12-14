const { Tenants, Accounts, EventsMng } = require("../models");

/**
 * Lấy danh sách các sự kiện của tenant (ban tổ chức đã tạo)
 *
 * @param {Object} req user (username, userRole) từ token
 * @param {Object} res
 * @returns response list event if success and error code (401, 500)
 */
exports.get_list_event_of_tenant = async (req, res) => {
  if (!req.user.username) return res.status(401).send("Invalid token");
  try {
    const tenantCode = await Accounts.findOne({
      where: {
        username: req.user.username,
      },
      attributes: ["tenantCode"],
      raw: true,
    });

    const listEvent = await EventsMng.findAll({
      where: {
        tenantCode: tenantCode.tenantCode,
      },
      raw: true,
    });
    const formattedListEvent = listEvent.map((event) => {
      const formattedEventImage = Buffer.from(event.eventImg).toString("utf8");
      const formattedEvent = { ...event, eventImg: formattedEventImage };
      return formattedEvent;
    });

    return res.json(formattedListEvent);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
