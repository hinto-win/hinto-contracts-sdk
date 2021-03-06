"use strict";
/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class MultiSigWalletFactory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_owners, _required, overrides) {
        return super.deploy(_owners, _required, overrides);
    }
    getDeployTransaction(_owners, _required, overrides) {
        return super.getDeployTransaction(_owners, _required, overrides);
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.MultiSigWalletFactory = MultiSigWalletFactory;
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        name: "owners",
        outputs: [
            {
                name: "",
                type: "address"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "address"
            }
        ],
        name: "isOwner",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "uint256"
            },
            {
                name: "",
                type: "address"
            }
        ],
        name: "confirmations",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        name: "transactions",
        outputs: [
            {
                name: "destination",
                type: "address"
            },
            {
                name: "value",
                type: "uint256"
            },
            {
                name: "data",
                type: "bytes"
            },
            {
                name: "executed",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "transactionCount",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "MAX_OWNER_COUNT",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "required",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                name: "_owners",
                type: "address[]"
            },
            {
                name: "_required",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        payable: true,
        stateMutability: "payable",
        type: "fallback"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "Confirmation",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "Revocation",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "transactionId",
                type: "uint256"
            },
            {
                indexed: true,
                name: "submittedBy",
                type: "address"
            }
        ],
        name: "Submission",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "Execution",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "ExecutionFailure",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "sender",
                type: "address"
            },
            {
                indexed: false,
                name: "value",
                type: "uint256"
            }
        ],
        name: "Deposit",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "owner",
                type: "address"
            }
        ],
        name: "OwnerAddition",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "owner",
                type: "address"
            }
        ],
        name: "OwnerRemoval",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "required",
                type: "uint256"
            }
        ],
        name: "RequirementChange",
        type: "event"
    },
    {
        constant: false,
        inputs: [
            {
                name: "owner",
                type: "address"
            }
        ],
        name: "addOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "owner",
                type: "address"
            }
        ],
        name: "removeOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "owner",
                type: "address"
            },
            {
                name: "newOwner",
                type: "address"
            }
        ],
        name: "replaceOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_required",
                type: "uint256"
            }
        ],
        name: "changeRequirement",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "destination",
                type: "address"
            },
            {
                name: "value",
                type: "uint256"
            },
            {
                name: "data",
                type: "bytes"
            }
        ],
        name: "submitTransaction",
        outputs: [
            {
                name: "transactionId",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "confirmTransaction",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "revokeConfirmation",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "executeTransaction",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "isConfirmed",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "getConfirmationCount",
        outputs: [
            {
                name: "count",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "pending",
                type: "bool"
            },
            {
                name: "executed",
                type: "bool"
            }
        ],
        name: "getTransactionCount",
        outputs: [
            {
                name: "count",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getOwners",
        outputs: [
            {
                name: "",
                type: "address[]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "transactionId",
                type: "uint256"
            }
        ],
        name: "getConfirmations",
        outputs: [
            {
                name: "_confirmations",
                type: "address[]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "from",
                type: "uint256"
            },
            {
                name: "to",
                type: "uint256"
            },
            {
                name: "pending",
                type: "bool"
            },
            {
                name: "executed",
                type: "bool"
            }
        ],
        name: "getTransactionIds",
        outputs: [
            {
                name: "_transactionIds",
                type: "uint256[]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    }
];
const _bytecode = "0x60806040523480156200001157600080fd5b506040516200269638038062002696833981810160405260408110156200003757600080fd5b8101908080516401000000008111156200005057600080fd5b828101905060208101848111156200006757600080fd5b81518560208202830111640100000000821117156200008557600080fd5b50509291906020018051906020019092919050505081518160328211158015620000af5750818111155b8015620000bd575060008114155b8015620000cb575060008214155b620000d557600080fd5b60008090505b8451811015620002195760026000868381518110620000f657fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16158015620001955750600073ffffffffffffffffffffffffffffffffffffffff168582815181106200017457fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1614155b6200019f57600080fd5b600160026000878481518110620001b257fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508080600101915050620000db565b5083600390805190602001906200023292919062000244565b50826004819055505050505062000319565b828054828255906000526020600020908101928215620002c0579160200282015b82811115620002bf5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019062000265565b5b509050620002cf9190620002d3565b5090565b6200031691905b808211156200031257600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550600101620002da565b5090565b90565b61236d80620003296000396000f3fe608060405260043610610147576000357c010000000000000000000000000000000000000000000000000000000090048063a0e67e2b116100c8578063c01a8c841161008c578063c01a8c84146107e1578063c64274741461081c578063d74f8edd14610922578063dc8452cd1461094d578063e20056e614610978578063ee22610b146109e957610147565b8063a0e67e2b146105cd578063a8abe69a14610639578063b5dc40c3146106eb578063b77bf6001461077b578063ba51a6df146107a657610147565b8063547415251161010f57806354741525146103845780637065cb48146103e1578063784547a7146104325780638b51d13f146104855780639ace38c2146104d457610147565b8063025e7c27146101a1578063173825d91461021c57806320ea8d861461026d5780632f54bf6e146102a85780633411c81c14610311575b600034111561019f573373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a25b005b3480156101ad57600080fd5b506101da600480360360208110156101c457600080fd5b8101908080359060200190929190505050610a24565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561022857600080fd5b5061026b6004803603602081101561023f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a60565b005b34801561027957600080fd5b506102a66004803603602081101561029057600080fd5b8101908080359060200190929190505050610cee565b005b3480156102b457600080fd5b506102f7600480360360208110156102cb57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e90565b604051808215151515815260200191505060405180910390f35b34801561031d57600080fd5b5061036a6004803603604081101561033457600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610eb0565b604051808215151515815260200191505060405180910390f35b34801561039057600080fd5b506103cb600480360360408110156103a757600080fd5b81019080803515159060200190929190803515159060200190929190505050610edf565b6040518082815260200191505060405180910390f35b3480156103ed57600080fd5b506104306004803603602081101561040457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f71565b005b34801561043e57600080fd5b5061046b6004803603602081101561045557600080fd5b8101908080359060200190929190505050611184565b604051808215151515815260200191505060405180910390f35b34801561049157600080fd5b506104be600480360360208110156104a857600080fd5b8101908080359060200190929190505050611269565b6040518082815260200191505060405180910390f35b3480156104e057600080fd5b5061050d600480360360208110156104f757600080fd5b8101908080359060200190929190505050611332565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018060200183151515158152602001828103825284818151815260200191508051906020019080838360005b8381101561058f578082015181840152602081019050610574565b50505050905090810190601f1680156105bc5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b3480156105d957600080fd5b506105e2611427565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561062557808201518184015260208101905061060a565b505050509050019250505060405180910390f35b34801561064557600080fd5b506106946004803603608081101561065c57600080fd5b8101908080359060200190929190803590602001909291908035151590602001909291908035151590602001909291905050506114b5565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156106d75780820151818401526020810190506106bc565b505050509050019250505060405180910390f35b3480156106f757600080fd5b506107246004803603602081101561070e57600080fd5b8101908080359060200190929190505050611619565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561076757808201518184015260208101905061074c565b505050509050019250505060405180910390f35b34801561078757600080fd5b50610790611845565b6040518082815260200191505060405180910390f35b3480156107b257600080fd5b506107df600480360360208110156107c957600080fd5b810190808035906020019092919050505061184b565b005b3480156107ed57600080fd5b5061081a6004803603602081101561080457600080fd5b8101908080359060200190929190505050611901565b005b34801561082857600080fd5b5061090c6004803603606081101561083f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561088657600080fd5b82018360208201111561089857600080fd5b803590602001918460018302840111640100000000831117156108ba57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611aee565b6040518082815260200191505060405180910390f35b34801561092e57600080fd5b50610937611b0d565b6040518082815260200191505060405180910390f35b34801561095957600080fd5b50610962611b12565b6040518082815260200191505060405180910390f35b34801561098457600080fd5b506109e76004803603604081101561099b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611b18565b005b3480156109f557600080fd5b50610a2260048036036020811015610a0c57600080fd5b8101908080359060200190929190505050611e22565b005b60038181548110610a3157fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a9857600080fd5b80600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610aef57600080fd5b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060008090505b600160038054905003811015610c6f578273ffffffffffffffffffffffffffffffffffffffff1660038281548110610b8157fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610c6257600360016003805490500381548110610bdd57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660038281548110610c1557fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610c6f565b8080600101915050610b4d565b506001600381818054905003915081610c889190612267565b506003805490506004541115610ca757610ca660038054905061184b565b5b8173ffffffffffffffffffffffffffffffffffffffff167f8001553a916ef2f495d26a907cc54d96ed840d7bda71e73194bf5a9df7a76b9060405160405180910390a25050565b33600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610d4557600080fd5b81336001600083815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610dae57600080fd5b8360008082815260200190815260200160002060030160009054906101000a900460ff1615610ddc57600080fd5b60006001600087815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550843373ffffffffffffffffffffffffffffffffffffffff167ff6a317157440607f36269043eb55f1287a5a19ba2216afeab88cd46cbcfb88e960405160405180910390a35050505050565b60026020528060005260406000206000915054906101000a900460ff1681565b60016020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b600080600090505b600554811015610f6a57838015610f1e575060008082815260200190815260200160002060030160009054906101000a900460ff16155b80610f515750828015610f50575060008082815260200190815260200160002060030160009054906101000a900460ff165b5b15610f5d576001820191505b8080600101915050610ee7565b5092915050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610fa957600080fd5b80600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561100157600080fd5b81600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561103c57600080fd5b600160038054905001600454603282111580156110595750818111155b8015611066575060008114155b8015611073575060008214155b61107c57600080fd5b6001600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060038590806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550508473ffffffffffffffffffffffffffffffffffffffff167ff39e6e1eb0edcf53c221607b54b00cd28f3196fed0a24994dc308b8f611b682d60405160405180910390a25050505050565b6000806000905060008090505b60038054905081101561126157600160008581526020019081526020016000206000600383815481106111c057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561123f576001820191505b60045482141561125457600192505050611264565b8080600101915050611191565b50505b919050565b600080600090505b60038054905081101561132c57600160008481526020019081526020016000206000600383815481106112a057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561131f576001820191505b8080600101915050611271565b50919050565b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001015490806002018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561140a5780601f106113df5761010080835404028352916020019161140a565b820191906000526020600020905b8154815290600101906020018083116113ed57829003601f168201915b5050505050908060030160009054906101000a900460ff16905084565b606060038054806020026020016040519081016040528092919081815260200182805480156114ab57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611461575b5050505050905090565b6060806005546040519080825280602002602001820160405280156114e95781602001602082028038833980820191505090505b509050600080905060008090505b6005548110156115935785801561152e575060008082815260200190815260200160002060030160009054906101000a900460ff16155b806115615750848015611560575060008082815260200190815260200160002060030160009054906101000a900460ff165b5b15611586578083838151811061157357fe5b6020026020010181815250506001820191505b80806001019150506114f7565b8787036040519080825280602002602001820160405280156115c45781602001602082028038833980820191505090505b5093508790505b8681101561160e578281815181106115df57fe5b602002602001015184898303815181106115f557fe5b60200260200101818152505080806001019150506115cb565b505050949350505050565b6060806003805490506040519080825280602002602001820160405280156116505781602001602082028038833980820191505090505b509050600080905060008090505b600380549050811015611797576001600086815260200190815260200160002060006003838154811061168d57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561178a576003818154811061171257fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683838151811061174957fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506001820191505b808060010191505061165e565b816040519080825280602002602001820160405280156117c65781602001602082028038833980820191505090505b509350600090505b8181101561183d578281815181106117e257fe5b60200260200101518482815181106117f657fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505080806001019150506117ce565b505050919050565b60055481565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461188357600080fd5b600380549050816032821115801561189b5750818111155b80156118a8575060008114155b80156118b5575060008214155b6118be57600080fd5b826004819055507fa3f1ee9126a074d9326c682f561767f710e927faa811f7a99829d49dc421797a836040518082815260200191505060405180910390a1505050565b33600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661195857600080fd5b81600073ffffffffffffffffffffffffffffffffffffffff1660008083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156119c857600080fd5b82336001600083815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615611a3257600080fd5b600180600087815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550843373ffffffffffffffffffffffffffffffffffffffff167f4a504a94899432a9846e1aa406dceb1bcfd538bb839071d49d1e5e23f5be30ef60405160405180910390a3611ae785611e22565b5050505050565b6000611afb8484846120c4565b9050611b0681611901565b9392505050565b603281565b60045481565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611b5057600080fd5b81600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611ba757600080fd5b81600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615611bff57600080fd5b60008090505b600380549050811015611ce5578473ffffffffffffffffffffffffffffffffffffffff1660038281548110611c3657fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611cd8578360038281548110611c8b57fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611ce5565b8080600101915050611c05565b506000600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508373ffffffffffffffffffffffffffffffffffffffff167f8001553a916ef2f495d26a907cc54d96ed840d7bda71e73194bf5a9df7a76b9060405160405180910390a28273ffffffffffffffffffffffffffffffffffffffff167ff39e6e1eb0edcf53c221607b54b00cd28f3196fed0a24994dc308b8f611b682d60405160405180910390a250505050565b33600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611e7957600080fd5b81336001600083815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611ee257600080fd5b8360008082815260200190815260200160002060030160009054906101000a900460ff1615611f1057600080fd5b611f1985611184565b156120bd576000806000878152602001908152602001600020905060018160030160006101000a81548160ff0219169083151502179055506120398160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16826001015483600201805460018160011615610100020316600290049050846002018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561202f5780601f106120045761010080835404028352916020019161202f565b820191906000526020600020905b81548152906001019060200180831161201257829003601f168201915b5050505050612240565b1561207057857f33e13ecb54c3076d8e8bb8c2881800a4d972b792045ffae98fdf46df365fed7560405160405180910390a26120bb565b857f526441bb6c1aba3c9a4a6ca1d6545da9c2333c8c48343ef398eb858d72b7923660405160405180910390a260008160030160006101000a81548160ff0219169083151502179055505b505b5050505050565b600083600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561210157600080fd5b600554915060405180608001604052808673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020016000151581525060008084815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020190805190602001906121bf929190612293565b5060608201518160030160006101000a81548160ff02191690831515021790555090505060016005600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff16827f125cc128025455cb458dc6ba80f03fcab9542337ffb7c6c798a2b3bc4d2fa20c60405160405180910390a3509392505050565b6000806040516020840160008287838a8c6187965a03f19250505080915050949350505050565b81548183558181111561228e5781836000526020600020918201910161228d9190612313565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106122d457805160ff1916838001178555612302565b82800160010185558215612302579182015b828111156123015782518255916020019190600101906122e6565b5b50905061230f9190612313565b5090565b61233591905b80821115612331576000816000905550600101612319565b5090565b9056fea265627a7a7230582088b6d02d1974f15fe810f0cc976d6dca587aa2a762f662bbbe5b45a2cdadf36b64736f6c634300050a0032";
