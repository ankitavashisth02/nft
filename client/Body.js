import React, { useEffect, useState } from "react";
import nftImg from "./assets/NFT-Img.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers, parseEther, parseUnits } from "ethers";

const Body = ({ state }) => {
  const { contract } = state;
  const [loading, setLoading] = useState(false);
  const [burning, setBurning] = useState(false);
  const [mintedAmount, setMintedAmount] = useState();
  const [burnState, setBurnState] = useState(false);

  useEffect(() => {
    try {
      const fetchBalance = async () => {
        // e.preventDefault();
        const fetchAmount = (await contract?.currentPrice());
        setMintedAmount(Number(fetchAmount) / 10 ** 18);
        console.log(
          "Amount that is fetched : ",
          Number(fetchAmount) / 10 ** 18
        );
      };
      fetchBalance();
    } catch (error) {
      console.log(error);
    }
  }, [loading]);

  const onHandleChange = async () => {
    const tokenId = await contract.tokenId1();
    console.log(Number(tokenId));
    //console.log("Amount:", amount.value.toString());
    setBurning(true);

    const burned = await contract.burn1(Number(tokenId));

    await burned.wait();

    setBurning(false);
    toast("nft Burned !!");
    console.log("Burned");
  };

  async function mintNFT(tokenURI) {
    try {
      //console.log(tokenURI);
      event.preventDefault();
      const amt = await contract.currentPrice();
      console.log(Number(amt));
      const options = { value: Number(amt) };

      setLoading(true);

      const txn = await contract.mintNFT(tokenURI, options);

      if(!await txn.wait()){
          setLoading(false)
      }
      toast("Transaction is proccessing..");
      await txn.wait();
      setLoading(false);

      toast("Minted");
      //console.log("Minted NFT!");
      setBurnState(true);
    
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
        {loading ? "Minting.." : `Mint@ ${mintedAmount}`}
      </button>

      {burnState && (
        <button onClick={() => onHandleChange()}>
          {burning ? "Burning.." : `Burn@ ${mintedAmount}`}
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default Body;
