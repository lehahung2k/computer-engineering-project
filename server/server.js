const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8080;

app.use(express.json());

const db = mysql.createConnection({
    user: "eventmgnt",
    host: "mycel.app",
    port: "3306",
    password: "hung22hieu",
    database: "eventmgnt"
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log("Hello NodeJS");
})