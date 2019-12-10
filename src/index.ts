import { Wallet, providers, Contract, utils } from "ethers";
import { HintoTips } from "../typechain-build/HintoTips";

import { HintoTipsAbi } from "./utils/hintoTipsAbi";
import { AbiCoder, BigNumber } from "ethers/utils";
import { Tip } from "./types";

export class HintoSdk {
  private wallet?: Wallet;
  private contractInstance: HintoTips;

  constructor(
    readonly providerUrl: string,
    readonly contractAddress: string,
    readonly privateKey?: string
  ) {
    if (privateKey) {
      this.wallet = new Wallet(
        privateKey,
        new providers.JsonRpcProvider(providerUrl)
      );
      this.contractInstance = new Contract(
        contractAddress,
        HintoTipsAbi,
        this.wallet
      ) as HintoTips;
      return;
    }

    this.contractInstance = new Contract(
      contractAddress,
      HintoTipsAbi,
      new providers.JsonRpcProvider(providerUrl)
    ) as HintoTips;
  }

  async approvePublisher(publisher: string) {
    if (!this.wallet) {
      throw new Error(
        "This method is avaliable only if the private key has been given in the constructor"
      );
    }
    try {
      const tx = await this.contractInstance.approvePublisher(publisher);
      await tx.wait();
    } catch (err) {
      throw err;
    }
  }

  async publishTip(
    tipCode: string,
    tipMetadataHash: string,
    recipients: string[]
  ): Promise<number> {
    if (!this.wallet) {
      throw new Error(
        "This method is avaliable only if the private key has been given in the constructor"
      );
    }

    const tx = await this.contractInstance.publishTip(
      utils.formatBytes32String(tipCode),
      tipMetadataHash,
      recipients.map(e => {
        return utils.formatBytes32String(e);
      })
    );

    const txReceipt = await tx.wait();

    if (txReceipt.logs) {
      const abiDecoded: [string, string, BigNumber] = new AbiCoder().decode(
        ["address", "bytes32", "uint"],
        txReceipt.logs[0].data
      );

      return abiDecoded[2].toNumber();
    }

    throw new Error("Could not publish tip");
  }

  async getTipData(tipId: number): Promise<Tip> {
    try {
      const tipData = await this.contractInstance.getTip(tipId);

      return {
        publisher: tipData[0],
        tipCode: tipData[1],
        tipMetadataHash: tipData[2],
        recipients: tipData[3],
        isValid: tipData[4]
      };
    } catch (err) {
      throw err;
    }
  }

  async getTipsCount(): Promise<number> {
    const tipsCount = await this.contractInstance.getTipsCount();
    return tipsCount.toNumber();
  }
}
