//imports
var DappTokenSale = artifacts.require('./DappTokenSale.sol');

contract('DappTokenSale', function (accounts) {
    var tokenSaleInstance;
    var buyer = accounts[1];
    var tokenPrice = 1000000000000000; //1 Wei smallest unit of ether!
    // var tokenPrice = 10000000000000000
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
        return DappTokenSale.deployed().then(function (instance) {
            tokenSaleInstance = instance;
            numberOfTokens = 10;
            // var value = numberOfTokens * tokenPrice;
            //to buy token we need number of tokens, value of the tokens, and the buyer
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice })
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
            assert.equal(receipt.logs[0]._args._buyer, buyer, 'logs the account that purchased the tokens');
            assert.equal(receipt.logs[0]._args._amount, numberOfTokens, 'logs the number of tokens purchased');
            //getting the tokens sold
            return tokenSaleInstance.tokensSold();
        }).then(function (amount) {
            assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
            //Try to buy the tokens different from the ether value
            console.log("buyer data ",buyer);
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
        }).then(assert.fail).catch(function (error) {
            // console.log(numberOfTokens * tokenPrice, error.message)
            // assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');

        });
    });
});