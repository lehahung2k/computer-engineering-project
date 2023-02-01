const { Tenants, EventsMng, Accounts } = require("../models");

/**
 * Lấy danh sách thông tin ban tổ chức
 * Nếu là admin trả về thông tin tất cả ban tổ chức
 * Nếu là tenant thì chỉ trả về thông tin của tenant đó
 *
 * @param {Object} req
 * @param {Object} res
 * @returns Danh sách thông tin các tenant nếu là admin và chỉ thông tin của tenant đang gửi request nếu là tenant
 */
exports.get_list_tenant = async (req, res) => {
  if (req.user.userRole === "admin") {
    try {
      const listTenant = await Tenants.findAll({
        where: { enable: true },
        raw: true,
      });
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
  } else if (req.user.userRole === "tenant") {
    try {
      const username = req.user.username;
      const tenantCode = await Accounts.findOne({
        where: { username: username },
        attributes: ["tenantCode"],
        raw: true,
      });
      const tenant = await Tenants.findOne({
        where: { tenantCode: tenantCode.tenantCode },
        raw: true,
      });
      let listTenantInfoFull = [{ ...tenant, username: username }];

      return res.json(listTenantInfoFull);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else res.sendStatus(401);
};

/**
 * Lấy thông tin của ban tổ chức theo tài khoản đăng nhập (từ token)
 *
 * @param {Object} req user (username, userRole) từ token
 * @param {Object} res
 * @returns response tenant info if success and error code (401, 500)
 */
exports.get_tenant_info = async (req, res) => {
  if (req.user.userRole === "tenant") {
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
  } else {
    res.sendStatus(401);
  }
};

/**
 * Lấy thông tin tenant chủ quản của tài khoản poc
 *
 * @param {Object} req {body{tenantCode}}
 * @param {Object} res
 * @returns Thông tin ban tổ chức (tenant) chủ quản của tài khoản poc
 */
exports.get_tenant_info_by_tenantCode = async (req, res) => {
  if (!req.user.userRole) return res.status(401).send("Invalid token");
  const tenantCode = req.body.tenantCode;
  if (!tenantCode) return res.sendStatus(400);
  console.log(tenantCode);
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
};

/**
 * Cập nhật thông tin ban tổ chức tenant
 *
 * @param {Object} req {body{tenantInfo object}}
 * @param {Object} res
 * @return Kết quả update thành công/không thành công
 */
exports.update_tenant = async (req, res) => {
  const post = req.body;
  if (!post) return res.sendStatus(400);
  try {
    const updateResult = await Tenants.update(post, {
      where: { tenantId: post.id },
    });

    const updatedTenant = await Tenants.findOne({
      where: { tenantId: post.id },
    });
    res.json(updatedTenant);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/**
 * Tạo mới tenant ban tổ chức
 *
 * @param {Obejct} req {body{tenantInfo object}}
 * @param {Object} res
 * @returns Trả về thông tin tenant tạo mới thành công
 */
exports.add_tenant = async (req, res) => {
  const post = req.body;
  if (!post) return res.sendStatus(400);
  try {
    const newTenant = await Tenants.create(post);
    return res.json(newTenant);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Kiểm tra điều kiện xóa của tenant
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {boolean} Điều kiện xóa tenant, true: có thể xóa, false: ngược lại
 */
exports.check_delete_condition = async (req, res) => {
  const listTenant = req.body;
  if (!listTenant || listTenant.length === 0) return res.sendStatus(400);
  const listTenantCode = listTenant.map((tenant) => tenant.tenantCode);

  try {
    const listEvent = await EventsMng.findAll({
      where: {
        enable: true,
        tenantCode: listTenantCode,
      },
    });
    if (listEvent.length > 0) {
      return res.json({ check: false });
    } else {
      return res.json({ check: true });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Xóa thông tin tenant
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
exports.delete_tenant = async (req, res) => {
  const listTenant = req.body;
  if (!listTenant || listTenant.length === 0) return res.sendStatus(400);
  const listTenantId = listTenant.map((tenant) => tenant.tenantId);

  try {
    const updateResult = await Tenants.update(
      { enable: false },
      {
        where: {
          tenantId: listTenantId,
        },
      }
    );
    const listTenantRemain = await Tenants.findAll({
      where: {
        enable: true,
      },
    });
    return res.json(listTenantRemain);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Thống kê số lượng tenant
 *
 * @param {Object} req
 * @param {Object} res
 * @returns Số lượng tenant trong hệ thống
 */
exports.number_of_tenant = async (req, res) => {
  try {
    const numberOfTenant = await Tenants.count({
      distinct: true,
      col: "tenantCode",
      where: {
        enable: true,
      },
    });

    return res.json({ numberOfTenant: numberOfTenant });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
