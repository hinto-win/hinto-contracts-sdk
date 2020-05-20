import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { HintoTips } from "./HintoTips";
export declare class HintoTipsFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<HintoTips>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): HintoTips;
    connect(signer: Signer): HintoTipsFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): HintoTips;
}
