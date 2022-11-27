const express = require("express");
const router = express.Router();
const { Tenant } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { authPermission } = require("../middlewares/AuthPermission");

router.get("/", async (req, res) => {
  const listTenants = await Tenant.findAll();
  res.json(listTenants);
});

router.post("/add-tenant", async (req, res) => {
  const post = req.body;
  await Tenant.create(post);
  res.json(post);
});

module.exports = router;
