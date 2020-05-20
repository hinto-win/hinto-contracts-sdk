import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { BigNumberish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { MultiSigWallet } from "./MultiSigWallet";
export declare class MultiSigWalletFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_owners: string[], _required: BigNumberish, overrides?: TransactionOverrides): Promise<MultiSigWallet>;
    getDeployTransaction(_owners: string[], _required: BigNumberish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): MultiSigWallet;
    connect(signer: Signer): MultiSigWalletFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): MultiSigWallet;
}
