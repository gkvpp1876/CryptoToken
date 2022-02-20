var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function (accounts) {
    var tokenInstance;

    it('initialize the contract with the correct values', function () {
        return DappToken.deployed().then(function (instance) { //initializing the contract
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function (name) { //validating the memory variable name available in the contract
            assert.equal(name, 'Dapp Token', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function (symbol) { //validating the memory variable symbol available in the contract
            assert.equal(symbol, 'DAPP', 'has the correct symbol');
            return tokenInstance.standard();
        }).then(function (standard) { //validating the memory variable standard available in the contract
            assert.equal(standard, 'Dapp Token v1.0', 'has the correct standard');
        });
    });

    it('sets the total supply upon deployment', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total suply to 1,000,000')
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function (adminBalance) { //writing test to find the balance of the address
            assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin account')
        });
    });

    it('Transfers token ownership', function () {
        return DappToken.deployed().then(function (instance) { //Deploy and get the instance of the contract
            tokenInstance = instance;
            //Test require statement first by transferring something larger than the sender's balance
            return tokenInstance.transfer.call(accounts[1], 999999999999999); //calling transfer function and trying to transfer larger amount then possible for the user, also transaction will not be trigger as it fails with call
        }).then(assert.fail).catch(function (error) { //asserting the failure scenario in case of large value transfer
            assert(error.message.indexOf('revert') >= 0, 'error message must cotain revert')
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] }); //Transaction gets happened and receipt will be generated
        }).then(function(success){
            assert.equal(success, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] }); //Transaction gets happened and receipt will be generated
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
        });
    });
})