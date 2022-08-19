const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8080;

const db = require("./models");

app.use(express.json());

// const db = mysql.createConnection({
//     user: "eventmgnt",
//     host: "mycel.app",
//     port: "3306",
//     password: "hung22hieu",
//     database: "eventmgnt"
// });
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Hello NodeJS");
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
