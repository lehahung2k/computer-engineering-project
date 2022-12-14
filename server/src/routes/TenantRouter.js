const express = require("express");
const router = express.Router();
const { Tenants, Accounts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { authPermission } = require("../middlewares/AuthPermission");
const tenantController = require("../controller/TenantController");
/**
 * Lấy danh sách thông tin tất cả ban tổ chức (chỉ dành cho admin)
 */
router.get("/", validateToken, async (req, res) => {
  if (req.user.userRole !== "admin") return res.sendStatus(401);
  try {
    const listTenant = await Tenants.findAll({ raw: true });
    let listTenantInfoFull = [];
    for (let tenant of listTenant) {
      const username = await Accounts.findOne({
        where: {
          tenantCode: tenant.tenantCode,
          role: "tenant",
        },
        raw: true,
      });

      listTenantInfoFull.push({ ...tenant, ...username });
    }
    return res.json(listTenantInfoFull);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * Thêm mới ban tổ chức (chỉ dành cho admin)
 */
router.post("/add-tenant", async (req, res) => {
  const post = req.body;
  const newTenant = await Tenants.create(post);
  res.json(newTenant.toJSON());
});

/**
 * Cập nhật thông tin ban tổ chức (chỉ dành cho admin)
 */
router.put("/update-tenant", async (req, res) => {
  const post = req.body;
  const updatedTenant = await Tenants.update(post, {
    where: { tenantId: post.id },
  });
  res.json(updatedTenant);
});

/**
 * Lấy thông tin của ban tổ chức theo mã (dành cho tài khoản poc)
 */
router.post(
  "/get-tenant-info-by-tenant-code",
  validateToken,
  async (req, res) => {
    if (!req.user.userRole) return res.status(401).send("Invalid token");
    const tenantCode = req.body.tenantCode;
    if (!tenantCode) return res.sendStatus(400);

    try {
      const tenantInfo = await Tenants.findOne({
        where: { tenantCode: tenantCode },
        attributes: [
          "tenantName",
          "tenantAddress",
          "contactName",
          "contactEmail",
          "contactPhone",
          "tenantCode",
        ],
        raw: true,
      });

      const username = await Accounts.findOne({
        where: {
          tenantCode: tenantCode,
          role: "tenant",
        },
        raw: true,
      });

      const customTenantInfo = { ...tenantInfo, ...username };
      if (req.user.userRole === "poc") return res.json(tenantInfo);
      if (req.user.userRole === "admin" || req.user.userRole === "tenant")
        return res.json(customTenantInfo);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

/**
 * Lấy thông tin tenant thông qua tài khoản ban tổ chức
 */
router.get(
  "/get-tenant-info-by-account",
  validateToken,
  tenantController.get_tenant_info_by_tenant_account
);
module.exports = router;
