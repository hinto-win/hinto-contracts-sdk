"use strict";

const expect = require("chai").expect;
const HintoSdk = require("../dist").HintoSdk;

const { utils } = require("ethers");

const { SHA256, enc } = require("crypto-js");

describe("Hinto test", () => {
  const providerUrl = "http://localhost:8545";
  const contractAddress = "0x5d4DF3886BC0064cb5aF64f8F7cd49E4349CafBf";
  const privateKey =
    "0xb38832ea78f6a78a37b6c7defffc40144de5d28d03f3f2892758791ec94241fe";

  const hintoSdk = new HintoSdk(providerUrl, contractAddress, privateKey);

  it("should approve a publisher", async () => {
    await hintoSdk.approvePublisher(hintoSdk.wallet.address);
  });

  let tipID;

  it("should deploy a tip", async () => {
    tipID = await hintoSdk.publishTip(
      "MIL-JUV",
      "0x" + SHA256("0987").toString(enc.Hex),
      ["VIP"]
    );
  });

  it("should get the number of tips", async () => {
    const tipsCount = await hintoSdk.getTipsCount();
  });

  it("should get a tip", async () => {
    const tip = await hintoSdk.getTipData(tipID);
  });
});
