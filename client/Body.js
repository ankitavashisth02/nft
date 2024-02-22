import React, { useState } from "react";
import nftImg from "./assets/NFT-Img.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers, parseEther } from "ethers";

const Body = ({ state }) => {
  const { contract } = state;
  const[loading, setLoading] = useState(false);
  const[burning, setBurning] = useState(false);

  const onHandleChange = async () => {
    const tokenId = await contract._tokenIds();
    const burnedAmount = (((Number(tokenId))-1)**2)/16000;
    const amt = burnedAmount.toString();

    const amount = { value: parseEther("0.0000001") };
    console.log("Amount:", amount.value.toString());

    setBurning(true);
    
    const burned = await contract.burn1(
      parseInt(tokenId),
      parseInt(amount.value.toString())
    );

    await burned.wait();
    setBurning(false);

    toast("nft Burned !!");
    console.log("Burned");
  };

  async function mintNFT(tokenURI) {
    try {
      //console.log(tokenURI);
      const tokenId = await contract._tokenIds();
      const mintingAmount = (Number(tokenId)**2)/16000;
      const amt = (mintingAmount).toString();
      const options = { value: parseEther(amt) };

      setLoading(true);

      const txn = await contract.mintNFT(tokenURI, options);
      await txn.wait() ; 
      setLoading(false);

      toast("Minted");
      //console.log("Minted NFT!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="center-container">
      <img src={nftImg} />
      <button onClick={() =>
          mintNFT(
            "https://gateway.pinata.cloud/ipfs/QmbmoyEnwjArC8JXhDU4zQcoPq2FdvjzeoJHZTBjRBsBGg"
          )
        }>
        {loading ? "Minting.." : "Mint"}
      </button>

      <button onClick={() => onHandleChange()}>
        {burning ? "Burning.." : "Burn"}
      </button>
      <ToastContainer/>
    </div>
  );
};

export default Body;
