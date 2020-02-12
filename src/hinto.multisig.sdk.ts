import { providers, utils, Contract, Wallet, Event, ethers } from "ethers";

import { MultiSigWallet } from "./typechain-build/MultiSigWallet";
import { MultiSigWalletFactory } from "./typechain-build/MultiSigWalletFactory";

import { HintoTipsFactory } from "./typechain-build/HintoTipsFactory";

import MultiSigABI from "./utils/multisig-abi.json";
import { Arrayish, BigNumberish } from "ethers/utils";
import { OnTransactionSubmissionConsumer } from "./types";

export class HintoMultisigSdk {
  private wallet?: Wallet;
  private contractInstance: MultiSigWallet;

  /**
   *
   * @param providerUrl - JSON RPC provider url
   * @param multisigAddress - multisig address
   * @param privateKey - multisig owner's private key
   */
  constructor(
    readonly providerUrl: string,
    readonly multisigAddress: string,
    readonly privateKey: string
  ) {
    if (privateKey) {
      this.wallet = new Wallet(
        privateKey,
        new providers.JsonRpcProvider(providerUrl)
      );
      this.contractInstance = new Contract(
        multisigAddress,
        MultiSigABI,
        this.wallet
      ) as MultiSigWallet;
      return;
    }

    this.contractInstance = new Contract(
      multisigAddress,
      JSON.stringify(MultiSigABI),
      new providers.JsonRpcProvider(providerUrl)
    ) as MultiSigWallet;
  }

  /**
   *
   * @param providerUrl - JSON RPC provider url
   * @param privateKey - deploying account's private key
   * @param owners - newly deployed multisig owners
   * @param confirmationsRequired - number of confirmations required by the multisig to execute a transaction
   * @returns SDK instance
   */
  static async deployMultisig(
    providerUrl: string,
    privateKey: string,
    owners: string[],
    confirmationsRequired: number
  ): Promise<HintoMultisigSdk> {
    try {
      const multisigInstance = await new MultiSigWalletFactory(
        new Wallet(privateKey, new providers.JsonRpcProvider(providerUrl))
      ).deploy(owners, confirmationsRequired);

      await multisigInstance.deployed();

      return new HintoMultisigSdk(
        providerUrl,
        multisigInstance.address,
        privateKey
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns address of the contract that's gonna be deployed
   */
  public async computeContractAddressToBeDeployed(): Promise<string> {
    const nonce = await this.wallet?.provider.getTransactionCount(
      this.multisigAddress
    );
    const address = utils.getContractAddress({
      from: this.wallet!.address,
      nonce: nonce!
    });
    return address;
  }

  /**
   * @returns encoded contract deployment
   */
  public async encodeTipsContractDeployment(): Promise<Arrayish> {
    const encoded = new HintoTipsFactory().getDeployTransaction().data;
    if (!encoded) {
      throw new Error("Tips contract deploy tx encoding failed");
    }

    return encoded;
  }

  /**
   *
   * @param owner - address of the owner who will be added
   * @returns encoded contract execution
   */
  public async encodeAddMultisigOwner(owner: string): Promise<Arrayish> {
    return this.contractInstance.interface.functions.addOwner.encode([owner]);
  }

  /**
   *
   * @param owner - address of the owner who will be removed
   * @returns encoded contract execution
   */
  public async encodeRemoveMultisigOwner(owner: string): Promise<Arrayish> {
    return this.contractInstance.interface.functions.removeOwner.encode([
      owner
    ]);
  }

  /**
   *
   * @param owner - address of the owner who will be replaced
   * @param newOwner - new owner's address
   * @returns encoded contract execution
   */
  public async encodeReplaceMultisigOwner(
    owner: string,
    newOwner: string
  ): Promise<Arrayish> {
    return this.contractInstance.interface.functions.replaceOwner.encode([
      owner,
      newOwner
    ]);
  }

  /**
   *
   * @param owner - ethereum address
   * @returns information regarding being the multisig owner or not
   */
  public async isOwner(owner: string): Promise<boolean> {
    return await this.contractInstance.isOwner(owner);
  }

  /**
   * @returns multisig owners
   */
  public async getOwners(): Promise<string[]> {
    return await this.contractInstance.getOwners();
  }

  /**
   * @returns confirmations required by the multisig to execute a transaction
   */
  public async getRequiredConfirmations(): Promise<number> {
    return (await this.contractInstance.required()).toNumber();
  }

  /**
   *
   * @param transactionId - multisig transaction id
   * @param owner - multisig owner
   * @returns information about the transaction confirmation
   */
  public async didConfirmTransaction(
    transactionId: number,
    owner: string
  ): Promise<boolean> {
    return await this.contractInstance.confirmations(transactionId, owner);
  }

  /**
   *
   * @param to - transaction recipient
   * @param value - transaction value in ether
   * @param data - transaction data
   * @returns transaction id
   */
  public async submitTransaction(
    to: string,
    value: number,
    data: string
  ): Promise<BigNumberish> {
    const tx = await this.contractInstance.submitTransaction(to, value, data);
    const txReceipt = await tx.wait();

    if (txReceipt.logs![0]) {
      const txId = txReceipt.logs![0].topics[1];
      return txId;
    }
    throw new Error("An error occured while submitting the tx");
  }

  /**
   *
   * @param transactionId - multisig transaction id
   * @returns txHash and events emmited by the forwarded transaction
   */
  public async confirmTransaction(
    transactionId: number
  ): Promise<{ txHash: string; events: Event[] } | undefined> {
    const tx = await this.contractInstance.confirmTransaction(transactionId);
    const txReceipt = await tx.wait();

    const events = txReceipt.events?.map(details => {
      return details.event;
    });

    if (events![1] !== "Execution") {
      return;
    }

    if (txReceipt.events && txReceipt.transactionHash) {
      return {
        txHash: txReceipt.transactionHash,
        events: txReceipt.events.slice(2)
      };
    }
    return;
  }

  /**
   *
   * @param transactionId - multisig transaction id
   * @returns list of addresses that confirmed the transaction
   */
  public async getTransactionConfirmations(
    transactionId: number
  ): Promise<string[]> {
    return await this.contractInstance.getConfirmations(transactionId);
  }

  /**
   * @returns multisig address
   */
  public getMultisigAddress(): string {
    return this.multisigAddress;
  }

  /**
   *
   * @param transactiondId - multisig transaction id
   * @returns transaction status
   */
  public async isTransactionConfirmed(
    transactiondId: number
  ): Promise<boolean> {
    return await this.contractInstance.isConfirmed(transactiondId);
  }

  /**
   *
   * @param consumer - function to be executed on event detection
   */
  public async onTransactionSubmission(
    consumer: OnTransactionSubmissionConsumer
  ) {
    this.contractInstance.on(
      this.contractInstance.interface.events.Submission.name,
      consumer
    );
  }
}
