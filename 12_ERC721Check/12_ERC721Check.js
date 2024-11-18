//准备 alchemy API 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md 
const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/_St0WAvs-_1cV6QzTXvqX9Lr0wzMCgEm';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// 合约abi
const abiERC721 = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function supportsInterface(bytes4) public view returns(bool)",
];
// ERC721的合约地址，这里用的BAYC
const addressBAYC = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
// 创建ERC721合约实例
const contractERC721 = new ethers.Contract(addressBAYC, abiERC721, provider)

// 1. 读取ERC721合约的链上信息
const nameERC721 = await contractERC721.name()
const symbolERC721 = await contractERC721.symbol()
console.log("\n1. 读取ERC721合约信息")
console.log(`合约地址: ${addressBAYC}`)
console.log(`名称: ${nameERC721}`)
console.log(`代号: ${symbolERC721}`)