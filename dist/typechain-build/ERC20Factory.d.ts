import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { ERC20 } from "./ERC20";
export declare class ERC20Factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(): Promise<ERC20>;
    getDeployTransaction(): UnsignedTransaction;
    attach(address: string): ERC20;
    connect(signer: Signer): ERC20Factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20;
}
