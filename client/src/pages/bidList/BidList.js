import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { Card, FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import './bidList.css';
import { CircularProgress } from '@mui/material';
export const BidList = ({contract, account , provider}) => {
    const [bid, setBid] = useState({ auctionId: 0})
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setBid({ ...bid, [name]: value });
    }
    
    const [isFetching, setIsFetching] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFetching(true)
         
        try {
            // console.log( parseFloat(bid.auctionId) )
            // console.log( contract )
            const dataArray = await contract.getAllBidsOfAuction(parseFloat(bid.auctionId));
            // const signer = contract.connect(provider.getSigner());
            // console.log(signer)
            // let dataArray =  await signer.getTotalAuctionCount()
            console.log(dataArray);
            setIsFetching(false)
        }
        catch (e) {
            setIsFetching(false);
            alert("Unable to Fetch Bids");
          }
          alert("Bid Fetched Successfully.");
        //   setAuction({ description: "", startTime: 0, endTime: 0, minBidValue: 0});
    }
  return (
    <div className="bidContainer">
    <div className="bidWrapper">
        <form className="bidRight" onSubmit={handleSubmit} >
            <div className="bidBox">
            <h1>All Bid List for an Auction</h1>
                
                <div className="divinput" > 
                <input type="text" required  className="bidInput" 
                name="auctionId" value={bid.auctionId} 
                onChange={handleChange}
                 />
                <label for="">Auction Id</label>
                </div>
                 
                <button type="submit"  className="bidButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Click here"}</button>
            </div>
        </form>
    </div>
</div>
  );
};
