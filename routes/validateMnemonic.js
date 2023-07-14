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
    
    let seed=req.body.mySeed;

    if ((typeof seed === 'string' || seed instanceof String) && (seed.trim().split(/\s+/g).length >= 12)){

        res.send(require('bip39').validateMnemonic(seed))

    }else{

        res.send("Invalid seed provided.");   

    }

})

module.exports = validateMnemonic