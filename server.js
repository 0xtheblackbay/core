const express = require("express");
const bodyParser = require("body-parser");

const createWalletRouter = require("./routes/createWallet");
const restoreWalletRouter = require("./routes/restoreWallet");
const randomMnemonicRouter = require("./routes/randomMnemonic");
const validateMnemonicRouter = require("./routes/validateMnemonic");
const checkWalletBalancesRouter = require("./routes/checkWalletBalances");

const log4js = require("log4js");
const log = log4js.getLogger("core-startup");

log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    }
});

GENERATOR_ADDRESS = process.argv.slice(2).toString();
configFileDetails = require("./utils/configEnv.js").getConfigFile('./.config');

try {

    SEED = require('./utils/secureEnv.js').secureEnvironment(GENERATOR_ADDRESS).SEED;
    ETHERSCAN_API_KEY = require('./utils/secureEnv.js').secureEnvironment(GENERATOR_ADDRESS).ETHERSCAN_API_KEY;

    HOSTNAME = configFileDetails.HOSTNAME;
    PORT = configFileDetails.SERVICE_PORT;
    ACCOUNTS = configFileDetails.NUMBER_OF_ACCOUNTS;
    ENTROPY = configFileDetails.TWELVE_WORDS;
    HTTP_PROVIDER_URL = configFileDetails.HTTP_PROVIDER_URL;

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.json());
    app.use("/createWallet", createWalletRouter);
    app.use("/restoreWallet", restoreWalletRouter);
    app.use("/checkWalletBalances", checkWalletBalancesRouter);
    app.use("/randomMnemonic", randomMnemonicRouter);
    app.use("/validateMnemonic", validateMnemonicRouter);

    app.listen(PORT, HOSTNAME, () => {
        log.info(`listening on ${HOSTNAME}:${PORT}...`)
    })

} catch (e) {
    log.error(e)
}
