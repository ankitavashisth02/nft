import React from 'react';
import nftImg from './assets/NFT-Img.jpg';
import {ethers, parseEther} from "ethers";

const Body = ({state})=>{
    const {signer,contract} = state;

    async function mintNFT(tokenURI) {
        console.log(tokenURI);
        
        const txn = await contract.mintNFT(signer, tokenURI,{value : parseEther('0.001')});
        await txn.wait();
        console.log("Minted NFT!");
    }

    return(
        <div className="center-container">
            <img src={nftImg}/>
            <button onClick={() => mintNFT("https://gateway.pinata.cloud/ipfs/QmbmoyEnwjArC8JXhDU4zQcoPq2FdvjzeoJHZTBjRBsBGg")}>Mint</button>
        </div>
    )
}

export default Body;