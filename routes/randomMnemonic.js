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

    let myResponse;
    const deterministic = require('../utils/deterministic');
    try {
        myResponse = deterministic.randomMnemonic(ENTROPY);
    } catch (error) {
        log.error(error);
        myResponse = "there was a problem generating the mnemonic, please check ENTROPY in properly configured.";
    } finally {
        res.send(myResponse);
    };

})

module.exports = randomMnemonic