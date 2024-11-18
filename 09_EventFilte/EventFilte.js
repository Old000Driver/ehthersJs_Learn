import { ethers } from "ethers";
// 准备 alchemy API
// 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md
const ALCHEMY_MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm";
// 连接主网 provider
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'

const accountBinance = "0x28C6c06298d514Db089934071355E5743bf21d60";
// 构建ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address) public view returns(uint)",
];
// 构建合约对象
const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);

async function main() {
  const balanceUSDT = await contractUSDT.balanceOf(accountBinance);
  console.log(
    `\n当前${accountBinance}的USDT余额为: ${ethers.formatUnits(balanceUSDT, 6)}`
  );

  // 2. 创建过滤器，监听转移USDT进交易所
  console.log("\n2. 创建过滤器，监听USDT转进交易所");
  let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
  console.log("过滤器详情：");
  console.log(filterBinanceIn);
  contractUSDT.on(filterBinanceIn, (res) => {
    console.log("---------监听USDT进入交易所--------");
    console.log(
      `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`
    );
  });
}

main();
