const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8080;

const db = require("./models");

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, this is server!')
})

//Routes:
const eventsController = require("./routes/EventController");
app.use("/events-management", eventsController);

const pointCheckin = require("./routes/PointController");
app.use("/point-of-checkin", pointCheckin);

const clientController = require("./routes/ClientController");
app.use("/client", clientController);

const userController = require("./routes/UserController");
app.use("/auth", userController);

const transactionController = require("./routes/TransactionController");
app.use("/transaction", transactionController);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || port, () => {
        console.log("Hello NodeJS");
    });
});
