const { Accounts, Tenants } = require("../models");

/**
 * Lấy danh sách tài khoản thuộc quản lý của tenant (ban tổ chức)
 *
 * @param {Object} req
 * @param {Object} res
 * @returns response list account if success and error code (401, 500)
 */
exports.get_list_account_of_tenant = async (req, res) => {
  if (!req.user.username) return res.status(401).send("Invalid token");
  const username = req.user.username;
  const userRole = req.user.userRole;

  try {
    let tenant = {};
    if (userRole === "tenant") {
      const tenantCode = await Accounts.findOne({
        where: {
          username: req.user.username,
        },
        attributes: ["tenantCode"],
        raw: true,
      });

      tenant = await Tenants.findOne({
        where: {
          tenantCode: tenantCode.tenantCode,
        },
        raw: true,
        attributes: ["tenantCode", "tenantName"],
      });
    }

    let listAccount = [];
    let listAccountFull = [];
    if (userRole === "tenant") {
      listAccount = await Accounts.findAll({
        where: {
          tenantCode: tenant.tenantCode,
          role: "poc",
        },
        attributes: [
          "username",
          "fullName",
          "phoneNumber",
          "companyName",
          "active",
        ],
        raw: true,
      });

      listAccountFull = listAccount.map((account) => ({
        ...account,
        tenantName: tenant.tenantName,
      }));
    } else if (userRole === "admin") {
      let listTenant = await Tenants.findAll({
        raw: true,
        attributes: ["tenantCode", "tenantName"],
      });

      listAccount = await Accounts.findAll({
        where: {
          role: "poc",
        },
        attributes: [
          "username",
          "fullName",
          "phoneNumber",
          "companyName",
          "active",
          "tenantCode",
        ],
        raw: true,
      });

      listAccountFull = listAccount.map((account) => {
        const tenantName = listTenant.find(
          (tenant) => tenant.tenantCode === account.tenantCode
        );
        return {
          ...account,
          ...tenantName,
        };
      });
    }

    return res.json(listAccountFull);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
