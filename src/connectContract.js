// import { ethers } from "ethers";
// let contract;
// const connectContract = async () => {
//      const Address = "0x4d260c4fE4C6561a5A9aebc039Bbd0Ccf541bF3f";
//      const Abi = [
//           {
//                "inputs": [],
//                "stateMutability": "nonpayable",
//                "type": "constructor"
//           },
//           {
//                "anonymous": false,
//                "inputs": [
//                     {
//                          "indexed": true,
//                          "internalType": "address",
//                          "name": "owner",
//                          "type": "address"
//                     },
//                     {
//                          "indexed": true,
//                          "internalType": "address",
//                          "name": "spender",
//                          "type": "address"
//                     },
//                     {
//                          "indexed": false,
//                          "internalType": "uint256",
//                          "name": "value",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "Approval",
//                "type": "event"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "spender",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "amount",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "approve",
//                "outputs": [
//                     {
//                          "internalType": "bool",
//                          "name": "",
//                          "type": "bool"
//                     }
//                ],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "amount",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "burn",
//                "outputs": [],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "account",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "amount",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "burnFrom",
//                "outputs": [],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "spender",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "subtractedValue",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "decreaseAllowance",
//                "outputs": [
//                     {
//                          "internalType": "bool",
//                          "name": "",
//                          "type": "bool"
//                     }
//                ],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "_user",
//                          "type": "address"
//                     }
//                ],
//                "name": "getUserLockUnlockToken",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "spender",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "addedValue",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "increaseAllowance",
//                "outputs": [
//                     {
//                          "internalType": "bool",
//                          "name": "",
//                          "type": "bool"
//                     }
//                ],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "safety",
//                "outputs": [],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "swap",
//                "outputs": [],
//                "stateMutability": "payable",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "_amount",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "swapBack",
//                "outputs": [],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "anonymous": false,
//                "inputs": [
//                     {
//                          "indexed": true,
//                          "internalType": "address",
//                          "name": "sender",
//                          "type": "address"
//                     },
//                     {
//                          "indexed": false,
//                          "internalType": "uint256",
//                          "name": "ethAmount",
//                          "type": "uint256"
//                     },
//                     {
//                          "indexed": false,
//                          "internalType": "uint256",
//                          "name": "tokensReceived",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "TokensSwapped",
//                "type": "event"
//           },
//           {
//                "anonymous": false,
//                "inputs": [
//                     {
//                          "indexed": true,
//                          "internalType": "address",
//                          "name": "recipient",
//                          "type": "address"
//                     },
//                     {
//                          "indexed": false,
//                          "internalType": "uint256",
//                          "name": "ethAmount",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "TokensSwappedBack",
//                "type": "event"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "to",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "amount",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "transfer",
//                "outputs": [
//                     {
//                          "internalType": "bool",
//                          "name": "",
//                          "type": "bool"
//                     }
//                ],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "anonymous": false,
//                "inputs": [
//                     {
//                          "indexed": true,
//                          "internalType": "address",
//                          "name": "from",
//                          "type": "address"
//                     },
//                     {
//                          "indexed": true,
//                          "internalType": "address",
//                          "name": "to",
//                          "type": "address"
//                     },
//                     {
//                          "indexed": false,
//                          "internalType": "uint256",
//                          "name": "value",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "Transfer",
//                "type": "event"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "from",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "address",
//                          "name": "to",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "amount",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "transferFrom",
//                "outputs": [
//                     {
//                          "internalType": "bool",
//                          "name": "",
//                          "type": "bool"
//                     }
//                ],
//                "stateMutability": "nonpayable",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "owner",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "address",
//                          "name": "spender",
//                          "type": "address"
//                     }
//                ],
//                "name": "allowance",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "account",
//                          "type": "address"
//                     }
//                ],
//                "name": "balanceOf",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "contractBalance",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "decimals",
//                "outputs": [
//                     {
//                          "internalType": "uint8",
//                          "name": "",
//                          "type": "uint8"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "InitialSwapingRate",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "_user",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "_amount",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "isUserCanSwapBack",
//                "outputs": [
//                     {
//                          "internalType": "bool",
//                          "name": "",
//                          "type": "bool"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "lockingPeriod",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "_user",
//                          "type": "address"
//                     }
//                ],
//                "name": "lockUnlockTokens",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "_locked",
//                          "type": "uint256"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "_unLocked",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "name",
//                "outputs": [
//                     {
//                          "internalType": "string",
//                          "name": "",
//                          "type": "string"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "owner",
//                "outputs": [
//                     {
//                          "internalType": "address",
//                          "name": "",
//                          "type": "address"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "_token",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "swapBackConvert",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "_totalETH",
//                          "type": "uint256"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "_eth",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "swapConvert",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "symbol",
//                "outputs": [
//                     {
//                          "internalType": "string",
//                          "name": "",
//                          "type": "string"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "totalETH",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [],
//                "name": "totalSupply",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "",
//                          "type": "address"
//                     }
//                ],
//                "name": "totalSwaped",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "",
//                          "type": "address"
//                     }
//                ],
//                "name": "txCount",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "",
//                          "type": "address"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "",
//                          "type": "uint256"
//                     }
//                ],
//                "name": "userData",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "token",
//                          "type": "uint256"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "eth",
//                          "type": "uint256"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "time",
//                          "type": "uint256"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "swapBack",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           },
//           {
//                "inputs": [
//                     {
//                          "internalType": "address",
//                          "name": "_user",
//                          "type": "address"
//                     }
//                ],
//                "name": "userTokenInfo",
//                "outputs": [
//                     {
//                          "internalType": "uint256",
//                          "name": "token",
//                          "type": "uint256"
//                     },
//                     {
//                          "internalType": "uint256",
//                          "name": "eth",
//                          "type": "uint256"
//                     }
//                ],
//                "stateMutability": "view",
//                "type": "function"
//           }
//      ];
//      const provider = new ethers.providers.Web3Provider(window.ethereum);
//      const signer = provider.getSigner();
//      contract = new ethers.Contract(Address, Abi, signer);
     
