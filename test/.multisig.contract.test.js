"use strict";

const { HintoMultisigSdk } = require("../dist");

const { readFileSync } = require("fs");

const { utils, providers } = require("ethers");

const infuraApiKey = readFileSync(".infura", { encoding: "utf8" });

describe("Hinto multisig wallet test", () => {
  const providerUrl = "https://mainnet.infura.io/v3/" + infuraApiKey;

  let multisigAddress = "0x1EFB227387CdC00CC2e77319b850c2caddF90C06";
  let multisigSdk = new HintoMultisigSdk(
    new providers.JsonRpcProvider(providerUrl),
    multisigAddress
  );

  it("should encode a transaction", async () => {
    const data = await multisigSdk.encodeTipsContractDeployment();
    console.log(data);
  });

  it("should compute a contract address to be deployed", async () => {
    const address = await multisigSdk.computeContractAddressToBeDeployed(
      "0xf37Fd9185Bb5657D7E57DDEA268Fe56C2458F675"
    );
    console.log(address);
  });
});
