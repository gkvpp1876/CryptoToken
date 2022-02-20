// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//Smart contracts helps in doing the transaction (CRUD operation) on block chain

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
