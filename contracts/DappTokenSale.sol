// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;
import "./DappToken.sol";

contract DappTokenSale {
    address admin; //state variable data is going to write on the blockchain, variable is not required to be exposed so we haven't defined public
    DappToken public tokenContract; //creating variable with DappToken
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(DappToken _tokenContract, uint256 _tokenPrice) {
        //Assign an admin
        admin = msg.sender;
        //Token Contract
        tokenContract = _tokenContract;
        //Token Price
        tokenPrice = _tokenPrice;
    }

    //multiply function, internal -- is only accessable to the current contract instance or current address and the contracts derived from the currecnt contract
    //pure return a value that is calculated based on given parameters and global memory, but cannot affect the value of any other global variable
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    //Buy Tokens
    function buyTokens(uint256 _numberOfTokens) public payable {
        //Require that value is equal to tokens
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        //Require that the contract has enough toekns

        //Require that a transfer is successful
        //Keep track of tokenSold
        tokensSold += _numberOfTokens;
        //Trigger sell Event
        emit Sell(msg.sender, _numberOfTokens);
    }
}
