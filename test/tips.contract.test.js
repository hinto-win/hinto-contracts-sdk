"use strict";

const { HintoSdk } = require("../dist");

const { SHA256, enc } = require("crypto-js");

describe("Hinto test", () => {
  const providerUrl = "";
  const contractAddress = "";
  const privateKey = "";

  const hintoSdk = new HintoSdk(providerUrl, contractAddress, privateKey);

  let tipID;

  it("should deploy a tip", async () => {
    const tip = await hintoSdk.publishTip(
      "MIL-JUV",
      "0x" + SHA256("0987").toString(enc.Hex),
      ["VIP"]
    );
    tipID = tip.tipId;
    const publishmentTxHash = tip.txHash;
    console.log(tip);
  });

  it("should get the number of tips", async () => {
    const tipsCount = await hintoSdk.getTipsCount();
  });

  it("should get a tip", async () => {
    const tip = await hintoSdk.getTipData(tipID);
  });
});
