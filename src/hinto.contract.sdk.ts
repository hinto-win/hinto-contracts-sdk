import { Wallet, providers, Contract, utils } from "ethers";
import { HintoTips } from "./typechain-build/HintoTips";

import HintoTipsAbi from "./utils/hinto-tips-abi.json";
import { parseBytes32String, Arrayish } from "ethers/utils";
import { Tip } from "./types";

export class HintoSdk {
  private wallet?: Wallet;
  private contractInstance: HintoTips;

  private unconfirmedTipsPublishmentCount = 0;

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
      JSON.stringify(HintoTipsAbi),
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
      const tx = await this.contractInstance.approvePublisher(publisher, {
        gasPrice: utils.bigNumberify(1000000000),
      });
      await tx.wait();
    } catch (err) {
      throw err;
    }
  }

  async publishTip(
    tipCode: string,
    tipMetadataHash: string,
    recipients: string[]
  ): Promise<{ tipId: number; txHash: string }> {
    if (!this.wallet) {
      throw new Error(
        "This method is avaliable only if the private key has been given in the constructor"
      );
    }

    try {
      const tipsCounter = await this.contractInstance.getTipsCount();

      let gasPrice = await this.wallet.provider.getGasPrice();

      if (gasPrice.lt(utils.bigNumberify(2000000000))) {
        gasPrice = utils.bigNumberify(2000000000);
      }

      const tx = await this.contractInstance.publishTip(
        utils.formatBytes32String(tipCode),
        tipMetadataHash,
        recipients.map((e) => {
          return utils.formatBytes32String(e);
        }),
        { gasPrice }
      );

      const receipt = await tx.wait();

      return {
        tipId: tipsCounter.toNumber() + this.unconfirmedTipsPublishmentCount++,
        txHash: receipt.transactionHash!,
      };
    } catch (err) {
      throw err;
    }
  }

  async encodeTransaction(
    functionName: string,
    args: string[]
  ): Promise<Arrayish> {
    try {
      return this.contractInstance.interface.functions[functionName].encode(
        args
      );
    } catch (e) {
      throw e;
    }
  }

  async getTipData(tipId: number): Promise<Tip> {
    try {
      const tipData = await this.contractInstance.getTip(tipId);

      const recipients = tipData[3].map((e) => {
        return parseBytes32String(e);
      });

      return {
        publisher: tipData[0],
        tipCode: parseBytes32String(tipData[1]),
        tipMetadataHash: tipData[2],
        isValid: tipData[4],
        recipients,
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
