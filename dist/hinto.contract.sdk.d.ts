import { Arrayish } from "ethers/utils";
import { Tip } from "./types";
export declare class HintoSdk {
    readonly providerUrl: string;
    readonly contractAddress: string;
    readonly privateKey?: string | undefined;
    private wallet?;
    private contractInstance;
    private unconfirmedTipsPublishmentCount;
    constructor(providerUrl: string, contractAddress: string, privateKey?: string | undefined);
    approvePublisher(publisher: string): Promise<void>;
    publishTip(tipCode: string, tipMetadataHash: string, recipients: string[]): Promise<{
        tipId: number;
        txHash: string;
    }>;
    encodeTransaction(functionName: string, args: string[]): Promise<Arrayish>;
    getTipData(tipId: number): Promise<Tip | null>;
    getTipsCount(): Promise<number>;
}
