import { ethers } from "ethers";
import { JsonRpcProvider } from "ethers";

// Connect to the Ethereum network
const provider = new JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm"
);

const main = async () => {
  const balance = await provider.getBalance(`vitalik.eth`);
  console.log(`ETH Balance of vitalik:${ethers.formatEther(balance)} ETH`);
};

main();
