import { ethers } from "ethers";
let contract;
const connectContract = async () => {
     const Address = "0x1fA307A15c977aFE5184983184D4937259E4d294";
     const Abi = [
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "_tokenAmount",
                         "type": "uint256"
                    }
               ],
               "name": "burnTime",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [],
               "stateMutability": "nonpayable",
               "type": "constructor"
          },
          {
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": false,
                         "internalType": "address",
                         "name": "_user",
                         "type": "address"
                    },
                    {
                         "indexed": false,
                         "internalType": "uint256",
                         "name": "_amount",
                         "type": "uint256"
                    }
               ],
               "name": "ClaimedInsurance",
               "type": "event"
          },
          {
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": false,
                         "internalType": "address",
                         "name": "_user",
                         "type": "address"
                    },
                    {
                         "indexed": false,
                         "internalType": "uint256",
                         "name": "_amount",
                         "type": "uint256"
                    }
               ],
               "name": "ClaimedLastBuyer",
               "type": "event"
          },
          {
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": false,
                         "internalType": "address",
                         "name": "_user",
                         "type": "address"
                    },
                    {
                         "indexed": false,
                         "internalType": "uint256",
                         "name": "_amount",
                         "type": "uint256"
                    }
               ],
               "name": "ClaimedLeader",
               "type": "event"
          },
          {
               "inputs": [],
               "name": "dividendClaim",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "_tokenAmount",
                         "type": "uint256"
                    }
               ],
               "name": "Insurance",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "insuranceClaim",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "lastBuyerClaim",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "leaderClaim",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "saftey",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "swap",
               "outputs": [],
               "stateMutability": "payable",
               "type": "function"
          },
          {
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "sender",
                         "type": "address"
                    },
                    {
                         "indexed": false,
                         "internalType": "uint256",
                         "name": "ethAmount",
                         "type": "uint256"
                    },
                    {
                         "indexed": false,
                         "internalType": "uint256",
                         "name": "tokensReceived",
                         "type": "uint256"
                    }
               ],
               "name": "TokensSwapped",
               "type": "event"
          },
          {
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "recipient",
                         "type": "address"
                    },
                    {
                         "indexed": false,
                         "internalType": "uint256",
                         "name": "ethAmount",
                         "type": "uint256"
                    }
               ],
               "name": "TokensSwappedBack",
               "type": "event"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "to",
                         "type": "address"
                    },
                    {
                         "internalType": "uint256",
                         "name": "amount",
                         "type": "uint256"
                    }
               ],
               "name": "transfer",
               "outputs": [
                    {
                         "internalType": "bool",
                         "name": "",
                         "type": "bool"
                    }
               ],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "from",
                         "type": "address"
                    },
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "to",
                         "type": "address"
                    },
                    {
                         "indexed": false,
                         "internalType": "uint256",
                         "name": "value",
                         "type": "uint256"
                    }
               ],
               "name": "Transfer",
               "type": "event"
          },
          {
               "inputs": [],
               "name": "aTime",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "account",
                         "type": "address"
                    }
               ],
               "name": "balanceOf",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "Bps",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "",
                         "type": "address"
                    }
               ],
               "name": "claimedDivident",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "contractBalance",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "Countdown",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "day_1_time",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "decimals",
               "outputs": [
                    {
                         "internalType": "uint8",
                         "name": "",
                         "type": "uint8"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "ethOnContractAfterEnd",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "_user",
                         "type": "address"
                    }
               ],
               "name": "getDividend",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    },
                    {
                         "internalType": "bool",
                         "name": "",
                         "type": "bool"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "_id",
                         "type": "uint256"
                    }
               ],
               "name": "getInsuranceById",
               "outputs": [
                    {
                         "internalType": "address",
                         "name": "",
                         "type": "address"
                    },
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    },
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    },
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "getInsuranceWinners",
               "outputs": [
                    {
                         "components": [
                              {
                                   "internalType": "address",
                                   "name": "user",
                                   "type": "address"
                              },
                              {
                                   "internalType": "uint256",
                                   "name": "id",
                                   "type": "uint256"
                              },
                              {
                                   "internalType": "uint256",
                                   "name": "token",
                                   "type": "uint256"
                              },
                              {
                                   "internalType": "uint256",
                                   "name": "time",
                                   "type": "uint256"
                              }
                         ],
                         "internalType": "struct PONZU3.InsuranceData[]",
                         "name": "",
                         "type": "tuple[]"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "",
                         "type": "address"
                    }
               ],
               "name": "insuranceClaimed",
               "outputs": [
                    {
                         "internalType": "bool",
                         "name": "",
                         "type": "bool"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "insuranceCount",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "lastBuyer",
               "outputs": [
                    {
                         "internalType": "address",
                         "name": "",
                         "type": "address"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "leaderboardScore",
               "outputs": [
                    {
                         "internalType": "address[5]",
                         "name": "",
                         "type": "address[5]"
                    },
                    {
                         "internalType": "uint256[5]",
                         "name": "",
                         "type": "uint256[5]"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "",
                         "type": "address"
                    }
               ],
               "name": "leaderClaimed",
               "outputs": [
                    {
                         "internalType": "bool",
                         "name": "",
                         "type": "bool"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "LiveTimer",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "name",
               "outputs": [
                    {
                         "internalType": "string",
                         "name": "",
                         "type": "string"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "_tokens",
                         "type": "uint256"
                    },
                    {
                         "internalType": "uint256",
                         "name": "_contractBalance",
                         "type": "uint256"
                    }
               ],
               "name": "swapBackConvert",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "_eth",
                         "type": "uint256"
                    }
               ],
               "name": "swapConvert",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "symbol",
               "outputs": [
                    {
                         "internalType": "string",
                         "name": "",
                         "type": "string"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "totalETH",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "totalSupply",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "",
                         "type": "address"
                    }
               ],
               "name": "userData",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "token",
                         "type": "uint256"
                    },
                    {
                         "internalType": "uint256",
                         "name": "eth",
                         "type": "uint256"
                    },
                    {
                         "internalType": "uint256",
                         "name": "time",
                         "type": "uint256"
                    },
                    {
                         "internalType": "uint256",
                         "name": "ethWorth",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "_totalEthOnContract",
                         "type": "uint256"
                    }
               ],
               "name": "winnersEthDivision",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    },
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    },
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          }
     ]
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     contract = new ethers.Contract(Address, Abi, signer);
     
};
export default connectContract;
export { contract };
