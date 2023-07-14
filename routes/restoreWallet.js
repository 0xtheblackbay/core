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

    if ((typeof myResponse.seed === 'string' || myResponse.seed instanceof String) && (myResponse.seed.trim().split(/\s+/g).length >= 12) && (require('bip39').validateMnemonic(myResponse.seed))){

        myResponse.accounts=require('../utils/deterministic').create(myResponse.seed, ACCOUNTS);
        res.send(myResponse);

    }else{

        log.error(`Invalid seed provided (${myResponse.seed}).`)
        res.send(`Invalid seed provided (${myResponse.seed}).`);   

    }

})

module.exports = restoreWallet