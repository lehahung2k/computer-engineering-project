const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8080;

const db = require("./models");

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

//Routes:
const eventsController = require("./routes/EventController");
app.use("/events-management", eventsController);

const pointCheckin = require("./routes/PointController");
app.use("/point-of-checkin", pointCheckin);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Hello NodeJS");
    });
});
