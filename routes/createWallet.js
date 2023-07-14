const express = require("express");

const log4js = require("log4js");
const log = log4js.getLogger("createAccounts");

log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" }
    }
});

const createWallet = express.Router();

createWallet.post("/", (req, res) => {

    let myResponse = {}
    myResponse.seed=req.body.mySeed;

    if ((typeof myResponse.seed === 'string' || myResponse.seed instanceof String) && (myResponse.seed.trim().split(/\s+/g).length >= 12) && (require('bip39').validateMnemonic(myResponse.seed))){

        myResponse.accounts=require('../utils/deterministic').create(myResponse.seed, ACCOUNTS);
        res.send(myResponse);

    }else{

        log.error(`Invalid seed provided (${myResponse.seed}).`)
        res.send(`Invalid seed provided (${myResponse.seed}).`);   

    }

})

module.exports = createWallet