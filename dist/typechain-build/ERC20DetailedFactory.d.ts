import { Signer } from "ethers";
import { Provider } from "ethers/providers";
import { Erc20Detailed } from "./Erc20Detailed";
export declare class Erc20DetailedFactory {
    static connect(address: string, signerOrProvider: Signer | Provider): Erc20Detailed;
}
