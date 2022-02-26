//imports
var DappToken = artifacts.require('./DappToken.sol');
var DappTokenSale = artifacts.require('./DappTokenSale.sol');

contract('DappTokenSale', function (accounts) {
    var tokenSaleInstance; //DappTokenSale instance
    var tokenInstance; //DappToken instance
    var admin = accounts[0];
    var buyer = accounts[1];
    var tokenPrice = 1000000000000000; //1 Wei smallest unit of ether!
    var tokensAvailable = 750000;
    var numberOfTokens;

    it('intialize the contract with the correct values', function () {
        return DappTokenSale.deployed().then(function (instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address
        }).then(function (address) {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).then(function (address) {
            assert.notEqual(address, 0x0, 'has token contract address');
            return tokenSaleInstance.tokenPrice();
        }).then(function (price) { //token price is going to be 0.001 ether so stored Wei and validating with it
            assert.equal(price.toNumber(), tokenPrice, 'token price is correct');
        });
    });

    it('facilitates token buying', function () {
        return DappToken.deployed().then(function (instance) { //1st deploying the DappToken and to get the balanceOf of the account and do Transfer of balance
            tokenInstance = instance;
            return DappTokenSale.deployed(); //Deploying DappTokenSale after DappToken deployment for managing the transaction
        }).then(function (instance) { //taking the DappTokenSale instance 
            tokenSaleInstance = instance;
            //Provision 75% of all the tokens to the token sale, here sending from admin as we have initialized with 1 million tokens in DappToken and sending 75% (i.e 750000) to contract address (i.e DappTokenSale instance address)
            return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin });
        }).then(function (receipt) {
            numberOfTokens = 10;
            // var value = numberOfTokens * tokenPrice;
            //to buy token we need number of tokens, value of the tokens, and the buyer
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice })
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');
            //getting the tokens sold
            return tokenSaleInstance.tokensSold();
        }).then(function (amount) {
            assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
            return tokenInstance.balanceOf(buyer);
        }).then(function(amount){
            assert.equal(amount.toNumber(), numberOfTokens, 'balance of the buyer should have number of tokens ordered');
            return tokenInstance.balanceOf(tokenSaleInstance.address); //tokeSaleInstance address is contract address
        }).then(function (balance) {
            assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
            //Try to buy the tokens different from the ether value
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
            // console.log(buyer, numberOfTokens, tokenPrice);
            return tokenSaleInstance.buyTokens(800000, { from: buyer, value: numberOfTokens * tokenPrice });
        }).then(assert.fail).catch(function (error) {
            // console.log(error.message)
            assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');
        });
    });


});