const express = require("express");
const router = express.Router();
const { Tenants } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { authPermission } = require("../middlewares/AuthPermission");
const tenantController = require("../controller/TenantController");
/**
 * Lấy danh sách thông tin tất cả ban tổ chức (chỉ dành cho admin)
 */
router.get("/", async (req, res) => {
  const listTenants = await Tenants.findAll();
  res.json(listTenants);
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
 * Lấy thông tin của ban tổ chức theo mã
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
      });
      res.json(tenantInfo);
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
