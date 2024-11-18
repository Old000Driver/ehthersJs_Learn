// 利用Wallet类发送ETH
// 由于playcode不支持ethers.Wallet.createRandom()函数，我们只能用VScode运行这一讲代码
import { ethers } from "ethers";

// 利用Alchemy的rpc节点连接以太坊测试网络
// 准备 alchemy API 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md
const ALCHEMY_GOERLI_URL =
  "https://eth-sepolia.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm";
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

const wallet1 = ethers.Wallet.createRandom();
const wallet1WithProvider = wallet1.connect(provider);
const mnemonic = wallet1.mnemonic;

const privateKey =
  "e500a9d0c7458a401a31751124f6b8e2d3671cfa3e375bde69e859e51ae75c02";
const wallet2 = new ethers.Wallet(privateKey, provider);

const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase);

const main = async () => {
  const address1 = await wallet1.getAddress();
  const address2 = await wallet2.getAddress();
  const address3 = await wallet3.getAddress(); // 获取地址
  console.log(`1. 获取钱包地址`);
  console.log(`钱包1地址: ${address1}`);
  console.log(`钱包2地址: ${address2}`);
  console.log(`钱包3地址: ${address3}`);
  console.log(`钱包1和钱包3的地址是否相同: ${address1 === address3}`);

  console.log(`钱包1助记词: ${wallet1.mnemonic.phrase}`);
  console.log(`钱包2私钥: ${wallet2.privateKey}`);

  const txCount1 = await provider.getTransactionCount(wallet1WithProvider);
  const txCount2 = await provider.getTransactionCount(wallet2);
  console.log(`钱包1发送交易次数: ${txCount1}`);
  console.log(`钱包2发送交易次数: ${txCount2}`);

  // 5. 发送ETH
  console.log(`\n5. 发送ETH（测试网）`);
  // i. 打印交易前余额
  console.log(`i. 发送前余额`);
  console.log(
    `钱包1余额: ${ethers.formatEther(
      await provider.getBalance(wallet1WithProvider)
    )}`
  );
  console.log(
    `钱包2余额: ${ethers.formatEther(
      await provider.getBalance(wallet2)
    )}`
  );

  const tx = {
    to: address1,
    value: ethers.parseEther("0.0001"),
  };
  // iii. 发送交易，获得收据
  console.log(`\nii. 等待交易在区块链确认（需要几分钟）`);
  const receipt = await wallet2.sendTransaction(tx);
  await receipt.wait();
  console.log(receipt);
  // iv. 打印交易后余额
  console.log(`\niii. 发送后余额`);
  console.log(
    `钱包1: ${ethers.formatEther(
      await provider.getBalance(wallet1WithProvider)
    )} ETH`
  );
  console.log(
    `钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`
  );
};

main();
