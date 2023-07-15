const express = require("express");

const log4js = require("log4js");
const log = log4js.getLogger("restoreWallet");

log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" }
    }
});

const restoreWallet = express.Router();

restoreWallet.get("/", (req, res) => {

    let myResponse = {}
    myResponse.seed=SEED;
    const deterministic = require('../utils/deterministic');

    if (deterministic.validateMnemonic(myResponse.seed)) {

        try {
            myResponse.accounts = deterministic.create(myResponse.seed, ACCOUNTS);
        } catch (error) {
            log.error(error);
            myResponse.accounts = "there was a problem retrieving the accounts, check SEED.";
        } finally {
            res.send(myResponse);
        };

    } else {

        log.error(`Invalid seed provided (${myResponse.seed}).`)
        res.send(`Invalid seed provided (${myResponse.seed}).`);

    }

})

module.exports = restoreWallet