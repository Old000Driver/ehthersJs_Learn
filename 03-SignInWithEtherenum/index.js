import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";

const signButton = document.querySelector(".sign");
const showAccount = document.querySelector(".showAccount");
const showNonce = document.querySelector(".showNonce");
const showSignature = document.querySelector(".showSignature");
const showSignStatus = document.querySelector(".showSignStatus");

export const users = {};

function auth(address) {
  let user = users[address];
  if (!user) {
    user = {
      address,
      nonce: Math.floor(Math.random() * 10000),
    };
    users[address] = user;
  } else {
    const nonce = Math.floor(Math.random() * 10000);
    user.nonce = nonce;
    users[address] = user;
  }
  return user.nonce;
}

function verify(address, signature) {
  let signValid = false;
  console.log(`address: ${address}`);
  //从数据库中取出nonce
  let nonce = users[address].nonce;
  console.log(`nonce: ${nonce}`);
  //验证对nonce进行签名的地址
  const decodedAddress = ethers.verifyMessage(
    nonce.toString(),
    signature.toString()
  );
  console.log(`decodedAddress: ${decodedAddress}`);
  //比较地址和签名的地址是否一致
  if (address.toLowerCase() === decodedAddress.toLowerCase()) {
    signValid = true;
    //出于安全原因，更改nonce，防止下次直接使用相同的nonce进行登录
    users[address].nonce = Math.floor(Math.random() * 10000000);
  }
  return signValid;
}

const onClickHandler = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  const account = accounts[0];
  console.log(`Wallet Address:${account}`);
  showAccount.innerHTML = account;

  const nonce = auth(account);
  showNonce.innerHTML = nonce;
  console.log(`获取后台需要签名的数据:${nonce}`);

  const signer = await provider.getSigner();
  const signature = await signer.signMessage(nonce.toString());
  showSignature.innerHTML = signature;

  const signStatus = verify(account, signature);
  showSignStatus.innerHTML = signStatus;
};

signButton.addEventListener(`click`, onClickHandler);
