import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { Card, FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import './createAuction.css';
import { CircularProgress } from '@mui/material';
export const CreateAuction = ({contract, account, provider}) => {
    const [auction, setAuction] = useState({ description: "", startTime: "", endTime: "", minBidValue: ""})
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
            console.log(auction.description , parseFloat(auction.startTime),parseFloat(auction.endTime) , parseFloat(auction.minBidValue))
            const signer = contract.connect(provider.getSigner());
            console.log(signer)
            signer.createAuction(auction.description , parseFloat(auction.startTime),parseFloat(auction.endTime) , parseFloat(auction.minBidValue));
            setIsFetching(false)
        }catch (e) {
            setIsFetching(false);
            alert("Unable to create Auction");
          }
          alert("Successfully Auction Created");
        //   setAuction({ description: "", startTime: 0, endTime: 0, minBidValue: 0});
    }
  return (
    <div className="auctionContainer">
    <div className="auctionWrapper">
        <form className="auctionRight" onSubmit={handleSubmit} >
            <div className="auctionBox">
            <h1>Create Auction</h1>
                
                <div className="divinput" > 
                <input type="text" required  className="auctionInput" 
                name="description" value={auction.description} 
                onChange={handleChange}
                 />
                <label for="">Description</label>
                </div>
                
                <div className="divinput" > 
                <input type="text" required  className="auctionInput" 
                name="startTime"  value={auction.startTime} 
                onChange={handleChange}
                 />
                <label for="">Start Time (Epoch Timestamp)</label>
                </div>

                <div className="divinput" > 
                <input type="text" required  className="auctionInput" 
                name="endTime" value={auction.endTime} 
                onChange={handleChange}
                 />
                <label for="">End Time (Epoch Timestamp)</label>
                </div>

                 
                <div className="divinput" > 
                <input type="text" required  className="auctionInput" 
                name="minBidValue" value={auction.minBidValue} 
                onChange={handleChange}
                 />
                <label for="">Minimum Bid Value</label>
                </div>

                <button type="submit"  className="auctionButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Add Auction"}</button>
            </div>
        </form>
    </div>
</div>
  );
};
