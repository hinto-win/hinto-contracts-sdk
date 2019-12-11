"use strict";

const expect = require("chai").expect;
const HintoSdk = require("../dist").HintoSdk;

const { SHA256, enc } = require("crypto-js");

describe("Hinto test", () => {
  const providerUrl = "";
  const contractAddress = "";
  const privateKey = "";

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
