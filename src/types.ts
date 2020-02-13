import { Listener } from "ethers/providers";

export interface Tip {
  readonly publisher: string;
  readonly tipCode: string;
  readonly tipMetadataHash: string;
  readonly recipients: string[];
  readonly isValid: boolean;
}

export interface OnTransactionSubmissionConsumer extends Listener {
  (transactionId: number, submittedBy: string): Promise<void>;
}

export interface OnOwnerChangeConsumer extends Listener {
  (owner: string): Promise<void>;
}
export interface OnOwnerRemovalConsumer extends OnOwnerChangeConsumer {}
export interface OnOwnerAdditionConsumer extends OnOwnerChangeConsumer {}
