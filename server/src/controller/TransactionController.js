const { Transactions, Guests } = require("../models");

/**
 * Lấy danh sách các lượt checkin tại quầy poc theo mã point code
 *
 * @param {Object} req {body{pointCode}}
 * @param {Object} res
 * @returns Danh sách các lượt checkin tại quầy
 */
exports.get_all_by_point_code = async (req, res) => {
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
};

/**
 * Thêm mới giao dịch (transaction) check-in
 *
 * @param {Object} req {body{Transactions object}}
 * @param {Object} res
 * @returns Transaction mới tạo thành công
 */
exports.add_transaction = async (req, res) => {
  const post = req.body;
  if (!post) return res.sendStatus(400);
  try {
    const newTransaction = await Transactions.create(post);
    const newGuest = {
      guestCode: post.guestCode,
      guestDescription: post.note,
      frontImg: post.checkinImg1,
      backImg: post.checkinImg2,
      identityType: post.identityType,
      enable: true,
    };

    const createNewGuest = await Guests.bulkCreate([newGuest], {
      updateOnDuplicate: ["fontImg", "backImg"],
    });
    res.json(newTransaction);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Xóa danh sách các transaction (bằng cách cập nhật trường enable về false)
 *
 * @param {Object} req {body{ListTransaction for delete}}
 * @param {Object} res
 * @returns Danh sách transaction đã xóa
 */
exports.delete_transaction = async (req, res) => {
  const listTransaction = req.body;
  if (!listTransaction || listTransaction.length === 0)
    return res.sendStatus(400);
  const listTransactionId = listTransaction.map(
    (transaction) => transaction.tranId
  );
  try {
    const deletedListTransaction = await Transactions.update(
      { enable: false },
      {
        where: { tranId: listTransactionId },
      }
    );

    const listTransactionRemain = await Transactions.findAll({
      where: {
        pointCode: listTransaction[0].pointCode,
        enable: true,
      },
    });
    res.json(listTransactionRemain);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
