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
        //Require that value is equal to tokens, restricting the transaction not to allow lower than the numberOfTokens and the price of the ether(i.e interms of wei)
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        //Require that the contract has enough tokens, Checking the balance of the contract before buyer execution as the tokens for sale are associated with the contract
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens); //this points to the current smart contract
        //Require that a transfer is successful, Now initiating the transfer of tokens and validating
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        //Keep track of tokenSold
        tokensSold += _numberOfTokens;
        //Trigger sell Event
        emit Sell(msg.sender, _numberOfTokens);
    }

    //Ending Token DappTokenSale
    function endSale() public {
        //Require only admin to do end the sale
        require(msg.sender == admin);
        //Transfer the remaining amount tokens of sale back to Admin
        require(
            tokenContract.transfer(
                admin,
                tokenContract.balanceOf(address(this))
            )
        );

        //Update: from the git repo: Let's not destroy the contract here
        //Destroy the Contract
        // selfdestruct(payable(admin));
        payable(admin).transfer(address(this).balance);
    }
}
