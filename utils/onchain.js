const log4js = require("log4js");
const log = log4js.getLogger("onchain");

log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    }
});

async function getAccountBalance(address) {

    let res = {};
    res.url = HTTP_PROVIDER_URL + '?module=account&action=balance&address=' + address + '&apikey=' + ETHERSCAN_API_KEY;
    const axios = require("axios");

    try {
        res.payload = await axios.get(res.url);
    } catch (error) {
        log.error(error);
        res.payload = error.message;
        res.statusCode = 503;
    } finally {
        return res.payload.data.result
    };

}

module.exports = {
    getAccountBalance
}