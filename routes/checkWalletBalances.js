const express = require("express");

const log4js = require("log4js");
const log = log4js.getLogger("checkWalletBalances");

log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" }
    }
});

const checkWalletBalances = express.Router();

checkWalletBalances.post("/", (req, res) => {

    let myResponse = {}
    myResponse.seed = req.body.mySeed;
    const deterministic = require('../utils/deterministic');

    if (deterministic.validateMnemonic(myResponse.seed)) {

        deterministic.explore(myResponse.seed, ACCOUNTS)
            .then(response => {
                myResponse.accounts = response;
            }).catch(function (error) {
                log.error(error);
                myResponse.accounts = "there was a problem retrieving the accounts";
            }).finally(() => {
                res.send(myResponse);
            });

    } else {

        log.error(`Invalid seed provided (${myResponse.seed}).`)
        res.send(`Invalid seed provided (${myResponse.seed}).`);

    }

})

module.exports = checkWalletBalances