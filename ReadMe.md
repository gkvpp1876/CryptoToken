Truffle and project Setup:
1. npm i -g truffle //to setup truffle framework globally in local
2. truffle init
3. touch contracts/DappToken.sol --> Command to create files with truffle cli 
4. Define the pragma version of the solidity in smart contracts to execute the program
5. truffle migration --> To start with the migration
6. truffle migration --reset --> if there is any issue with general migration command
7. DappToken.deployed().then(i => {token=i}) --> because of the asynch nature of smart contracts we heavily use Promises. Deploying the contract to and accessing the instance of the contract
8. token.totalSupply().then(s => { totalSupply = s; }) --> Assigning the total supply of the tokens assigned in the smart contract
9. totalSupply.toNumber() --> to get the exact number
10. Whenever we do transation that is migration (running smart contracts) costs that is called GAS fee, its free if we're just reading the data
11. touch test/DappToken.js --> creating the testing scenario for the changes we've done as block chain is immutable we need to test aggressively, truffle used mocha chai for unit testing
12. truffle console -> web3.eth.getAccounts() --> web3 is a library which allows us to interact with our smart contracts and block chain


Migration Scripts:
1. truffle migration --> To start with the migration
2. truffle migration --reset --> if there is any issue with general migration command

CLI Command to create scaffolding:
1. touch contracts/DappToken.sol --> Creates solidity file for smart contracts
2. touch migrations/2_deploy_contracts.js --> Creates migration js file for smart contracts
3. touch test/DappToken.js --> Creates unit testing file

Dev Notes:
_ is used for the local variable

Truffle: Testing Framework and asset pipeline for blockchain using EVM

Web3:
1. web3.eth.getAccounts()
2. web3.eth.getAccounts().then(e => { FA = e[0]; })


Example transaction:
Command: 
    tokenInstance.transfer(receiver, 1, { from: FA })    
Result: 
{
  tx: '0x9f2ffd1bb46015700d4bc99b9353bb6b6d63340a12af1b289beda8d62c16d6a0',
  receipt: {
    transactionHash: '0x9f2ffd1bb46015700d4bc99b9353bb6b6d63340a12af1b289beda8d62c16d6a0',
    transactionIndex: 0,
    blockHash: '0xa1f1f55ff7437f3fb9a58377a06013694a5a1a40840f492df2625c37856c13c6',
    blockNumber: 438,
    from: '0x9ad673238221e8014e1bf2e05fdc33cb8db76416',
    to: '0x52402979c5c9e07e46535e20471520aa46bbf36c',
    gasUsed: 52550,
    cumulativeGasUsed: 52550,
    contractAddress: null,
    logs: [ [Object] ],
    status: true,
    logsBloom: '0x00000000000000000000000000000000200000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000004000000000000000000000000000002000000000000000000000000000000000000000020000000022000000000000000000001000000000000002000000000000000000000000000000000',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      logIndex: 0,
      transactionIndex: 0,
      transactionHash: '0x9f2ffd1bb46015700d4bc99b9353bb6b6d63340a12af1b289beda8d62c16d6a0',
      blockHash: '0xa1f1f55ff7437f3fb9a58377a06013694a5a1a40840f492df2625c37856c13c6',
      blockNumber: 438,
      address: '0x52402979C5C9e07e46535E20471520AA46BBF36C',
      type: 'mined',
      id: 'log_40b28478',
      event: 'Transfer',
      args: [Result]
    }
  ]
}