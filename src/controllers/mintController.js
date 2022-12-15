const httpStatus = require("http-status");
const ethers = require('ethers');
const contractABI = require("../abi/ERC721.json");

const mint = (async (req, res) => {
    const { address } = req.body;

    const provider = new ethers.getDefaultProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const NFTContract = new ethers.Contract(
      process.env.NFT_CONTRACT_ADDRESS,
      contractABI,
      signer
    );

    // console.log(NFTContract);
    
    const transaction = await NFTContract.mintFree();
    const promise = await transaction.wait();
    const events = promise.events;
    tokenId = parseInt(events[0].args.tokenId._hex, 16);
    console.log(tokenId);
    NFTContract.transferFrom(process.env.WALLET_ADDRESS, address, tokenId);
    
    res.status(httpStatus.OK).send({});
  });

module.exports = {
    mint,
};
  