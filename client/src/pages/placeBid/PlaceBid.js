import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { Card, FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import './placeBid.css';
import { CircularProgress } from '@mui/material';
export const PlaceBid = ({contract, account, provider}) => {
    const [bid, setBid] = useState({ auctionId: "", bidValue: ""})
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
        if(bid)
        try {
            console.log( parseFloat(bid.auctionId),parseFloat(bid.bidValue) )
            const signer = contract.connect(provider.getSigner());
            signer.placeBid(parseFloat(bid.auctionId),parseFloat(bid.bidValue) );
            setIsFetching(false)
        }catch (e) {
            setIsFetching(false);
            alert("Unable to create Auction");
          }
          alert("Bid Successfully Placed.");
        //   setAuction({ description: "", startTime: 0, endTime: 0, minBidValue: 0});
    }
  return (
    <div className="bidContainer">
    <div className="bidWrapper">
        <form className="bidRight" onSubmit={handleSubmit} >
            <div className="bidBox">
            <h1>Place Bid</h1>
                
                <div className="divinput" > 
                <input type="text" required  className="bidInput" 
                name="auctionId" value={bid.auctionId} 
                onChange={handleChange}
                 />
                <label for="">Auction Id</label>
                </div>
                
                <div className="divinput" > 
                <input type="text" required  className="bidInput" 
                name="bidValue"  value={bid.bidValue} 
                onChange={handleChange}
                 />
                <label for="">Bid Value</label>
                </div>

                 

                <button type="submit"  className="bidButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "place bid"}</button>
            </div>
        </form>
    </div>
</div>
  );
};
