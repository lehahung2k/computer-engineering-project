const express = require("express");
const router = express.Router();
const { Transactions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

/**
 * Lấy tất các các giao dịch check-in theo mã poc (thông tin check-in cho từng quầy)
 */
router.post("/get-all-by-point-code", validateToken, async (req, res) => {
  if (!req.user.username) return res.status(401).send("Invalid token");
  const pointCode = req.body.pointCode;
  console.log(req.body);
  if (!pointCode) return res.sendStatus(400);
  try {
    const listTransactions = await Transactions.findAll({
      where: { pointCode: pointCode },
    });
    res.json(listTransactions);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

/**
 * Thêm mới giao dịch check-in
 */
router.post("/add-transaction", async (req, res) => {
  const post = req.body;
  await Transactions.create(post);
  res.json(post);
});

// router.delete("/delete-transaction/:event_id", async (req, res) => {
//   const event_id = req.params.event_id;
//   await Transactions.destroy({
//     where: {
//       event_id: event_id,
//     },
//   });

//   res.json("Delete success");
// });

module.exports = router;
