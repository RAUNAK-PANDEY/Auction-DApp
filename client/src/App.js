import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/Home/Home";
import { CreateAuction } from "./pages/createAuction/CreateAuction";
import { useEffect, useState } from "react";
import Auction from "./artifacts/contracts/AuctionPlatform.sol/AuctionPlatform.json";
import { ethers } from "ethers";
import { PlaceBid } from "./pages/placeBid/PlaceBid";
import { BidList } from "./pages/bidList/BidList";
import { CloseAuction } from "./pages/closeAuction/CloseAuction";
import {  AuctionList } from "./pages/auctionList/AuctionList";
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        
        //Enter your contract address here
        let contractAddress =  "0x5FbDB2315678afecb367f032d93F642f64180aa3"
         
        const contract = new ethers.Contract(
          contractAddress,
          Auction.abi,
          signer
        );
        console.log(contract);

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar />
        <div className="appWrapper">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/createauction"
              element={
                <CreateAuction
                  account={account}
                  provider={provider}
                  contract={contract}
                />
              }
            />

            <Route
              exact
              path="/placeBid"
              element={
                <PlaceBid
                  account={account}
                  provider={provider}
                  contract={contract}
                />
              }
            />

            <Route
              exact
              path="/bidlist"
              element={<BidList contract={contract} account={account} provider={provider} />}
            />
           
           <Route
              exact
              path="/auctionlist"
              element={<AuctionList contract={contract} account={account} provider={provider} />}
            />

          <Route
              exact
              path="/closeauction"
              element={<CloseAuction contract={contract} account={account} provider={provider}  />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <p style={{ color: "black" }}>
        <b>Account Address: </b>
        {account ? account : "Not connected"}
      </p>
    </div>
  );
}

export default App;
