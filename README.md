# core

This repository is part of bbrujas' [WAGMI](https://github.com/bbrujas).

- Main project [page](https://github.com/bbrujas).

- Repository URL: [https://github.com/bbrujas/tcms](https://github.com/bbrujas/core)

## TODO

**backlog** for *core* lives [here](./TODO.md).

## changelog

**changelog** can be found [here](./CHANGELOG.md).

## Introduction

This repository defines a very simple MS coded in NodeJS.

The current branch **feature/wallet**, code-name *code-wallet*, is a loosy implementation of a Deterministic Wallet manager, that could help, for instance, to randomly generate BIP39 compliant addresses, or to check for the validity of an existing menmonic.

> @dev: you can look for more details about what the original **wallet** does [here](https://github.com/0xtheblackbay/wallet).

*core-wallet* services the following resources:

- **/createWallet**: Returns the NUMBER_OF ACCOUNTS that the **mnemonic** passed as parameter could generate. Returns *Invalid seed provided.* in case of incorrect values.

- **/checkWalletBalances**: Returns the NUMBER_OF ACCOUNTS, with BALANCES, that the **mnemonic** passed as parameter could generate. Returns *Invalid seed provided.* in case of incorrect values.

- **/randomMnemonic**: Returns a BIP compliant mnemonic with the Entropy configured at MS startup.

- **/restoreWallet**: Returns the NUMBER_OF ACCOUNTS that the **mnemonic** stored in the ENV file could generate. Returns *Invalid seed provided.* if unable to open the SEED phrase or it is empty.

- **/validateMnemonic**: Checks if the **mnemonic** passed as parameter is BIP39 compliant.

## interacting with *core-wallet*

### terminal

- Create a new wallet:

```sh
tbb@tbb:~/git/tbb/core> curl --location 'http://127.0.0.1:8080/createWallet' \
> --header 'Content-Type: application/x-www-form-urlencoded' \
> --data-urlencode 'mySeed=jump toilet torch toddler clog fish nation pool talent episode extra tag'

{"seed":"jump toilet torch toddler clog fish nation pool talent episode extra tag","accounts":[{"id":0,"address":"0x1F5e96A5DEC4bF4D95Dd126066DB02651EC8E512","privateKey":"0xf219a1922eea9c7161874a266c47dfb0a288dc4be6ba9ee2f3f61284d83009e3"},{"id":1,"address":"0xFe26f8a16D8DfAD637e210191b7e1f9B7fb3c3B3","privateKey":"0x37807c54d9aebb141a4550dbe267e187be7874ab3dbba227b3a27ac5372959ac"},{"id":2,"address":"0xE80BB554955517A5dEA106A27AA4E50D2006bE6B","privateKey":"0x778c7e29057e8f5be2333ff8a09153dcbdf012ee40d52f96c5f8711d3363b07f"}]}

tbb@tbb:~/git/tbb/core> 
```

- Restore saved Wallet:

```sh
tbb@tbb:~/git/tbb/core> curl --location 'http://127.0.0.1:8080/restoreWallet'

{"seed":"derive salt valve record strategy rigid develop category crack pink ribbon suit","accounts":[{"id":0,"address":"0x405EF6786A70C131bf17DFfE7955389D977C8853","privateKey":"0xdf59e06dcf2b9ea74d861e31e1886030765969d1dab454a53152882153ad6244"},{"id":1,"address":"0x3953aFbC59cF8C279b603454529C3DF27E01C57C","privateKey":"0x17084e1502b4f3cff5839815af859fc86cbb843fa47b0e9aa7591f7cc14d6805"},{"id":2,"address":"0xc4F6d4395D2EE5bAAd030945f9596B66dc058e8B","privateKey":"0x48887513fb464017332fe539cfd68efa1bea524f74914a4ccc9ad42f94d1b2ad"}]}

tbb@tbb:~/git/tbb/core> 
```
- Explore balances of a wallet:

```sh
curl --location 'http://127.0.0.1:8080/checkWalletBalances' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'mySeed=field jeans pulse motor gold else rally time argue muffin vote crew'
{"seed":"jump toilet torch toddler clog fish nation pool talent episode extra tag","accounts":[{"id":0,"address":"0x1F5e96A5DEC4bF4D95Dd126066DB02651EC8E512","privateKey":"0xf219a1922eea9c7161874a266c47dfb0a288dc4be6ba9ee2f3f61284d83009e3","balance":"0"},{"id":1,"address":"0xFe26f8a16D8DfAD637e210191b7e1f9B7fb3c3B3","privateKey":"0x37807c54d9aebb141a4550dbe267e187be7874ab3dbba227b3a27ac5372959ac","balance":"0"},{"id":2,"address":"0xE80BB554955517A5dEA106A27AA4E50D2006bE6B","privateKey":"0x778c7e29057e8f5be2333ff8a09153dcbdf012ee40d52f96c5f8711d3363b07f","balance":"0"}]}
```

- Generate a random Mnemonic:

```sh
tbb@tbb:~/git/tbb/core> curl --location 'http://127.0.0.1:8080/randomMnemonic'

process book volcano flash cost film eagle diesel soldier exile talent audit

tbb@tbb:~/git/tbb/core> 
```

- Verify a Mnemonic:

```sh
tbb@tbb:~/git/tbb/core> curl --location 'http://127.0.0.1:8080/validateMnemonic' \
> --header 'Content-Type: application/x-www-form-urlencoded' \
> --data-urlencode 'mySeed=field jeans pulse motor gold else rally time argue muffin vote crew'

true

tbb@tbb:~/git/tbb/core>
```

### postman

There is a [postman collection](./core-wallet.postman_collection.json) available so that you can test using a graphical interface.

## relevant details

The MS relies on two different files:

- config file (`.config`): a TOML-like file with configuration details.
- encrypted environment file (`.env.enc`): a TOML-like file with **sensible** information that requires more care when handling. Read more about it [here](#secure-your-environment).

### config file

Default details for config file are as follows:

```toml
HOSTNAME="127.0.0.1"
SERVICE_PORT=8080
NUMBER_OF_ACCOUNTS=3
TWELVE_WORDS=16
TWENTYFOUR_WORDS=32
HTTP_PROVIDER_URL="https://api.etherscan.io/api/"
```

where:

- **HOSTNAME** will define the IP address (or hostname if you enable any form of naming resolution) your MS will be publised at.

- **PORT** will specify which port your MS will be listening to.

- **NUMBER_OF_ACCOUNTS** is the default amount of EOA's that the MS will work with.

- **TWELVE_WORDS** & **TWENTYFOUR_WORDS** are the specific values to set to the ENTROPY at the MS startup to process 12 or 24 words mnemonics respectively.

- **HTTP_PROVIDER_URL** is he URL to your preferred HTTP RPC Provider details.

### environment file

For the *core-wallet* implementation, the `.env` file to encrypt requires a SEED="string" and an API_KEY values as per provided in the sample `env` file:

```toml
SEED="your_phrase_goes_here"
ETHERSCAN_API_KEY="your_etherscan_api_key_goes_here"
```

> @Dev: Please refer to [secure your environment](#secure-your-environment) to get more details on how to implement this.

### Dependencies

```json
  "dependencies": {
    "axios": "^1.3.4",
    "express": "^4.18.2",
    "fs-extra": "^10.1.0",
    "log4js": "^6.4.1",
    "npm-run": "^5.0.1",
    "path": "^0.12.7",
    "secure-env": "1.2.0",
    "toml": "^3.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
```

## HowToRunThis

This MS can be run as follows:

- Download and synchronise the repo:

```sh
git clone git@github.com:bbrujas/core.git
```

- Enter the root folder of the cloned repo:

```sh
cd core
```

- Should see the following structure:

```sh
tree -a ./
./
├── routes
│   ├── checkWalletBalances.js
│   ├── createWallet.js
│   ├── randomMnemonic.js
│   ├── restoreWallet.js
│   └── validateMnemonic.js
├── utils
│   ├── configEnv.js
│   ├── create-script.js
│   ├── deterministic.js
│   ├── onchain.js
│   ├── restore-script.js
│   └── secureEnv.js
├── .config
├── CHANGELOG.md
├── core-wallet.postman_collection.json
├── env
├── LICENSE
├── package.json
├── README.md
├── server.js
└── TODO.md
```

> @reader: if you cloned the repo, then you should also see git related artifacts, like *.git* folder and *.gitignore* file. 

- Switch to branch *core-wallet* with `git checkout feature/wallet`:
```sh
tbb@tbb:~/git/tbb/core> git checkout feature/wallet
Switched to branch 'feature/wallet'
Your branch is up to date with 'origin/feature/wallet'.
tbb@tbb:~/git/tbb/core> 
```

- Install *core*:
> @dev: additionally, for prod deploys, you can specify `--omit dev` to the installation command to avoid adding unnecessary development dependencies.

```sh
npm i
```

- Once *core* is installed, you should be able to run the code by executing `npm run start YOUR_PASSWORD` from the root folder of the cloned repository.

> @dev:: To run a securized env please follow [secure your env](#secure-your-environment) practices and add YOUR_PASSWORD to the execution sentence:

```sh
tbb@tbb:~/git/tbb/core> npm run start YOUR_PASSWORD

> core@1.0.0 start
> node server.js YOUR_PASSWORD

[2023-07-15T00:53:23.680] [INFO] core-startup - listening on 127.0.0.1:8080...
```

> @dev: You can also run it in *debug mode* with **nodemon** by executing:

```sh
npm run dev YOUR_PASSWORD
tbb@tbb:~/git/tbb/core> npm run dev YOUR_PASSWORD

> core-wallet@1.0.0 dev
> nodemon server.js YOUR_PASSWORD

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js YOUR_PASSWORD`
[2023-07-15T00:57:01.692] [INFO] core-startup - listening on 127.0.0.1:8080...
```

### secure your environment  

The current project relies on a environment file to access `sensible data` like APY KEYS .

Hence it is advised to develop following some good practises like **distinguishing between prod and deveopment KEYS**.

As an additional measure, the code provided in this example runs using an encrypted capable version of the well-known `dot-env` implementation to encrypt your `.env` file and increase security. Read more about it [here](https://github.com/kunalpanchal/secure-env).

In order to encrypt your .env file (you can use the env file provided as template), proceed as follow: 

1. ensure you have installed the project dependencies as per [How to run this](#howto-run-this).  

2. copy `env` as `.env` and complete the required fields.  

3. execute `npm run generate-env YOUR_PASSWORD`. 

```sh  
npm run generate-env YOUR_PASSWORD

> core@1.0.0 generate-env  
> secure-env .env -s YOUR_PASSWORD  

Secure-env :  INFO The Environment file ".env" has been encrypted to ".env.enc".  
Secure-env :  WARNING Make sure to delete ".env" for production use.  
```  

4. Remember to **delete** your original .env file when deploying on PRODUCTION environments. :)  

## Other resources

- [Building NodeJS microservices](https://blog.logrocket.com/building-microservices-node-js/).

- [Microservices Architectures](https://codeforgeek.com/microservices-nodejs/).

- [NodeJS Routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes).

- [secure-env](https://github.com/kunalpanchal/secure-env).

- [BIP39 Mnemonics](https://learnmeabitcoin.com/technical/mnemonic).

- [BIP39 in NodeJS](https://www.npmjs.com/package/bip39).

- [BIP39 mnemonic clashes](https://bitcoin.stackexchange.com/questions/102399/what-are-the-chances-of-hitting-valid-mnemonic-phrase-out-of-bip39-if-someone-p)

# END