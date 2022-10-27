const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 8080;

const db = require("./models");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API checkin server',
            version: '1.0.0',
            description: 'This is API of the server!'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./routes/*js']
}

const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
