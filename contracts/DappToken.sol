pragma solidity ^0.8.2;

contract DappToken {
    //Constructor to initialize when smart contract is deployed
    //Set the total number of tokens
    //Read the total number of tokens
    uint256 public totalSupply; //state variable accisible to class/contract, solidity provides getter function if variable is set to public

    constructor() public { //public is visibility of the method/constructor
        totalSupply = 1000000; //total number comes from the ERC standard
        //https//:github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
    }
}
