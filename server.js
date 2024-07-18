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

try {

    const GENERATOR_ADDRESS = process.env.MS_SECRET || process.argv.slice(2).toString();
    const CONFIG_FILE = process.env.CONFIG_FILE || '.config';

    const config = require("./utils/configEnv.js").getConfigFile(CONFIG_FILE);
    
    ENC_ENV_PATH = config.ENC_ENV_PATH || process.env.ENC_ENV_PATH;
    HOSTNAME = config.HOSTNAME || process.env.HOSTNAME;
    MS_ID = config.MS_ID || process.env.MS_ID;
    PORT = config.PORT || process.env.PORT;

    global.env = require('./utils/secureEnv.js').secureEnvironment(GENERATOR_ADDRESS, ENC_ENV_PATH);
    log.debug(global.env);

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.json());
    app.use("/createWallet", createWalletRouter);
    app.use("/restoreWallet", restoreWalletRouter);
    app.use("/checkWalletBalances", checkWalletBalancesRouter);
    app.use("/randomMnemonic", randomMnemonicRouter);
    app.use("/validateMnemonic", validateMnemonicRouter);

    app.listen(PORT, HOSTNAME, () => {
        log.info(`${MS_ID} running at ${HOSTNAME}:${PORT}`)
    })

} catch (e) {
    log.error(e)
}
