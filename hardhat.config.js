/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { task } = require("hardhat/config");

const {API_URL_SEPOLIA, API_URL_BSCTEST, API_URL_MAINNET, API_URL_BSC} = process.env;

task("account", "returns nonce and balace for specified address on multiple networks")
.addParam("address")
.setAction(async address => {

  const web3Sepolia = createAlchemyWeb3(API_URL_SEPOLIA);
  const web3BSCTestnet = createAlchemyWeb3(API_URL_BSCTEST);
  const web3MainNet = createAlchemyWeb3(API_URL_MAINNET);
  const web3BSC = createAlchemyWeb3(API_URL_BSC);

  const networkIDArr = ["Ethereum Sepolia:", "BSC  Testnet:", "ETH Mainnet:", "BSC Mainnet:"]
  const providerArr = [web3Sepolia, web3BSCTestnet, web3MainNet, web3BSC];
  const resultArr = [];

  for (let i = 0; i < providerArr.length; i++) {
    const nonce = await providerArr[i].eth.getTransactionCount(address.address, "latest");
    const balance = await providerArr[i].eth.getBalance(address.address)
    resultArr.push([networkIDArr[i], nonce, parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(2) + "ETH"]);
  }
  resultArr.unshift(["  |NETWORK|   |NONCE|   |BALANCE|  "])
  console.log(resultArr);
})



module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL_SEPOLIA,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    bsctest: {
      url: API_URL_BSCTEST,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    bsc: {
      url: API_URL_BSC,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    mainnet: {
      url: API_URL_MAINNET,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
