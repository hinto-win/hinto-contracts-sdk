import { Tip } from "./types";
export declare class HintoSdk {
    readonly providerUrl: string;
    readonly contractAddress: string;
    readonly privateKey?: string | undefined;
    private wallet?;
    private contractInstance;
    constructor(providerUrl: string, contractAddress: string, privateKey?: string | undefined);
    approvePublisher(publisher: string): Promise<void>;
    publishTip(tipCode: string, tipMetadataHash: string, recipients: string[]): Promise<{
        tipId: number;
        txHash: string;
    }>;
    getTipData(tipId: number): Promise<Tip>;
    getTipsCount(): Promise<number>;
}
