const express = require("express");

const log4js = require("log4js");
const log = log4js.getLogger("validateMnemonic");

log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const validateMnemonic = express.Router();

validateMnemonic.post("/", (req, res) => {

    let seed = req.body.mySeed;
    let response = `Invalid SEED provided (${seed}).`;
    const deterministic = require('../utils/deterministic');

    if (deterministic.validateMnemonic(seed)){
        response = `The SEED is valid (${seed}).`;
    }

    res.send(response);

})

module.exports = validateMnemonic