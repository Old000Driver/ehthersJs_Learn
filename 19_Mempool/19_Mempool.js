import { ethers } from "ethers";
console.log("\n1. 连接 wss RPC");
// 准备 alchemy API 可以参考https://github.com/AmazingAng/WTF-Solidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md
const ALCHEMY_MAINNET_WSSURL =
  "wss://eth-mainnet.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm";
const provider = new ethers.WebSocketProvider(ALCHEMY_MAINNET_WSSURL);

function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}

// let i = 0;
// provider.on("pending", async (txHash) => {
//   if (txHash && i < 100) {
//     // 打印txHash
//     console.log(
//       `[${new Date().toLocaleTimeString()}] 监听Pending交易 ${i}: ${txHash} \r`
//     );
//     i++;
//   }
// });

let j = 0;
provider.on(
  "pending",
  throttle(async (txHash) => {
    if (txHash && j <= 100) {
      // 获取tx详情
      let tx = await provider.getTransaction(txHash);
      console.log(
        `\n[${new Date().toLocaleTimeString()}] 监听Pending交易 ${j}: ${txHash} \r`
      );
      console.log(tx);
      j++;
    }
  }, 1000)
);
