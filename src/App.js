import { MdOutlineSwapVert } from 'react-icons/md';
import Swal from "sweetalert2";
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useDisconnect } from 'wagmi'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { useWeb3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygonMumbai, mainnet, polygon, sepolia } from 'wagmi/chains'
import './App.css';
import connectContract, { contract } from './connectContract';
import Web3 from 'web3';
import Abi1 from './abi.json'

const web3 = new Web3(window.ethereum);
let Address1 = "0x10A61a8FB2748314dF4a28332D31f13b895dDD9d"
let contractCall = new web3.eth.Contract(Abi1, Address1);
const chains = [polygonMumbai, mainnet, polygon]
const projectId = 'e5ee2dc4de76240fc63dcea932f9ad42'

//setup the wagmi config using walletconnect web3modal
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})

const ethereumClient = new EthereumClient(wagmiConfig, chains);
function App() {

  const { address, isConnected,isConnecting, isDisconnected } = useAccount()
  const { isOpen, open, close, setDefaultChain } = useWeb3Modal()
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [totalEth, setTotalEth] = useState(0);
  const [chainId, setChainId] = useState();
  const [txnLoading, setTxnLoading] = useState(false);
  const [txDone, setTxDone] = useState(false);
  const [back, setBack] = useState(false);
  const [userToken, setUserToken] = useState('0.0');
  const [userEth, setUserEth] = useState('0.0');
 // const [address, setAccount] = useState('')
 // const [isConnected, setIsConnected] = useState(false)
  const [countdown, setCountdown] = useState({ days: "", hours: "", minutes: "", seconds: "" })
  const [leaderboard,setLeaderboard] = useState([])
  // connect smart contract with ui


  // const open = async () => {
  //   let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //   setAccount(accounts[0])
  //   setIsConnected(true)
  // }

  // useEffect(() => {
  //   if (address.length > 0) {
  //     setIsConnected(true)
  //   }
  // }, [])

  //get the total ether in the contract
  async function contractBalance() {
    try {
      console.log("contract balance");
      // const eth = await contract.contractBalance();
      const eth = await contractCall.methods.contractBalance().call();

      setTotalEth(eth.toString());
      console.log("total ether : ", eth.toString());
    } catch (error) {
      console.log("error : ", error);
    }
  }
  useEffect(() => {
    if (isConnected) {
      contractBalance();
    }
  }, [])



  //check the chain if it is mumbai testnet
  useEffect(() => {
    const { ethereum } = window;
    const checkChain = async () => {
      const chainId = await ethereum.request({ method: 'eth_chainId' });

      setChainId(chainId);
       if(chainId!=="0x13881"){
      //if (chainId !== "0xaa36a7") {

        Swal.fire({
          icon: "error",
          title: "Wrong Network",
          text: "Please connect to Mumbai Testnet",
        });

      }
    }
    if (isConnected) { checkChain(); }
  }, [address])

  //Convert the eth into tokens 
  // async function swapConvert(){
  //   let token
  //   try {

  //        token =  await contract.swapConvert((totalEth.toString()),(ethers.utils.parseEther(value1)));


  //   }catch (error) {
  //        console.log("error : ", error);
  //   }
  //   setValue2(token/10**18);
  // }



  // //Convert the tokens into eth
  // async function swapBackConvert(){
  //   let eth;
  //   try{
  //     eth = await contract.swapBackConvert(ethers.utils.parseEther(value1))
  //   }catch(error){
  //     console.log("error : ", error);
  //   }
  //   setValue2(eth/10**18);
  // }

  // useEffect(()=>{
  //   if (isConnected) {
  //     if(!back){
  //       swapConvert();
  //     }
  //     else{
  //       swapBackConvert();
  //     }
  //   }
  // },[value1])


    //handle the value for input 1
    async function handleValue1(event){
      // const newValue = event.target.value;
      // setTxDone(!txDone);
      // setValue1(newValue);
  
      let newValue;
      if (event.target.value == 0 || event.target.value == '' || event.target.value == null) {
        newValue = 0
      } else {
        newValue = event.target.value;
      }
      
      setValue1(newValue);
      newValue=newValue*10**18
  
      try {
  
        let ponzu3 = await contractCall.methods.swapConvert(newValue.toString()).call()
        
        ponzu3 = parseInt(ponzu3)
        ponzu3=(ponzu3/10**18).toLocaleString("fullwide", {
          useGrouping: false,
        });
        if(isNaN(ponzu3)){
          setValue2(0);
        }
        setValue2(ponzu3)
       
      } catch (error) {
        console.log("error : ", error);
      }
       
  
  
    }
  
    //handle the revert button between eth and tokens
    function handleBack(){
      setBack(!back);
      setTxDone(!txDone);
      setValue1(0);
      setValue2(0);
    }
  

  //swap the eth into tokens
  async function swap(){
    setTxnLoading(true);
    if(isConnected){
    if(chainId!=="0x13881"){
    //  if (chainId !== "0xaa36a7") {

      setTxnLoading(false);
      Swal.fire({
           icon: "error",
           title: "Wrong Network",
           text: "Please connect to Mumbai Testnet",
      });
    }
    else{
      try {
        let value = value1 * 10**18
        
        let swap = await contractCall.methods.swap()
        let encoded_tx = swap.encodeABI();

        
        let gasPrice = await web3.eth.getGasPrice();

        let gasLimit = await web3.eth.estimateGas({
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
          value:value
        });

        let trx = await web3.eth.sendTransaction({
          gasPrice: web3.utils.toHex(gasPrice),
          gas: web3.utils.toHex(gasLimit),
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
          value:value
        }
        )

        if (trx.transactionHash) {
          Swal.fire({
            icon: "success",
            title: "Transaction Sucessful",
            footer: `<a href="https://etherscan.io/tx/${trx.transactionHash}" target="_blank">Etherscan</a>`,
          });
        }

      } catch (error) {
        console.log(error)
        let errMsg = error.code == 100 ? error.message : error.data.message
        Swal.fire({
          icon: "error",
          title: "Transaction Failed",
          text: errMsg//error.message || error.reason || error.data.message,
        });
      }
    }
  }
  else{
    setTxnLoading(false);
    Swal.fire({
      icon: "error",
      title: "Transaction Failed",
      text: "Please connect to Metamask",
    });
  }
  }

  //swap the tokens into eth
  async function swapBack(){
    setTxnLoading(true);
    if(isConnected){
    if(chainId!=="0x13881"){
    //  if (chainId !== "0xaa36a7") {

      setTxnLoading(false);
      Swal.fire({
           icon: "error",
           title: "Wrong Network",
           text: "Please connect to Mumbai Testnet",
      });
    }
    else{
      try {

        
        let dividendClaim = await contractCall.methods.dividendClaim(address)
        let encoded_tx = dividendClaim.encodeABI();

        
        let gasPrice = await web3.eth.getGasPrice();

        let gasLimit = await web3.eth.estimateGas({
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
        
        });

        let trx = await web3.eth.sendTransaction({
          gasPrice: web3.utils.toHex(gasPrice),
          gas: web3.utils.toHex(gasLimit),
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
        }
        )

        if (trx.transactionHash) {
          Swal.fire({
            icon: "success",
            title: "Transaction Sucessful",
            footer: `<a href="https://etherscan.io/tx/${trx.transactionHash}" target="_blank">Etherscan</a>`,
          });
        }

      } catch (error) {
        console.log(error)
        let errMsg = error.code == 100 ? error.message : error.data.message
        Swal.fire({
          icon: "error",
          title: "Transaction Failed",
          text: errMsg//error.message || error.reason || error.data.message,
        });
      }
    }
  }
  else{
    setTxnLoading(false);
    Swal.fire({
      icon: "error",
      title: "Transaction Failed",
      text: "Please connect to Metamask",
    });
  }
  }
  

  //Get users tokens details
  // async function getUserTokens(){
  //   try{
  //     const userData = await contract.userTokenInfo(address)
  //     console.log("user data : ", userData[0].toString()/10**18, userData[1].toString()/10**18);
  //     setUserToken(userData[0].toString()/10**18);
  //     setUserEth(userData[1].toString()/10**18);
  //   }catch(error){
  //     console.log("error : ", error);
  //   }
  // }
  // useEffect(()=>{
  //   if(isConnected){
  //     getUserTokens();
  //   }
  // },[])
  async function insurance() {
    if (!isConnected) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: "Please connect to Metamask",
      });
      return
    }
    Swal.fire({
      title: 'Please enter token amount',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,

    }).then(async (result) => {
      if (result.isConfirmed) {

        if (result.value <= 0) {
          Swal.fire({
            icon: "error",
            title: "Transaction Failed",
            text: "Please Enter Value Greater then zero",
          });
          return
        }
        try {
          // console.log(await contractCall.methods.name().call())
          result.value=result.value*10**18
          let insurance = await contractCall.methods.Insurance(result.value.toString())
          let encoded_tx = insurance.encodeABI();


          let gasPrice = await web3.eth.getGasPrice();

          let gasLimit = await web3.eth.estimateGas({
            gasPrice: web3.utils.toHex(gasPrice),
            to: Address1,
            from: address,
            data: encoded_tx,
          });

          let trx = await web3.eth.sendTransaction({
            gasPrice: web3.utils.toHex(gasPrice),
            gas: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
            to: Address1,
            from: address,
            data: encoded_tx,
          }
          )

          if (trx.transactionHash) {
            Swal.fire({
              icon: "success",
              title: "Transaction Sucessful",
              footer: `<a href="https://etherscan.io/tx/${trx.transactionHash}" target="_blank">Etherscan</a>`,
            });
          }

        } catch (error) {
          console.log(error)
          let errMsg = error.code == 100 ? error.message : error.data.message
          Swal.fire({
            icon: "error",
            title: "Transaction Failed",
            text: errMsg//error.message || error.reason || error.data.message,
          });
        }
      }
    })

  }

  async function burningTime() {
    if (!isConnected) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: "Please connect to Metamask",
      });
      return
    }
    Swal.fire({
      title: 'Please enter token amount',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,

    }).then(async (result) => {
      if (result.isConfirmed) {

        if (result.value <= 0) {
          Swal.fire({
            icon: "error",
            title: "Transaction Failed",
            text: "Please Enter Value Greater then zero",
          });
          return
        }
        try {
          result.value=result.value*10**18
          let burnTime = await contractCall.methods.burnTime(result.value.toString())
          let encoded_tx = burnTime.encodeABI();


          let gasPrice = await web3.eth.getGasPrice();

          let gasLimit = await web3.eth.estimateGas({
            gasPrice: web3.utils.toHex(gasPrice),
            to: Address1,
            from: address,
            data: encoded_tx,
          });

          let trx = await web3.eth.sendTransaction({
            gasPrice: web3.utils.toHex(gasPrice),
            gas: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
            to: Address1,
            from: address,
            data: encoded_tx,
          }
          )

          if (trx.transactionHash) {
            Swal.fire({
              icon: "success",
              title: "Transaction Sucessful",
              footer: `<a href="https://etherscan.io/tx/${trx.transactionHash}" target="_blank">Etherscan</a>`,
            });
          }

        } catch (error) {
          console.log(error)
          let errMsg = error.code == 100 ? error.message : error.data.message
          Swal.fire({
            icon: "error",
            title: "Transaction Failed",
            text: errMsg//error.message || error.reason || error.data.message,
          });
        }
      }
    })

  }

  async function insuranceClaim() {
    if (!isConnected) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: "Please connect to Metamask",
      });
      return
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Claim Insurance'

    }).then(async (result) => {

      if (!result.isConfirmed) {
        return
      }
      try {
        let insuranceClaim = await contractCall.methods.insuranceClaim()
        let encoded_tx = insuranceClaim.encodeABI();


        let gasPrice = await web3.eth.getGasPrice();

        let gasLimit = await web3.eth.estimateGas({
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
        });

        let trx = await web3.eth.sendTransaction({
          gasPrice: web3.utils.toHex(gasPrice),
          gas: web3.utils.toHex(gasLimit),
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
        }
        )

        if (trx.transactionHash) {
          Swal.fire({
            icon: "success",
            title: "Transaction Sucessful",
            footer: `<a href="https://etherscan.io/tx/${trx.transactionHash}" target="_blank">Etherscan</a>`,
          });
        }

      } catch (error) {
        console.log(error.code == 100 ? error.message : "uu")
        let errMsg = error.code == 100 ? error.message : error.data.message
        Swal.fire({
          icon: "error",
          title: "Transaction Failed",
          text: errMsg//error.message || error.reason || error.data.message,
        });
      }

    })

  }

  async function lastBuyerClaim() {
    if (!isConnected) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: "Please connect to Metamask",
      });
      return
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Claim Last Buyer'

    }).then(async (result) => {

      if (!result.isConfirmed) {
        return
      }
      try {
        let lastBuyerClaim = await contractCall.methods.lastBuyerClaim()
        let encoded_tx = lastBuyerClaim.encodeABI();


        let gasPrice = await web3.eth.getGasPrice();

        let gasLimit = await web3.eth.estimateGas({
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
        });

        let trx = await web3.eth.sendTransaction({
          gasPrice: web3.utils.toHex(gasPrice),
          gas: web3.utils.toHex(gasLimit),
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
        }
        )

        if (trx.transactionHash) {
          Swal.fire({
            icon: "success",
            title: "Transaction Sucessful",
            footer: `<a href="https://etherscan.io/tx/${trx.transactionHash}" target="_blank">Etherscan</a>`,
          });
        }

      } catch (error) {
        console.log(error)
        let errMsg = error.code == 100 ? error.message : error.data.message
        Swal.fire({
          icon: "error",
          title: "Transaction Failed",
          text: errMsg//error.message || error.reason || error.data.message,
        });
      }

    })

  }

  async function leaderClaim() {
    if (!isConnected) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: "Please connect to Metamask",
      });
      return
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Claim Leader'

    }).then(async (result) => {

      if (!result.isConfirmed) {
        return
      }
      try {
        let leaderClaim = await contractCall.methods.leaderClaim()
        let encoded_tx = leaderClaim.encodeABI();


        let gasPrice = await web3.eth.getGasPrice();

        let gasLimit = await web3.eth.estimateGas({
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
        });

        let trx = await web3.eth.sendTransaction({
          gasPrice: web3.utils.toHex(gasPrice),
          gas: web3.utils.toHex(gasLimit),
          gasPrice: web3.utils.toHex(gasPrice),
          to: Address1,
          from: address,
          data: encoded_tx,
        }
        )

        if (trx.transactionHash) {
          Swal.fire({
            icon: "success",
            title: "Transaction Sucessful",
            footer: `<a href="https://etherscan.io/tx/${trx.transactionHash}" target="_blank">Etherscan</a>`,
          });
        }

      } catch (error) {
        console.log(error)
        let errMsg = error.code == 100 ? error.message : error.data.message
        Swal.fire({
          icon: "error",
          title: "Transaction Failed",
          text: errMsg//error.message || error.reason || error.data.message,
        });
      }

    })

  }

  async function leaderBoardScore() {
    try {

       let leaderboardScore = await contractCall.methods.leaderboardScore().call()
      let arr=[{}]
     for(let i = 0;i<leaderboardScore[0].length;i++){
      let amm=parseFloat(leaderboardScore[1][i])
       
      amm=(amm/10**18).toLocaleString("fullwide", {
        useGrouping: false,
      });
       
      arr[i] = {"address":leaderboardScore[0][i],"amount":amm}
     }
     setLeaderboard(arr)

    } catch (error) {
      console.log("error : ", error);
    }
  }
  async function fetchCountDown() {
    try {

      let countDownDate1 = await contractCall.methods.Countdown().call()
      countDownDate1 = parseInt(countDownDate1)
      countDownDate1 = countDownDate1 / 10 ** 18
     // console.log(countDownDate1)
     // return countDownDate

      let  countDownDate = new Date("Jul 10, 2023 15:37:25").getTime();


      //   // Get today's date and time
      var now = new Date().getTime();
      
      // Find the distance between now and the count down date
     // var distance = countDownDate - now;
      var distance = countDownDate1

      // Time calculations for days, hours, minutes and seconds

      // var d = Math.floor(distance / (3600 * 24));
      // var h = Math.floor(distance % (3600 * 24) / 3600);
      // var m = Math.floor(distance % 3600 / 60);
      // var s = Math.floor(distance % 60)
     
            var d = Math.floor(distance / (1000 * 60 * 60 * 24));
            var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var s = Math.floor((distance % (1000 * 60)) / 1000);
      //      setCountdown({days:days,hours:hours,minutes:minutes,seconds:seconds})
      //console.log({days:d,hours:h,minutes:m,seconds:s})

       setCountdown({days:d,hours:h,minutes:m,seconds:s})

    } catch (error) {
      console.log("error : ", error);
    }
  }
  useEffect( () => {
    const checkChain = async () => {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
     
      setChainId(chainId);
      if (chainId !== "0x13881") {
     // if (chainId !== "0xaa36a7") {

        


      } else {
        fetchCountDown()
      }
    }

    if (window.ethereum) {
      setInterval(async () => {
        fetchCountDown()
        leaderBoardScore()
        
        //checkChain(); 
      }, 1000)
    }

  },[])


  return (
    <div className="App">
      <div className='bg-[#00000030]'>

        <WagmiConfig config={wagmiConfig}>
          <div className="bg-bg-img bg-cover min-h-screen bg-no-repeat md:px-5 px-2 py-5 mix-blend-overlay">
            <div className="flex justify-between items-center flex-wrap gap-5 px-5">
              <div >
                <img
                  src={process.env.PUBLIC_URL + "/images/images/logo.png"}
                  className="max-w-[160px] w-full"
                />
              </div>
              <div>
              <h1 className='text-6xl text-center text-white font-bold mb-5 ml-5' >{countdown.days+':'+countdown.hours+':'+countdown.minutes+':'+countdown.seconds}</h1>

              </div>
              <div>
                <button className="bg-yellow px-[3rem] py-2 border-orange rounded-lg border-4 ">
                  <h1 className="text-xl font-bold" onClick={() => open()} >{isConnected ? `${address.substring(
                    0,
                    4
                  )}....${address.substring(
                    address.length - 4,
                    address.length
                  )}` : "Metamask"}</h1>
                </button>
              </div>
            </div>
            <div className="flex justify-center  items-start  gap-[4rem] md:gap-5 md:px-5 px-2 flex-col md:flex-row ">
              <div className=' '>
                <h1 className='text-3xl text-white mb-1'>Leaderboard</h1>
                <div>

                  <div className='text-white gap-4 border-[#204B31] bg-[#0000008a] border-4 max-w-[320px] rounded-lg  px-5 py-2'>
                    <h4 className='text-xl mb-2'> Potential payout &nbsp;ETH:</h4>
                    <table className=' mx-auto'>

                      {/* <tr>
                        <td>1</td>&nbsp;
                        <td>00.0000...000</td>&nbsp;
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <td>2</td>&nbsp;
                        <td>00.0000...000</td>&nbsp;
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <td>3</td>&nbsp;
                        <td>00.0000...000</td>&nbsp;
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <td>4</td>&nbsp;
                        <td>00.0000...000</td>&nbsp;
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <td>5</td>&nbsp;
                        <td>00.0000...000</td>&nbsp;
                        <td>0.00</td>
                      </tr> */}
 {leaderboard.length>0?
             leaderboard.map((item,index)=>( <tr>
                <td>{index}</td>&nbsp;
                <td>{item.address.toString().substring(0,4)}....{item.address.toString().substring(item.address.length-4,item.address.length)}</td>&nbsp;
                <td>{parseFloat(item.amount).toFixed(2)}</td>
              </tr>))
              :
              <tr>
                <td>5</td>&nbsp;
                <td>00.0000...000</td>&nbsp;
                <td>0.00</td>
              </tr>}
                    </table>

                  </div>


                </div>
                <div className='md:mt-[6rem] mt-5'>
                  <h1 className='text-3xl text-white'>Claims:</h1>
                  <div className='py-4 flex gap-4 flex-wrap '>
                  <button className='bg-green px-5 py-2 text-white rounded-lg text-2xl' onClick={() => insuranceClaim()}>Insurance</button>
                <button className='bg-green px-5 py-2 text-white rounded-lg text-2xl'onClick={() => lastBuyerClaim()}>Leaderboard</button>
                <button className='bg-green px-5 py-2 text-white rounded-lg text-2xl'onClick={() => leaderClaim()}>Pool</button>
              </div>
                </div>
              </div>
              <div className=" max-w-[500px] w-full mr-auto mt-10  ">
                <h1 className="text-center font-bold text-4xl text-white capitalize ">
                  ETH POOL:
                </h1>
                <h1 className="text-center font-bold text-5xl text-white py-5 leading-8">
                  {totalEth / 10 ** 18}
                </h1>
                <div className="justify-center flex flex-col mb-5 relative">
                  <div className=" flex justify-between border-4 px-4  border-purple relative rounded-lg  w-full bg-white focus-0 mb-3  mx-auto py-1">
                    <input
                      type="text"
                      value={value1}
                      placeholder='0'
                      onChange={(event) =>
                        handleValue1(event)
                      }
                      className='max-w-[400px] w-full'
                    />
                    <p className='border border-4 rounded-lg border-purple px-1 font-bold min-w-[70px] text-center'>{back ? "PONZU3" : "ETH"}</p>
                  </div>



                  <div className="absolute top-[24%] left-[44%] z-50  bg-white">
                    <MdOutlineSwapVert size={40} className="border-4 border-black  rounded-lg" onClick={handleBack} />
                  </div>

                  <div className=" flex jsutify-between border-4 px-4  border-purple relative rounded-lg  w-full bg-white focus-0 mb-3  mx-auto py-1">
                    <input
                      type="text"
                      value={value2}
                      placeholder='0'
                      className='max-w-[500px] w-full'
                      readOnly={true}
                    />
                    <p className='border border-4 rounded-lg border-purple px-1  font-bold min-w-[70px] text-center'>{back ? "ETH" : "PONZU3"}</p>
                  </div>

                </div>

                <div className="text-center">
                  {txnLoading ? <div className='flex justify-center'><HashLoader
                    color="#49FF88"
                    loading={txnLoading}
                  /></div> :
                    <div className='flex-direction-coloumn justify-center '>
                      <button className="bg-green px-[4rem]  border-darkgreen  border-4 font-bold text-2xl py-2 rounded-lg my-3" onClick={back ? swapBack : swap}> SWAP</button>

                    </div>
                  }
                </div>
                {/* <p className="text-white  text-center py-4 text-3xl">
          Your PONZU3 is balance of {userToken} is now worth{" "}
          <span className="text-green font-bold">{userEth}  </span> Eth
        </p> */}
                <p className="text-white  text-center pt-4 text-lg md:text-3xl">
                  Your<span className='pt-4 pb-5 px-2 bg-[#FD4674] text-white'>
                    PONZU3 dividends: <span className='text-[#68EB92]'>0.0</span>
                  </span>
                  Eth
                </p>

                <div className='text-center mb-[-3rem]'>
                <button className="bg-green px-[4rem]  border-darkgreen  border-4 font-bold text-2xl py-2 rounded-lg " onClick={back?swapBack:swapBack}> Claim</button>
                </div>

              </div>
              <div className="">
       
       <img
             src={process.env.PUBLIC_URL + "/images/images/Insurance.png"}
             className="max-w-[120px] w-full mb-5"
             onClick={() => insurance()}
           />
 
        <img
             src={process.env.PUBLIC_URL + "/images/images/Burntime.png"}
             className="max-w-[120px] w-full"
             onClick={() => burningTime()}
           />
       </div>

            </div>

          </div>


        </WagmiConfig>

        <Web3Modal
          projectId={projectId} ethereumClient={ethereumClient}
        />

      </div>
    </div>
  );
}

export default App;






















