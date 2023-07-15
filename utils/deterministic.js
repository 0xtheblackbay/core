const { ethers } = require("ethers");
const log4js = require("log4js");
const log = log4js.getLogger("deterministic");

log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    }
});

function randomMnemonic(entropy) {
    return require('bip39').entropyToMnemonic(require('node:crypto').randomBytes(entropy).toString('hex'))
}

function validateMnemonic(seed) {
    return ((typeof seed === 'string' || seed instanceof String)
        && (seed.trim().split(/\s+/g).length >= 12)
        && (require('bip39').validateMnemonic(seed)))
}

function create(seed, accounts) {

    let accountList = [];

    for (let i = 0; i < accounts; i++) {

        let path = "m/44'/60'/0'/0/" + i;
        let wallet = ethers.Wallet.fromMnemonic(seed, path);
        let account = {};
        account.id = i;
        account.address = wallet.address;
        account.privateKey = wallet.privateKey;
        accountList[i] = account;

    }

    return accountList;
}

async function explore(seed, accounts) {

    let accountList = [];

    for (let i = 0; i < accounts; i++) {

        let path = "m/44'/60'/0'/0/" + i;
        let wallet = ethers.Wallet.fromMnemonic(seed, path);
        let account = {};
        account.id = i;
        account.address = wallet.address;
        account.privateKey = wallet.privateKey;
        account.balance = await require('./onchain').getAccountBalance(account.address);
        accountList[i] = account;

    }

    return accountList;
}

module.exports = {
    create,
    explore,
    randomMnemonic,
    validateMnemonic
}