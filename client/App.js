import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./Body";
import abi from "./assets/MyNFTold.json";
import {Contract, BrowserProvider} from "ethers";
import { useState, useEffect } from "react";

const App = () => {
  const [account, setAccount] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x53b1bb87318730Ef65108633F1465586632D160E";
      const contractAddressAbi = abi.abi;

      // const contractAddressAbi = abi;

      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const provider = new BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new Contract(
            contractAddress,
            contractAddressAbi,
            signer
          );

          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("metamask not installed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

// const first = account.slice(0,4);
// <h3>Connected Account : {account} </h3>
// <Body state={state} />
  return (
    <React.Fragment>
      <h3>Connected Account : {account} </h3>
      <Body state={state}/>
    </React.Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);