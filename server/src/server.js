const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());
const port = 8080;

const db = require("./models");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API checkin server",
      version: "1.0.0",
      description: "This is API of the server!",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(express.json({ limit: "5mb" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Hello, this is server!");
});

//Routes:
const eventsRouter = require("./routes/EventRouter");
app.use("/events-management", eventsRouter);

const tenantRouter = require("./routes/TenantRouter");
app.use("/tenant", tenantRouter);

const pointRouter = require("./routes/PointRouter");
app.use("/point-of-checkin", pointRouter);

const clientController = require("./routes/ClientController");
app.use("/client", clientController);

const accountRouter = require("./routes/AccountRouter");
app.use("/auth", accountRouter);

const transactionRouter = require("./routes/TransactionRouter");
app.use("/transaction", transactionRouter);

const guestRouter = require("./routes/GuestRouter");
app.use("/guest", guestRouter);

// Show document in public folder
app.use("/help", express.static(path.join(__dirname, "docs")));

db.sequelize.sync().then(() => {
  const httpsServer = https.createServer(
    {
      cert: fs.readFileSync(process.env.SSL_CRT_FILE),
      key: fs.readFileSync(process.env.SSL_KEY_FILE),
    },
    app
  );
  httpsServer.listen(process.env.PORT, () => {
    console.log(
      `Server running with SSL Cert on port https://xephang.online:${process.env.PORT}`
    );
  });
});

module.exports = app;
