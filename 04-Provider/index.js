import { ethers } from "ethers";

const main = async () => {
  const ALCHEMY_SEPOLIA_URL =
    "https://eth-sepolia.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm";

  const accountAddress = "0x2282050684b096d36393e3d60F4bBa3f3d0cC661";

  const providerSepolia = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

  const balanceSepolia = await providerSepolia.getBalance(accountAddress);
  console.log(`ETH Balance of mine: ${ethers.formatEther(balanceSepolia)} ETH`);

  const network = await providerSepolia.getNetwork();
  console.log("链信息:", network.toJSON());

  const blockNumber = await providerSepolia.getBlockNumber();
  console.log("区块高度:", blockNumber);

  const txCount = await providerSepolia.getTransactionCount(accountAddress);
  console.log("交易数量:", txCount);

  const feeData = await providerSepolia.getFeeData();
  console.log("费用数据:", feeData);
  

  const block = await providerSepolia.getBlock(0);
  console.log("区块数据:", block);

  const code = await providerSepolia.getCode(
    "0xc778417e063141139fce010982780140aa0cd5ab"
  );
  console.log("合约代码:", code);
};

main();
