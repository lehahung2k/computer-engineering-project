const express = require("express");
const router = express.Router();
const { Transactions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const transactionController = require("../controller/TransactionController");

/**
 * Lấy tất các các giao dịch check-in theo mã poc (thông tin check-in cho từng quầy)
 */
router.post(
  "/get-all-by-point-code",
  validateToken,
  transactionController.get_all_by_point_code
);

/**
 * Thêm mới giao dịch check-in
 */
router.post("/add-transaction", transactionController.add_transaction);

/**
 * Xóa giao dịch check-in
 */
router.delete("/delete-transaction", transactionController.delete_transaction);

module.exports = router;
