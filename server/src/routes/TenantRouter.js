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

module.exports = router;
