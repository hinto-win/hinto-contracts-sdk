"use strict";
/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class ContextFactory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ContextFactory = ContextFactory;
const _abi = [
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    }
];