const express = require("express");
const router = express.Router();
const { Tenants, Accounts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { authPermission } = require("../middlewares/AuthPermission");
const tenantController = require("../controller/TenantController");
const { route } = require("./AccountRouter");
/**
 * Lấy danh sách thông tin ban tổ chức
 * Nếu là admin trả về thông tin tất cả ban tổ chức
 * Nếu là tenant thì chỉ trả về thông tin của tenant đó
 */
router.get("/get-list-tenant", validateToken, tenantController.get_list_tenant);

/**
 * Thêm mới ban tổ chức (chỉ dành cho admin)
 */
router.post("/add-tenant", validateToken, tenantController.add_tenant);

/**
 * Cập nhật thông tin ban tổ chức (chỉ dành cho admin)
 */
router.put("/update-tenant", validateToken, tenantController.update_tenant);

/**
 * Lấy thông tin của ban tổ chức theo mã (dành cho tài khoản poc)
 */
router.post(
  "/get-tenant-info-by-tenant-code",
  validateToken,
  tenantController.get_tenant_info_by_tenantCode
);

/**
 * Lấy thông tin tenant thông qua tài khoản ban tổ chức (dành cho tài khoản tenant)
 */
router.get("/get-tenant-info", validateToken, tenantController.get_tenant_info);

/**
 * Kiểm tra điều kiện xóa của tenant
 */
router.post(
  "/check-delete-condition",
  validateToken,
  tenantController.check_delete_condition
);

/**
 * Xóa tenant
 */
router.post("/delete-tenant", validateToken, tenantController.delete_tenant);

/**
 * Thống kê số lượng tenant
 */
router.get(
  "/statistic/number-of-tenant",
  validateToken,
  authPermission(["admin"]),
  tenantController.number_of_tenant
);

module.exports = router;