// };
// export default connectContract;
// export { contract };



//import { ethers } from "ethers";
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);

let contract;
let contractCall;
let Address1 = "0xc0729752466d1797dAb25afC12b05d7Ba8ac434b"//"0xcC0A6A7E214D76D59f610CA4F6C3Ab4cd3D72096";
     let Abi1 = [{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"burnTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"ClaimedInsurance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"ClaimedLastBuyer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"ClaimedLeader","type":"event"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"dividendClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"Insurance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"insuranceClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastBuyerClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"leaderClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swap","outputs":[],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensReceived","type":"uint256"}],"name":"TokensSwapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethAmount","type":"uint256"}],"name":"TokensSwappedBack","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"aTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Bps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Countdown","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"day_1_time","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethOnContractAfterEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getDividend","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getInsuranceById","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInsuranceWinners","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"token","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"internalType":"struct A_PONZU3.InsuranceData[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"insuranceClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"insuranceCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastBuyer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"leaderboardScore","outputs":[{"internalType":"address[5]","name":"","type":"address[5]"},{"internalType":"uint256[5]","name":"","type":"uint256[5]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"leaderClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LiveTimer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokens","type":"uint256"},{"internalType":"uint256","name":"_contractBalance","type":"uint256"}],"name":"swapBackConvert","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_eth","type":"uint256"}],"name":"swapConvert","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userData","outputs":[{"internalType":"uint256","name":"token","type":"uint256"},{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"ethWorth","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_totalEthOnContract","type":"uint256"}],"name":"winnersEthDivision","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
//      const connectContract = async () => {
//      let Address = "0xc0729752466d1797dAb25afC12b05d7Ba8ac434b"//s0xcC0A6A7E214D76D59f610CA4F6C3Ab4cd3D72096";
//      let Abi = [{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"burnTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"ClaimedInsurance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"ClaimedLastBuyer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"ClaimedLeader","type":"event"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"dividendClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"Insurance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"insuranceClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastBuyerClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"leaderClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swap","outputs":[],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensReceived","type":"uint256"}],"name":"TokensSwapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethAmount","type":"uint256"}],"name":"TokensSwappedBack","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"aTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Bps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Countdown","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"day_1_time","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethOnContractAfterEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getDividend","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getInsuranceById","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInsuranceWinners","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"token","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"internalType":"struct A_PONZU3.InsuranceData[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"insuranceClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"insuranceCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastBuyer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"leaderboardScore","outputs":[{"internalType":"address[5]","name":"","type":"address[5]"},{"internalType":"uint256[5]","name":"","type":"uint256[5]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"leaderClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LiveTimer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokens","type":"uint256"},{"internalType":"uint256","name":"_contractBalance","type":"uint256"}],"name":"swapBackConvert","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_eth","type":"uint256"}],"name":"swapConvert","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userData","outputs":[{"internalType":"uint256","name":"token","type":"uint256"},{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"ethWorth","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_totalEthOnContract","type":"uint256"}],"name":"winnersEthDivision","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
    
//      const provider = new ethers.providers.Web3Provider(window.ethereum);
//      const signer = provider.getSigner();
//      contract = new ethers.Contract(Address, Abi, signer);
//      contractCall = new web3.eth.Contract(Abi, Address);
     
     
// };
//export default connectContract;
//export { contract };
export { contractCall };
export { Abi1 };
export { Address1 };


