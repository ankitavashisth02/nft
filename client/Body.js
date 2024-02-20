import React from 'react';
import nftImg from './assets/NFT-Img.jpg';
require("dotenv").config();

const Body = ()=>{
    // const handleChange=()=>{
    //     console.log("created")
    // }
    const API_URL = process.env.API_URL;
    const PUBLIC_KEY = process.env.PUBLIC_KEY;
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const contract = require("./assets/MyNFT.json");

    const contractAddress = "0xdAbBe38e2dc3920812a547e442EA4A376A9361BE";
    const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

    async function mintNFT(tokenURI) {
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
      
      //the transaction
        const tx = {
          from: PUBLIC_KEY,
          to: contractAddress,
          nonce: nonce,
          gas: 500000,
          value : web3.utils.toWei('0.01','ether'),
          data: await nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
        };
      
        const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        signPromise
          .then((signedTx) => {
            web3.eth.sendSignedTransaction(
              signedTx.rawTransaction,
              function (err, hash) {
                if (!err) {
                  console.log(
                    "The hash of your transaction is: ",
                    hash,
                    "\nCheck Alchemy's Mempool to view the status of your transaction!"
                  );
                } else {
                  console.log(
                    "Something went wrong when submitting your transaction:",
                    err
                  );
                }
              }
            );
          })
          .catch((err) => {
            console.log(" Promise failed:", err);
          });
      }


    return(
        <div className="center-container">
            <img src={nftImg}/>
            <button onClick={() => mintNFT("https://gateway.pinata.cloud/ipfs/QmbmoyEnwjArC8JXhDU4zQcoPq2FdvjzeoJHZTBjRBsBGg")}>Mint</button>
        </div>
    )
}

export default Body;