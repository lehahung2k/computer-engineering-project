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

exports.get_list_event = async (req, res) => {
  const username = req.user.username;
  const userRole = req.user.userRole;
  try {
    if (userRole === "tenant") {
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
        },
        raw: true,
      });
      const formattedListEvent = listEvents.map((event) => {
        const formattedEventImage = Buffer.from(event.eventImg).toString(
          "utf8"
        );
        const formattedEvent = {
          ...event,
          eventImg: formattedEventImage,
          ...tenantName,
        };
        return formattedEvent;
      });
      return res.json(formattedListEvent);
    } else if (userRole === "admin") {
      const listEvents = await EventsMng.findAll({ raw: true });
      const listTenant = await Tenants.findAll({ raw: true });

      const formattedListEvent = listEvents.map((event) => {
        const formattedEventImage = Buffer.from(event.eventImg).toString(
          "utf8"
        );
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
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
