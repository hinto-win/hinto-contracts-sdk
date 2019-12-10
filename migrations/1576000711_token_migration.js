const HintoToken = artifacts.require("HintoToken");

module.exports = function(deployer) {
  deployer.deploy(HintoToken, "Hinto", "HNT", 5, 1000000);
};
