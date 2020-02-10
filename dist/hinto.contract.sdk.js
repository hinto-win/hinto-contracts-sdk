"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const hinto_tips_abi_json_1 = __importDefault(require("./utils/hinto-tips-abi.json"));
const utils_1 = require("ethers/utils");
class HintoSdk {
    constructor(providerUrl, contractAddress, privateKey) {
        this.providerUrl = providerUrl;
        this.contractAddress = contractAddress;
        this.privateKey = privateKey;
        if (privateKey) {
            this.wallet = new ethers_1.Wallet(privateKey, new ethers_1.providers.JsonRpcProvider(providerUrl));
            this.contractInstance = new ethers_1.Contract(contractAddress, hinto_tips_abi_json_1.default, this.wallet);
            return;
        }
        this.contractInstance = new ethers_1.Contract(contractAddress, JSON.stringify(hinto_tips_abi_json_1.default), new ethers_1.providers.JsonRpcProvider(providerUrl));
    }
    approvePublisher(publisher) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wallet) {
                throw new Error("This method is avaliable only if the private key has been given in the constructor");
            }
            try {
                const tx = yield this.contractInstance.approvePublisher(publisher);
                yield tx.wait();
            }
            catch (err) {
                throw err;
            }
        });
    }
    publishTip(tipCode, tipMetadataHash, recipients) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wallet) {
                throw new Error("This method is avaliable only if the private key has been given in the constructor");
            }
            try {
                const tx = yield this.contractInstance.publishTip(ethers_1.utils.formatBytes32String(tipCode), tipMetadataHash, recipients.map(e => {
                    return ethers_1.utils.formatBytes32String(e);
                }));
                const txReceipt = yield tx.wait();
                if (txReceipt.logs && txReceipt.transactionHash) {
                    const abiDecoded = new utils_1.AbiCoder().decode(["address", "bytes32", "uint"], txReceipt.logs[0].data);
                    return {
                        tipId: abiDecoded[2].toNumber(),
                        txHash: txReceipt.transactionHash
                    };
                }
                throw new Error("Could not publish tip");
            }
            catch (err) {
                throw err;
            }
        });
    }
    getTipData(tipId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipData = yield this.contractInstance.getTip(tipId);
                const recipients = tipData[3].map(e => {
                    return utils_1.parseBytes32String(e);
                });
                return {
                    publisher: tipData[0],
                    tipCode: utils_1.parseBytes32String(tipData[1]),
                    tipMetadataHash: tipData[2],
                    isValid: tipData[4],
                    recipients
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
    getTipsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const tipsCount = yield this.contractInstance.getTipsCount();
            return tipsCount.toNumber();
        });
    }
}
exports.HintoSdk = HintoSdk;
