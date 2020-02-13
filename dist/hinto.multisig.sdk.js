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
const MultiSigWalletFactory_1 = require("./typechain-build/MultiSigWalletFactory");
const HintoTipsFactory_1 = require("./typechain-build/HintoTipsFactory");
const multisig_abi_json_1 = __importDefault(require("./utils/multisig-abi.json"));
class HintoMultisigSdk {
    /**
     *
     * @param providerUrl - JSON RPC provider url
     * @param multisigAddress - multisig address
     * @param privateKey - multisig owner's private key
     */
    constructor(providerUrl, multisigAddress, privateKey) {
        this.providerUrl = providerUrl;
        this.multisigAddress = multisigAddress;
        this.privateKey = privateKey;
        if (privateKey) {
            this.wallet = new ethers_1.Wallet(privateKey, new ethers_1.providers.JsonRpcProvider(providerUrl));
            this.contractInstance = new ethers_1.Contract(multisigAddress, multisig_abi_json_1.default, this.wallet);
            return;
        }
        this.contractInstance = new ethers_1.Contract(multisigAddress, JSON.stringify(multisig_abi_json_1.default), new ethers_1.providers.JsonRpcProvider(providerUrl));
    }
    /**
     *
     * @param providerUrl - JSON RPC provider url
     * @param privateKey - deploying account's private key
     * @param owners - newly deployed multisig owners
     * @param confirmationsRequired - number of confirmations required by the multisig to execute a transaction
     * @returns SDK instance
     */
    static deployMultisig(providerUrl, privateKey, owners, confirmationsRequired) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const multisigInstance = yield new MultiSigWalletFactory_1.MultiSigWalletFactory(new ethers_1.Wallet(privateKey, new ethers_1.providers.JsonRpcProvider(providerUrl))).deploy(owners, confirmationsRequired);
                yield multisigInstance.deployed();
                return new HintoMultisigSdk(providerUrl, multisigInstance.address, privateKey);
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * @returns address of the contract that's gonna be deployed
     */
    computeContractAddressToBeDeployed() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const nonce = yield ((_a = this.wallet) === null || _a === void 0 ? void 0 : _a.provider.getTransactionCount(this.multisigAddress));
            const address = ethers_1.utils.getContractAddress({
                from: this.wallet.address,
                nonce: nonce
            });
            return address;
        });
    }
    /**
     * @returns encoded contract deployment
     */
    encodeTipsContractDeployment() {
        return __awaiter(this, void 0, void 0, function* () {
            const encoded = new HintoTipsFactory_1.HintoTipsFactory().getDeployTransaction().data;
            if (!encoded) {
                throw new Error("Tips contract deploy tx encoding failed");
            }
            return encoded;
        });
    }
    /**
     *
     * @param owner - address of the owner who will be added
     * @returns encoded contract execution
     */
    encodeAddMultisigOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contractInstance.interface.functions.addOwner.encode([owner]);
        });
    }
    /**
     *
     * @param owner - address of the owner who will be removed
     * @returns encoded contract execution
     */
    encodeRemoveMultisigOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contractInstance.interface.functions.removeOwner.encode([
                owner
            ]);
        });
    }
    /**
     *
     * @param owner - address of the owner who will be replaced
     * @param newOwner - new owner's address
     * @returns encoded contract execution
     */
    encodeReplaceMultisigOwner(owner, newOwner) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contractInstance.interface.functions.replaceOwner.encode([
                owner,
                newOwner
            ]);
        });
    }
    /**
     *
     * @param owner - ethereum address
     * @returns information regarding being the multisig owner or not
     */
    isOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contractInstance.isOwner(owner);
        });
    }
    /**
     * @returns multisig owners
     */
    getOwners() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contractInstance.getOwners();
        });
    }
    /**
     * @returns confirmations required by the multisig to execute a transaction
     */
    getRequiredConfirmations() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.contractInstance.required()).toNumber();
        });
    }
    /**
     *
     * @param transactionId - multisig transaction id
     * @param owner - multisig owner
     * @returns information about the transaction confirmation
     */
    didConfirmTransaction(transactionId, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contractInstance.confirmations(transactionId, owner);
        });
    }
    /**
     *
     * @param to - transaction recipient
     * @param value - transaction value in ether
     * @param data - transaction data
     * @returns transaction id
     */
    submitTransaction(to, value, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.contractInstance.submitTransaction(to, value, data);
            const txReceipt = yield tx.wait();
            if (txReceipt.logs[0]) {
                const txId = txReceipt.logs[0].topics[1];
                return txId;
            }
            throw new Error("An error occured while submitting the tx");
        });
    }
    /**
     *
     * @param transactionId - multisig transaction id
     * @returns txHash and events emmited by the forwarded transaction
     */
    confirmTransaction(transactionId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.contractInstance.confirmTransaction(transactionId);
            const txReceipt = yield tx.wait();
            const events = (_a = txReceipt.events) === null || _a === void 0 ? void 0 : _a.map(details => {
                return details.event;
            });
            if (events[1] !== "Execution") {
                return;
            }
            if (txReceipt.events && txReceipt.transactionHash) {
                return {
                    txHash: txReceipt.transactionHash,
                    events: txReceipt.events.slice(2)
                };
            }
            return;
        });
    }
    /**
     *
     * @param transactionId - multisig transaction id
     * @returns list of addresses that confirmed the transaction
     */
    getTransactionConfirmations(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contractInstance.getConfirmations(transactionId);
        });
    }
    /**
     * @returns multisig address
     */
    getMultisigAddress() {
        return this.multisigAddress;
    }
    /**
     *
     * @param transactiondId - multisig transaction id
     * @returns transaction status
     */
    isTransactionConfirmed(transactiondId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contractInstance.isConfirmed(transactiondId);
        });
    }
    /**
     *
     * @param consumer - function to be executed on event detection
     */
    onTransactionSubmission(consumer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.contractInstance.on(this.contractInstance.interface.events.Submission.name, consumer);
        });
    }
    onOwnerAddition(consumer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.contractInstance.on(this.contractInstance.interface.events.OwnerAddition.name, consumer);
        });
    }
    onOwnerRemoval(consumer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.contractInstance.on(this.contractInstance.interface.events.OwnerRemoval.name, consumer);
        });
    }
}
exports.HintoMultisigSdk = HintoMultisigSdk;
