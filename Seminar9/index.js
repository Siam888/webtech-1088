"use strict"

const express = require("express");
const sequelize = require('./sequelize')

//3. Employee Router
const employeeRouter = require('./services/employeeService');

//2. Entities
require('./models/employee');

const app = express();
app.use(express.json());

app.use('/api', employeeRouter);

app.listen(7000, async () => {
    console.log("Server started on http://localhost:7000")

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");

    } catch (err) {
        console.error("Unable to connect to the database: ", err);
    }
})