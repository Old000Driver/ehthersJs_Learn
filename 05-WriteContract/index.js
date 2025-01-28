import { ethers } from "ethers";

const ALCHEMY_Ethereum_URL =
  "https://eth-mainnet.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm";

const provider = new ethers.JsonRpcProvider(ALCHEMY_Ethereum_URL);

// 第1种输入abi的方式: 复制abi全文
// WETH的abi可以在这里复制：https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code
const abiWETH = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view",...太长后面省略...';
const addressWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // WETH Contract
const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)


const abiERC20 = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];
const addressDAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI Contract
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider);

const main = async () => {
  // 1. 读取WETH合约的链上信息（WETH abi）
  const nameWETH = await contractWETH.name();
  const symbolWETH = await contractWETH.symbol();
  const totalSupplyWETH = await contractWETH.totalSupply();
  console.log("\n1. 读取WETH合约信息");
  console.log(`合约地址: ${addressWETH}`);
  console.log(`名称: ${nameWETH}`);
  console.log(`代号: ${symbolWETH}`);
  console.log(`总供给: ${ethers.formatEther(totalSupplyWETH)}`);
  const balanceWETH = await contractWETH.balanceOf("vitalik.eth");
  console.log(`Vitalik持仓: ${ethers.formatEther(balanceWETH)}\n`);

  const nameDAI = await contractDAI.name();
  const symbolDAI = await contractDAI.symbol();
  const totalSupplyDAI = await contractDAI.totalSupply();
  console.log("\n1. 读取DAI 合约信息");
  console.log(`合约地址: ${addressDAI}`);
  console.log(`名称: ${nameDAI}`);
  console.log(`代号: ${symbolDAI}`);
  console.log(`总供给: ${ethers.formatEther(totalSupplyDAI)}`);
  const balanceDAI = await contractDAI.balanceOf("vitalik.eth");
  console.log(`Vitalik持仓: ${ethers.formatEther(balanceDAI)}\n`);
};
main();
