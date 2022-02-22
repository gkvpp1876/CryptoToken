// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;
import "./DappToken.sol";

contract DappTokenSale {
    address admin; //state variable data is going to write on the blockchain, variable is not required to be exposed so we haven't defined public
    DappToken public tokenContract; //creating variable with DappToken
    uint256 public tokenPrice;

    constructor(DappToken _tokenContract, uint256 _tokenPrice) {
        //Assign an admin
        admin = msg.sender;
        //Token Contract
        tokenContract = _tokenContract;
        //Token Price
        tokenPrice = _tokenPrice;
    }
}
