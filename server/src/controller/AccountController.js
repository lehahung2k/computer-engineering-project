const { Accounts, Tenants, EventsMng, PointOfCheckins } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { Op } = require("sequelize");
/**
 * Đăng ký tài khoản (tài khoản Poc)
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.signup = async (req, res) => {
  const {
    username,
    password,
    fullName,
    active,
    role,
    companyName,
    phoneNumber,
    tenantCode,
    email,
  } = req.body;
  const user = await Accounts.findOne({
    where: {
      username: username,
    },
  });
  if (user === null || !user) {
    bcrypt.hash(password, 6).then((hash) => {
      Accounts.create({
        username: username,
        passwd: hash,
        fullName: fullName,
        active: active,
        role: role,
        companyName: companyName,
        phoneNumber: phoneNumber,
        tenantCode: tenantCode,
        email: email,
      });
      res.json("SUCCESS");
    });
  } else {
    res.json({ error: "Error: Username is existed!" });
  }
};

/**
 * Đăng nhập tài khoản
 *
 * @param {Object} req {body{username, password}}
 * @param {Object} res
 * @returns Access token và user role, error code (401, 500)
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.sendStatus(400);
  }
  try {
    const user = await Accounts.findOne({
      where: {
        username: username,
      },
    });

    if (user === null || !user) {
      res.json({ error: "User not found!" });
    } else {
      bcrypt.compare(password, user.passwd).then(async (match) => {
        if (!match) {
          res.json({ error: "Wrong username or password" });
        } else {
          let secretKey = process.env.SECRET_KEY;
          let algorithm = process.env.ALGORITHM;
          const accessToken = sign(
            { username: user.username, userRole: user.role },
            secretKey,
            {
              algorithm: algorithm,
            }
          );
          res.json({ accessToken: accessToken, userRole: user.role });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

/**
 * Lấy danh sách tài khoản poc chung, dựa trên username trong token nếu tenant
 * thì trả về danh sách tài khoản thuộc quản lý của tenant còn nếu là admin thì
 * trả về tất cả
 *
 * @param {Object} req
 * @param {Object} res
 * @returns response list account if success and error code (401, 500)
 */
exports.get_list_account = async (req, res) => {
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

/**
 * Lấy danh sách tài khoản thuộc quản lý của tenant (ban tổ chức) còn có thể gán cho poc
 *
 * @param {Object} req {body{tenantCode}}
 * @param {Object} res
 */
exports.get_list_account_available = async (req, res) => {
  const tenantCode = req.body.tenantCode;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const time = req.body.time;
  if (!tenantCode || time === undefined) return res.sendStatus(400);
  if (time) {
    if (!startTime || !endTime) return res.sendStatus(400);
  }
  try {
    if (time) {
      const listEventCode = await EventsMng.findAll({
        where: {
          [Op.or]: [
            {
              startTime: {
                [Op.gte]: startTime,
                [Op.lte]: endTime,
              },
            },
            {
              endTime: {
                [Op.gte]: startTime,
                [Op.lte]: endTime,
              },
            },
            {
              endTime: {
                [Op.gte]: endTime,
              },
              startTime: {
                [Op.lte]: startTime,
              },
            },
          ],
        },
        attributes: ["eventCode"],
        raw: true,
      });

      let listAccountUsed = [];
      for (let event of listEventCode) {
        const tmpListAccountUsed = await PointOfCheckins.findAll({
          where: {
            eventCode: event.eventCode,
          },
          raw: true,
          attributes: ["username"],
        });

        for (let account of tmpListAccountUsed) {
          let check = listAccountUsed.find(
            (item) => item.username === account.username
          );
          if (!check) {
            listAccountUsed.push(account);
          }
        }
      }
      const listUsernameUsed = listAccountUsed.map(
        (account) => account.username
      );
      const listAccount = await Accounts.findAll({
        where: {
          role: "poc",
          tenantCode: tenantCode,
          username: {
            [Op.not]: listUsernameUsed,
          },
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
      return res.json(listAccount);
    } else {
      const listAccount = await Accounts.findAll({
        where: {
          role: "poc",
          tenantCode: tenantCode,
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
      return res.json(listAccount);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Lấy thông tin của tài khoản theo tên đăng nhập
 *
 * @param {Object} req
 * @param {Object} res
 * @returns Thông tin tài khoản nếu thành công và error code(401, 500)
 */
exports.get_account_info_by_username = async (req, res) => {
  const username = req.user.username;
  if (!username) return res.status(401).send("Invalid token");
  try {
    const accountInfo = await Accounts.findOne({
      where: { username: username },
      attributes: [
        "username",
        "fullName",
        "email",
        "phoneNumber",
        "tenantCode",
      ],
    });

    res.json(accountInfo);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

/**
 * Cập nhật trạng thái xác minh (kích hoạt) của tài khoản Poc
 * (0: Chưa xác minh, 1: Đã xác minh)
 *
 * @param {Object} req {body{username}}
 * @param {Object} res
 * @returns Kết quả cập nhật trạng thái tài khoản ({username, active}), error code(400, 401, 500)
 */
exports.update_active_account = async (req, res) => {
  const username = req.body.username;
  if (!username) return res.sendStatus(400);
  try {
    const currentActive = await Accounts.findOne({
      where: { username: username },
      attributes: ["active"],
    });
    await Accounts.update(
      { active: currentActive.active === 0 ? 1 : 0 },
      {
        where: { username: username },
      }
    );
    res.json({
      username: username,
      active: currentActive.active === 0 ? 1 : 0,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
