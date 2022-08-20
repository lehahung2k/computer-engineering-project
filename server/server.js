const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8080;

const db = require("./models");

app.use(express.json());
app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

//Routes:
const eventsController = require("./routes/EventController");
app.use("/events-management", eventsController);

const pointCheckin = require("./routes/PointController");
app.use("/point-of-checkin", pointCheckin);

const checkinController = require("./routes/CheckinController");
app.use("/checkin", checkinController);

const userController = require("./routes/UserController");
app.use("/auth", userController);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Hello NodeJS");
    });
});