import React, { useState } from "react";
import nftImg from "./assets/NFT-Img.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers, parseEther } from "ethers";

const Body = ({ state }) => {
  const { contract } = state;

  const onHandleChange = async () => {
    const amount = { value: parseEther("0.000000000001") };
    console.log("Amount:", amount.value.toString());
    const tokenId = await contract._tokenIds();
    
    console.log("token Id:", tokenId);
    const burned = await contract.burn1(
      parseInt(tokenId),
      parseInt(amount.value.toString())
    );
    await burned.wait();
    toast("nft Burned !!");
    console.log("Burned");
  };

  async function mintNFT(tokenURI) {
    try {
      //console.log(tokenURI);
      const options = { value: parseEther("0.01") };
      const txn = await contract.mintNFT(tokenURI, options);
      
      await txn.wait() ? toast("Minted"): toast("Error in minting !!");

      console.log("Minted NFT!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="center-container">
      <img src={nftImg} />
      <button
        onClick={() =>
          mintNFT(
            "https://gateway.pinata.cloud/ipfs/QmbmoyEnwjArC8JXhDU4zQcoPq2FdvjzeoJHZTBjRBsBGg"
          )
        }
      >
        Mint
      </button>

      <button onClick={() => onHandleChange()}>Burn</button>
      <ToastContainer/>
    </div>
  );
};

export default Body;
