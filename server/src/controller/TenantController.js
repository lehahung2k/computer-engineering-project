const { Tenants } = require("../models");
const { Accounts } = require("../models");

/**
 * Lấy thông tin của ban tổ chức theo tài khoản đăng nhập (từ token)
 *
 * @param {Object} req user (username, userRole) từ token
 * @param {Object} res
 * @returns response tenant info if success and error code (401, 500)
 */
exports.get_tenant_info_by_tenant_account = async (req, res) => {
  if (!req.user.userRole) return res.status(401).send("Invalid token");
  if (req.user.userRole === "tenant" || req.user.userRole === "admin") {
    if (!req.user.username) return res.status(401).send("Invalid token");
    try {
      const tenantCode = await Accounts.findOne({
        where: {
          username: req.user.username,
        },
        attributes: ["tenantCode"],
        raw: true,
      });
      const tenantInfo = await Tenants.findOne({
        where: {
          tenantCode: tenantCode.tenantCode,
        },
      });
      return res.json(tenantInfo);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(401);
};
