
const express = require('express');

const statusRouter = express.Router();

statusRouter.get('/status', (req, res) => {

    //6. Error middleware
    throw new Error("Error")

    res.status(200).json({ messsage: 'Server is alive and well' })
})


module.exports = statusRouter