import { ethers } from "ethers";
// 利用Alchemy的rpc节点连接以太坊网络
// 准备 alchemy API 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md
const ALCHEMY_GOERLI_URL =
  "https://eth-sepolia.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm";
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

// WETH ABI，只包含我们关心的Transfer事件
const abiWETH = [
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

async function main() {
  // 测试网WETH地址
  const addressWETH = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6";
  // 声明合约实例
  const contract = new ethers.Contract(addressWETH, abiWETH, provider);
  const block = await provider.getBlockNumber();
  console.log(`当前区块高度: ${block}`);
  console.log(`打印事件详情:`);
  const transferEvents = await contract.queryFilter(
    "Transfer",
    block - 10,
    block
  );
  console.log(transferEvents[0]);

  // 解析Transfer事件的数据（变量在args中）
  console.log("\n2. 解析事件：");
  const amount = ethers.formatUnits(
    ethers.getBigInt(transferEvents[0].args["amount"]),
    "ether"
  );
  console.log(
    `地址 ${transferEvents[0].args["from"]} 转账${amount} WETH 到地址 ${transferEvents[0].args["to"]}`
  );
}
main();
