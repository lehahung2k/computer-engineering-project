const express = require("express");
const router = express.Router();
const { Tenants } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { authPermission } = require("../middlewares/AuthPermission");

router.get("/", async (req, res) => {
  const listTenants = await Tenants.findAll();
  res.json(listTenants);
});

router.post("/add-tenant", async (req, res) => {
  const post = req.body;
  const newTenant = await Tenants.create(post);
  res.json(newTenant.toJSON());
});

router.put("/update-tenant", async (req, res) => {
  const post = req.body;
  const updatedTenant = await Tenants.update(post, {
    where: { tenantId: post.id },
  });
  res.json(updatedTenant);
});

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
        ],
      });
      res.json(tenantInfo);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
