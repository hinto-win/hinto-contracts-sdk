export interface Tip {
  readonly publisher: string;
  readonly tipCode: string;
  readonly tipMetadataHash: string;
  readonly recipients: string[];
  readonly isValid: boolean;
}
