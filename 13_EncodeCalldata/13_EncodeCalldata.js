import { ethers } from "ethers";

//准备 alchemy API 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md
const ALCHEMY_GOERLI_URL =
  "https://eth-sepolia.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm";
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

// 利用私钥和provider创建wallet对象
const privateKey =
  "e500a9d0c7458a401a31751124f6b8e2d3671cfa3e375bde69e859e51ae75c02";
const wallet = new ethers.Wallet(privateKey, provider);

// WETH的ABI
const abiWETH = [
  "function balanceOf(address) public view returns(uint)",
  "function deposit() public payable",
];
// WETH合约地址（Goerli测试网）
const addressWETH = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6";
// 声明WETH合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

async function main() {
  const address = await wallet.getAddress();
  // 1. 读取WETH合约的链上信息（WETH abi）
  console.log("\n1. 读取WETH余额");
  // 编码calldata
  const param1 = contractWETH.interface.encodeFunctionData("balanceOf", [
    address,
  ]);
  console.log(`编码结果： ${param1}`);

  const tx1 = { to: addressWETH, data: param1 };
  // 发起交易，可读操作（view/pure）可以用 provider.call(tx)
  const balanceWETH = await provider.call(tx1);
  console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);

  const param2 = contractWETH.interface.encodeFunctionData("deposit");
  console.log(`编码结果： ${param2}`);
  const tx2 = {to: addressWETH, data: param2, value:ethers.paresenEther("0.001")}
  const receipt1 = await wallet.sendTransaction(tx2)
  await receipt1.wait()
  console.log(`交易详情：`)
  console.log(receipt1)
  const balanceWETH_deposit = await contractWETH.balanceOf(address)
  console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`)
}

main();
