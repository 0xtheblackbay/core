const express = require("express");
const axios = require("axios");

// Initialise logger
const log4js = require("log4js");
const log = log4js.getLogger("randomMnemonic");

// Configure logger
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const randomMnemonic = express.Router();

randomMnemonic.get("/", (req, res) => {

    res.send(require('../utils/deterministic').randomMnemonic(ENTROPY));

})

module.exports = randomMnemonic