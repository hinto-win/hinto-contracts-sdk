const HDWalletProvider = require("truffle-hdwallet-provider");

const fs = require("fs");
const infuraKey = "9defdc016d654060a6d372cbe5b2de0c";
const mnemonic = fs
  .readFileSync(".secret")
  .toString()
  .trim();

module.exports = {
  // Set default mocha options here, use special reporters etc.
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*" // Any network (default: none)
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/` + infuraKey
        ),
      network_id: 4, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
    }
  },
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.10",
      docker: false,
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  }
};
