import { ethers } from "ethers";
// 准备 alchemy API
// 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md
const ALCHEMY_MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm";
// 连接主网 provider
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// USDT的合约地址
const contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
// 构建USDT的Transfer的ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
];
// 生成USDT合约对象
const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

async function main() {
  // 只监听一次
  console.log("\n1. 利用contract.once()，监听一次Transfer事件");
  contractUSDT.once("Transfer", (from, to, value) => {
    // 打印结果
    console.log(
      `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
    );
  });
  // 持续监听USDT合约
  console.log("\n2. 利用contract.on()，持续监听Transfer事件");
  contractUSDT.on("Transfer", (from, to, value) => {
    console.log(
      // 打印结果
      `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
    );
  });
}
main();
