const { ethers } = require("ethers");

function randomMnemonic(entropy){
    return require('bip39').entropyToMnemonic(require('node:crypto').randomBytes(entropy).toString('hex'))
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

module.exports = {
    create,
    randomMnemonic
}