"use strict";

const { HintoMultisigSdk } = require("../dist");

const { readFileSync } = require("fs");

const { utils } = require("ethers");

const privateKeys = readFileSync(".privateKeys", { encoding: "utf8" }).split(
  "\n"
);

const infuraApiKey = readFileSync(".infura", { encoding: "utf8" });

describe("Hinto multisig wallet test", () => {
  const firstPrivateKey = privateKeys[0];
  const secondPrivateKey = privateKeys[1];
  const providerUrl = "https://ropsten.infura.io/v3/" + infuraApiKey;

  let multisigAddress;
  let firstOwnerSdk;

  it("should deploy a new multisig contract", async () => {
    firstOwnerSdk = await HintoMultisigSdk.deployMultisig(
      providerUrl,
      firstPrivateKey,
      [
        utils.computeAddress(firstPrivateKey),
        utils.computeAddress(secondPrivateKey)
      ],
      2
    );
  });

  it("should get the multisig owners", async () => {
    await firstOwnerSdk.getOwners();
  });

  it("should get the multisig address", async () => {
    multisigAddress = await firstOwnerSdk.getMultisigAddress();
  });

  it("should encode a transaction", async () => {
    await firstOwnerSdk.encodeTipsContractDeployment();
  });

  it("should compute a contract address to be deployed", async () => {
    const address = await firstOwnerSdk.computeContractAddressToBeDeployed();
  });

  let txId;
  it("should submit a new transaction", async () => {
    const address = await firstOwnerSdk.computeContractAddressToBeDeployed();
    const encoded = await firstOwnerSdk.encodeTipsContractDeployment();

    txId = await firstOwnerSdk.submitTransaction(address, 0, encoded);
  });

  it("shoud confirm the transaction by the second owner", async () => {
    const secondOwnerSdk = new HintoMultisigSdk(
      providerUrl,
      multisigAddress,
      secondPrivateKey
    );

    const tx = await secondOwnerSdk.confirmTransaction(txId);
  });
});
