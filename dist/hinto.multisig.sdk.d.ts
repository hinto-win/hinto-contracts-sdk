import { Event } from "ethers";
import { Arrayish, BigNumberish } from "ethers/utils";
export declare class HintoMultisigSdk {
    readonly providerUrl: string;
    readonly multisigAddress: string;
    readonly privateKey: string;
    private wallet?;
    private contractInstance;
    /**
     *
     * @param providerUrl - JSON RPC provider url
     * @param multisigAddress - multisig address
     * @param privateKey - multisig owner's private key
     */
    constructor(providerUrl: string, multisigAddress: string, privateKey: string);
    /**
     *
     * @param providerUrl - JSON RPC provider url
     * @param privateKey - deploying account's private key
     * @param owners - newly deployed multisig owners
     * @param confirmationsRequired - number of confirmations required by the multisig to execute a transaction
     * @returns SDK instance
     */
    static deployMultisig(providerUrl: string, privateKey: string, owners: string[], confirmationsRequired: number): Promise<HintoMultisigSdk>;
    /**
     * @returns address of the contract that's gonna be deployed
     */
    computeContractAddressToBeDeployed(): Promise<string>;
    /**
     * @returns encoded contract deployment
     */
    encodeTipsContractDeployment(): Promise<Arrayish>;
    /**
     *
     * @param owner - address of the owner who will be added
     * @returns encoded contract execution
     */
    encodeAddMultisigOwner(owner: string): Promise<Arrayish>;
    /**
     *
     * @param owner - address of the owner who will be removed
     * @returns encoded contract execution
     */
    encodeRemoveMultisigOwner(owner: string): Promise<Arrayish>;
    /**
     *
     * @param owner - address of the owner who will be replaced
     * @param newOwner - new owner's address
     * @returns encoded contract execution
     */
    encodeReplaceMultisigOwner(owner: string, newOwner: string): Promise<Arrayish>;
    /**
     *
     * @param owner - ethereum address
     * @returns information regarding being the multisig owner or not
     */
    isOwner(owner: string): Promise<boolean>;
    /**
     * @returns multisig owners
     */
    getOwners(): Promise<string[]>;
    /**
     * @returns confirmations required by the multisig to execute a transaction
     */
    getRequiredConfirmations(): Promise<number>;
    /**
     *
     * @param transactionId - multisig transaction id
     * @param owner - multisig owner
     * @returns information about the transaction confirmation
     */
    didConfirmTransaction(transactionId: number, owner: string): Promise<boolean>;
    /**
     *
     * @param to - transaction recipient
     * @param value - transaction value in ether
     * @param data - transaction data
     * @returns transaction id
     */
    submitTransaction(to: string, value: number, data: string): Promise<BigNumberish>;
    /**
     *
     * @param transactionId - multisig transaction id
     * @returns txHash and events emmited by the forwarded transaction
     */
    confirmTransaction(transactionId: number): Promise<{
        txHash: string;
        events: Event[];
    } | undefined>;
    /**
     * @returns multisig address
     */
    getMultisigAddress(): string;
}
