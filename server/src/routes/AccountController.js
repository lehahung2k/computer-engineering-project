const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddlewares");
const accountController = require("../controller/AccountController");

/**
 * Đăng ký tài khoản
 */
router.post("/", accountController.signup);

/**
 * Đăng nhập tài khoản
 */
router.post("/login", accountController.login);

/**
 * Lấy danh sách các tài khoản Poc
 */
router.get(
  "/get-list-poc-account",
  validateToken,
  accountController.get_list_account
);

/**
 * Lấy danh sách các tài khoản Poc theo mã ban tổ chức (tenant)
 */
router.post(
  "/get_list_account_for_create_event",
  validateToken,
  accountController.get_list_account_for_create_event
);

/**
 * Lấy thông tin tài khoản theo username
 */
router.post(
  "/get-account-info-by-username",
  validateToken,
  accountController.get_account_info_by_username
);

/**
 * Cập nhật trạng thái kích hoạt của tài khoản Poc
 */
router.put(
  "/update-account",
  validateToken,
  accountController.update_active_account
);

/**
 * Xóa tài khoản POC
 */

/**
 * Xóa tài khoản tenant
 */
module.exports = router;
