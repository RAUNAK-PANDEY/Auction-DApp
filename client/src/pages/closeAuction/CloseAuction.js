import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { Card, FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import './closeAuction.css';
import { CircularProgress } from '@mui/material';
export const CloseAuction = ({contract, account, provider}) => {
    const [auction, setAuction] = useState({ auctionId: 0 , bidIndex: 0})
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setAuction({ ...auction, [name]: value });
    }
    const [isFetching, setIsFetching] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFetching(true)
        if(auction)
        try {
            console.log(parseFloat(auction.auctionId) , parseFloat(auction.bidIndex))
            const signer = contract.connect(provider.getSigner());
            signer.closeAuction(parseFloat(auction.auctionId) , parseFloat(auction.bidIndex));
            setIsFetching(false)
        }catch (e) {
            setIsFetching(false);
            alert("Unable to close Auction");
          }
          alert("Successfully Auction Closed");
        //   setAuction({ description: "", startTime: 0, endTime: 0, minBidValue: 0});
    }

  return (
    <div className="auctionContainer">
    <div className="auctionWrapper">
        <form className="auctionRight" onSubmit={handleSubmit} >
            <div className="auctionBox">
            <h1>Close Auction</h1>
                
            <div className="divinput" > 
                <input type="text" required  className="bidInput" 
                name="auctionId" value={auction.auctionId} 
                onChange={handleChange}
                 />
                <label for="">Auction Id</label>
                </div>


                <div className="divinput" > 
                <input type="text" required  className="auctionInput" 
                name="bidIndex"  value={auction.bidIndex} 
                onChange={handleChange}
                 />
                <label for="">Bid Index</label>
                </div>
 
                <button type="submit"  className="auctionButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Close Auction"}</button>
            </div>
        </form>
    </div>
</div>
  );
};
