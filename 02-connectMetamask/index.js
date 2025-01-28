import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";

const ethereumButton = document.querySelector(".connect");
const showAccount = document.querySelector(".showAccount");
const showChainID = document.querySelector(".showChainID");
const showETHBalance = document.querySelector(".showETHBalance");


// Connect to the Ethereum network
// const provider = new JsonRpcProvider(
//   "https://eth-mainnet.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm"
// );

const onClickHandler = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);

  const accounts = await provider.send("eth_requestAccounts", []);
  const account = accounts[0];
  console.log(`钱包地址:${account}`);
  showAccount.innerHTML = account;

  const { chainId } = await provider.getNetwork();
  console.log(`ChainID: ${chainId}`);
  showChainID.innerHTML = chainId;

  const signer = await provider.getSigner();
  const balance = await provider.getBalance(signer.getAddress());
  console.log(`ETH 余额: ${ethers.formatUnits(balance)}`);
  showETHBalance.innerHTML = ethers.formatUnits(balance);
};

ethereumButton.addEventListener(`click`, onClickHandler);
