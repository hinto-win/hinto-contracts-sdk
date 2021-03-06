"use strict";
/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class HintoTipsFactory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides);
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides);
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
exports.HintoTipsFactory = HintoTipsFactory;
const _abi = [
    {
        constant: false,
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
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
        inputs: [],
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
            }
        ],
        name: "tips",
        outputs: [
            {
                name: "publisher",
                type: "address"
            },
            {
                name: "tipCode",
                type: "bytes32"
            },
            {
                name: "tipMetaSha256Hash",
                type: "bytes32"
            },
            {
                name: "isValid",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "newOwner",
                type: "address"
            }
        ],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "publisher",
                type: "address"
            }
        ],
        name: "ApprovePublisher",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "publisher",
                type: "address"
            }
        ],
        name: "PublisherDisapproved",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "publisher",
                type: "address"
            },
            {
                indexed: false,
                name: "tipCode",
                type: "bytes32"
            },
            {
                indexed: false,
                name: "tipId",
                type: "uint256"
            },
            {
                indexed: true,
                name: "recipients",
                type: "bytes32[]"
            }
        ],
        name: "TipPublished",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "tipId",
                type: "uint256"
            }
        ],
        name: "TipVoided",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: true,
                name: "newOwner",
                type: "address"
            }
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_publisher",
                type: "address"
            }
        ],
        name: "approvePublisher",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_publisher",
                type: "address"
            }
        ],
        name: "disapprovePublisher",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_tipCode",
                type: "bytes32"
            },
            {
                name: "_tipMetaSha256Hash",
                type: "bytes32"
            },
            {
                name: "_recipients",
                type: "bytes32[]"
            }
        ],
        name: "publishTip",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_tipId",
                type: "uint256"
            }
        ],
        name: "invalidateTip",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getTipsCount",
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
        inputs: [
            {
                name: "_tipId",
                type: "uint256"
            }
        ],
        name: "getTip",
        outputs: [
            {
                name: "",
                type: "address"
            },
            {
                name: "",
                type: "bytes32"
            },
            {
                name: "",
                type: "bytes32"
            },
            {
                name: "",
                type: "bytes32[]"
            },
            {
                name: "",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    }
];
const _bytecode = "0x608060405261001b6100db640100000000026401000000009004565b6000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36100e3565b600033905090565b6111fd806100f26000396000f3fe608060405234801561001057600080fd5b50600436106100c6576000357c010000000000000000000000000000000000000000000000000000000090048063a12247b01161008e578063a12247b014610254578063a5c68c5914610272578063d9c39a48146102f9578063e1b610d91461033d578063f1732ef81461036b578063f2fde38b146103f8576100c6565b8063567b45ed146100cb5780635b703f5c1461010f578063715018a6146101de5780638da5cb5b146101e85780638f32d59b14610232575b600080fd5b61010d600480360360208110156100e157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061043c565b005b61013b6004803603602081101561012557600080fd5b8101908080359060200190929190505050610574565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020018060200183151515158152602001828103825284818151815260200191508051906020019060200280838360005b838110156101c65780820151818401526020810190506101ab565b50505050905001965050505050505060405180910390f35b6101e66106dd565b005b6101f0610816565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61023a61083f565b604051808215151515815260200191505060405180910390f35b61025c61089d565b6040518082815260200191505060405180910390f35b61029e6004803603602081101561028857600080fd5b81019080803590602001909291905050506108a7565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018215151515815260200194505050505060405180910390f35b61033b6004803603602081101561030f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610904565b005b6103696004803603602081101561035357600080fd5b8101908080359060200190929190505050610a3b565b005b6103f66004803603606081101561038157600080fd5b810190808035906020019092919080359060200190929190803590602001906401000000008111156103b257600080fd5b8201836020820111156103c457600080fd5b803590602001918460208302840111640100000000831117156103e657600080fd5b9091929391929390505050610bf7565b005b61043a6004803603602081101561040e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e85565b005b61044461083f565b6104b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507f7b3db2dda9705ffe0b19ae3ef8d593d72f0f13ab4f8784c42a5035bd8bb9d65f81604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b6000806000606060008580600254116105d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806111a56024913960400191505060405180910390fd5b6003600088815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166003600089815260200190815260200160002060010154600360008a815260200190815260200160002060020154600360008b8152602001908152602001600020600301600360008c815260200190815260200160002060040160009054906101000a900460ff16818054806020026020016040519081016040528092919081815260200182805480156106c257602002820191906000526020600020905b8154815260200190600101908083116106ae575b50505050509150955095509550955095505091939590929450565b6106e561083f565b610757576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610881610f0b565b73ffffffffffffffffffffffffffffffffffffffff1614905090565b6000600254905090565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060040160009054906101000a900460ff16905084565b61090c61083f565b61097e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507fdf395142d9c1005448e00a212d72dd8fafa4c4fb7378a96356c89a976d0b9b2181604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b808060025411610a96576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806111a56024913960400191505060405180910390fd5b610a9e610816565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610b3857503373ffffffffffffffffffffffffffffffffffffffff166003600084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b610b8d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603b81526020018061116a603b913960400191505060405180910390fd5b60006003600084815260200190815260200160002060040160006101000a81548160ff0219169083151502179055507f0d9e16108323466f24873f2464a03b49500406357c0df02a1dbcf4b1566b1d1a826040518082815260200191505060405180910390a15050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610c99576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d81526020018061113d602d913960400191505060405180910390fd5b610ca1611057565b6040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001868152602001858152602001848480806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505081526020016001151581525090508060036000600254815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201556060820151816003019080519060200190610db19291906110a4565b5060808201518160040160006101000a81548160ff021916908315150217905550905050828260405180838360200280828437808301925050509250505060405180910390207f18731124f9a6160e7efcff3bb3147acab4b1c6fb6278bef5d71c64ec09981c113387600254604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a26002600081548092919060010191905055505050505050565b610e8d61083f565b610eff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b610f0881610f13565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610f99576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806111176026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000801916815260200160008019168152602001606081526020016000151581525090565b8280548282559060005260206000209081019282156110e0579160200282015b828111156110df5782518255916020019190600101906110c4565b5b5090506110ed91906110f1565b5090565b61111391905b8082111561110f5760008160009055506001016110f7565b5090565b9056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f6e6c7920617070726f766564207075626c6973686572732063616e2063616c6c2074686973206d6574686f644f6e6c792074686520636f6e7472616374206f776e6572206f722074686520746970207075626c69736865722063616e20756e76616c696420697454697020776974682074686520676976656e20696420646f6573206e6f74206578697374a265627a7a72305820ddc98a573fe35313d9f999b2252689111f8394505705dc60f58d43b0e5180a5a64736f6c634300050a0032";
