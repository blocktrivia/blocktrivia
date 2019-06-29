const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()

process.env.NODE_ENV = process.env.NODE_ENV || "development";

var endpoint, contract_address;

if(process.env.NODE_ENV == "production") {
    endpoint = process.env.INFURA_MAINNET_ENDPOINT;
    contract_address = process.env.CONTRACT_MAINNET_ADDRESS;
} else {
    endpoint = process.env.INFURA_ROPSTEN_ENDPOINT;
    contract_address = process.env.CONTRACT_ROPSTEN_ADDRESS;
}

const web3 = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, endpoint));
const contractJSON = require('../../build/contracts/BlockTriviaToken.json');

var contract = new web3.eth.Contract(contractJSON.abi, contract_address, {
    defaultAccount: process.env.DEFAULT_ADDRESS, // default from address
    defaultGasPrice: '1000000000' // default gas price in wei, 1 gwei in this case
});

module.exports = { web3, contract };