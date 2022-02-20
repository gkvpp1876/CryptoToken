1. npm i -g truffle //to setup truffle framework globally in local
2. truffle init
3. touch contracts/DappToken.sol --> Command to create files with truffle cli 
4. Defile the pragma version of the solidity in smart contracts to execute the program
5. truffle migration --> To start with the migration
6. truffle migration --reset --> if there is any issue with general migration command
7. DappToken.deployed().then(i => {token=i}) --> because of the asynch nature of smart contracts we heavily use Promises.
8. token.totalSupply().then(s => { totalSupply = s; }) --> Assigning the total supply of the tokens assigned in the smart contract
9. totalSupply.toNumber() --> to get the exact number
10. Whenever we do transation that is migration (running smart contracts) costs that is called GAS fee, its free if we're just reading the data
11. touch test/DappToken.js --> creating the testing scenario for the changes we've done as block chain is immutable we need to test aggressively, truffle used mocha chai for unit testing