//2_deploy_contracts.js filename starting with 2 is given to follow the execution of the order
const DappToken = artifacts.require("./DappToken.sol"); //takes the file contracts/DappToken.sol
const DappTokenSale = artifacts.require("./DappTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(DappToken, 1000000).then(function(){
    var tokenPrice = 1000000000000000; // 0.001 ether taking Wei equivalent value
    return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
  });
};

//Similar to the data migration we do on SQL we run some CRUD operation scripts for migration as we need to changes the data from one form to another
//Migration scripts helps in translating the data on block chain
