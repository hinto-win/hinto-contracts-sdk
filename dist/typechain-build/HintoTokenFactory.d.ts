import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { BigNumberish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { HintoToken } from "./HintoToken";
export declare class HintoTokenFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_name: string, _symbol: string, _decimals: BigNumberish, _totalSupply: BigNumberish, overrides?: TransactionOverrides): Promise<HintoToken>;
    getDeployTransaction(_name: string, _symbol: string, _decimals: BigNumberish, _totalSupply: BigNumberish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): HintoToken;
    connect(signer: Signer): HintoTokenFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): HintoToken;
}
