import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { HintoTips } from "./HintoTips";
export declare class HintoTipsFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(): Promise<HintoTips>;
    getDeployTransaction(): UnsignedTransaction;
    attach(address: string): HintoTips;
    connect(signer: Signer): HintoTipsFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): HintoTips;
}
