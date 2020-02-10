import { Signer } from "ethers";
import { Provider } from "ethers/providers";
import { ERC20Detailed } from "./ERC20Detailed";
export declare class ERC20DetailedFactory {
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20Detailed;
}
