import { FeeData } from "ethers";
import { ethers } from "ethers";
const ALCHEMY_SEPOLIA_URL = 'https://eth-sepolia.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm';
const ALCHEMY_ETH_URL = 'https://eth-mainnet.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm';
const providerSepolia = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const providerETH = new ethers.JsonRpcProvider(ALCHEMY_ETH_URL);
const main = async () => {
    // const balance = await providerSepolia.getBalance(`0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`);
    // console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);

    // console.log("\n2. 查询provider连接到了哪条链")
    // const network = await providerSepolia.getNetwork();
    // console.log(network.toJSON());

    // console.log("\n3. 查询区块高度")
    // const blockNumber = await providerSepolia.getBlockNumber();
    // console.log(`Current block number: ${blockNumber}`);

    // // 查询交易次数
    // console.log("\n4. 查询交易次数")
    // const txCount = await providerETH.getTransactionCount("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
    // console.log(`txCount: ${txCount}`)

    // // 查询建议gas设置
    // console.log("\n5. 查询建议gas设置")
    // const feeData = await providerETH.getFeeData();
    // console.log(feeData)

    // 查询区块信息
    console.log("\n6. 查询区块信息")
    const block  = await providerETH.getBlock(0);
    console.log(block)

    // 查询合约bytecode
    console.log("\n7. 查询合约bytecode")
    const code = await providerETH.getCode("0xc778417e063141139fce010982780140aa0cd5ab");
    console.log(code)


}
main()