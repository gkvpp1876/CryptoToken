//imports
var DappTokenSale = artifacts.require('./DappTokenSale.sol');

contract('DappTokenSale', function (accounts) {
    var tokenSaleInstance;
    var tokenPrice = 1000000000000000; //1 Wei smallest unit of ether!
    
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
            assert.equal(price, tokenPrice, 'token price is correct');
        });
    });
});