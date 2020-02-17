import {
  providers,
  utils,
  Contract,
  Wallet,
  Event,
  ethers,
  Signer
} from "ethers";

import { MultiSigWallet } from "./typechain-build/MultiSigWallet";
import { MultiSigWalletFactory } from "./typechain-build/MultiSigWalletFactory";

import { HintoTipsFactory } from "./typechain-build/HintoTipsFactory";

import MultiSigABI from "./utils/multisig-abi.json";
import { Arrayish, BigNumberish } from "ethers/utils";
import {
  OnTransactionSubmissionConsumer,
  OnOwnerAdditionConsumer,
  OnOwnerRemovalConsumer
} from "./types";
import { Provider } from "ethers/providers";

export class HintoMultisigSdk {
  private contractInstance: MultiSigWallet;

  /**
   *
   * @param walletOrProvider - ethers Wallet or Provider instance
   * @param multisigAddress - multisig address
   */
  constructor(
    private readonly signerOrProvider: Provider | Signer,
    readonly multisigAddress: string
  ) {
    if (signerOrProvider instanceof Signer) {
      this.contractInstance = new Contract(
        multisigAddress,
        MultiSigABI,
        this.signerOrProvider
      ) as MultiSigWallet;
      return;
    }

    this.contractInstance = new Contract(
      multisigAddress,
      JSON.stringify(MultiSigABI),
      signerOrProvider
    ) as MultiSigWallet;
  }

  /**
   *
   * @param providerUrl - JSON RPC provider url
   * @param privateKey - multisig owner's private key
   * @param multisigAddress - multisig address
   */
  static initializeWithPrivateKeyAndProviderUrl(
    providerUrl: string,
    privateKey: string,
    multisigAddress: string
  ): HintoMultisigSdk {
    const wallet = new Wallet(
      privateKey,
      new providers.JsonRpcProvider(providerUrl)
    );
    return new HintoMultisigSdk(wallet, multisigAddress);
  }

  /**
   * @param providerUrl - JSON RPC provider url
   * @param multisigAddress - multisig address
   */
  static initializeWithProviderUrl(
    providerUrl: string,
    multisigAddress: string
  ): HintoMultisigSdk {
    const provider = new providers.JsonRpcProvider(providerUrl);
    return new HintoMultisigSdk(provider, multisigAddress);
  }

  /**
   * @param provider - Injected web3 provider
   * @param multisigAddress - multisig address
   */
  static initializeWithInjectedWeb3(
    provider: providers.Web3Provider,
    multisigAddress: string
  ): HintoMultisigSdk {
    return new HintoMultisigSdk(provider.getSigner(), multisigAddress);
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
      const wallet = new Wallet(
        privateKey,
        new providers.JsonRpcProvider(providerUrl)
      );
      const multisigInstance = await new MultiSigWalletFactory(wallet).deploy(
        owners,
        confirmationsRequired
      );

      await multisigInstance.deployed();

      return new HintoMultisigSdk(wallet, multisigInstance.address);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns address of the contract that's gonna be deployed
   */
  public async computeContractAddressToBeDeployed(): Promise<string> {
    if (!(this.signerOrProvider instanceof Signer)) {
      throw new Error(
        "Only a wallet like instance of HintoSdk can execute write operations on the chain"
      );
    }
    const nonce = await this.signerOrProvider?.provider!.getTransactionCount(
      this.multisigAddress
    );
    const address = utils.getContractAddress({
      from: await this.signerOrProvider!.getAddress(),
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

  public async getTransactionDetails(
    transactionID: number
  ): Promise<{
    destination: string;
    executed: boolean;
    data: string;
    value: string;
  }> {
    const details = await this.contractInstance.transactions(transactionID);
    return {
      destination: details.destination,
      executed: details.executed,
      data: details.data,
      value: details.data
    };
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

  public async getTransactionsCount(): Promise<number> {
    return (
      await this.contractInstance.getTransactionCount(true, true)
    ).toNumber();
  }

  public async isTransactionExecuted(transactionId: number): Promise<boolean> {
    return (await this.contractInstance.transactions(transactionId)).executed;
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

  public async onOwnerAddition(consumer: OnOwnerAdditionConsumer) {
    this.contractInstance.on(
      this.contractInstance.interface.events.OwnerAddition.name,
      consumer
    );
  }

  public async onOwnerRemoval(consumer: OnOwnerRemovalConsumer) {
    this.contractInstance.on(
      this.contractInstance.interface.events.OwnerRemoval.name,
      consumer
    );
  }
}
