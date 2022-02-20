pragma solidity ^0.8.2;

contract DappToken {
    //Constructor to initialize when smart contract is deployed
    //Set the total number of tokens
    //Read the total number of tokens
    string public name = "Dapp Token";
    string public symbol = "DAPP";
    string public standard = "Dapp Token v1.0";
    uint256 public totalSupply; //state variable accessible to class/contract, solidity provides getter function if variable is set to public

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf; //mapping is a new structure in contract holds key value store, key is address here and value is balanceOf with reference to ERC 20 standard instead of calling direct balanceOf we can use public variable (i.e mapping in this case) to access the balanceOf

    constructor(uint256 _initialSupply) public {
        //public is visibility of the method/constructor
        balanceOf[msg.sender] = _initialSupply; //getting data from ganache addresses as of now in local, msg is a global variable in solidity that had several value we can get from it, in this case we're trying to get the balance using sender
        //more details on global variables in https://docs.soliditylang.org/en/v0.4.21/units-and-global-variables.html
        totalSupply = _initialSupply; //total number comes from the ERC standard
        //https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md

        //
    }

    //Token transfer function
    function transfer(address _to, uint256 _value) public returns (bool success)
    {
        //Exception if the account doesn't have enough amount of token
        require(balanceOf[msg.sender] >= _value); //transaction gets reverted no GAS fee will be charged

        //transfer balance
        //debiting balance from sender
        balanceOf[msg.sender] -= _value;
        //crediting balance from receiver
        balanceOf[_to] += _value;
        
        //Transfer Event
        emit Transfer(msg.sender, _to, _value);

        //Return boolean
        return true;
    }
}
