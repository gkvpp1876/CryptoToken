const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};

//Similar to the data migration we do on SQL we run some CRUD operation scripts for migration as we need to changes the data from one form to another
//Migration scripts helps in translating the data on block chain
