import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { Card, FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import './auctionlist.css';
import { CircularProgress } from '@mui/material';
 
export const AuctionList = ({contract, account , provider}) => {
    const [auction, setAuction] = useState({ bidder: ""})
    const [auctionLength, setAuctionLength] = useState(0)
    const [auctionList, setAuctionList] = useState([])
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setAuction({ ...auction, [name]: value });
    }
    // console.log(contract)
    const [isFetching, setIsFetching] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFetching(true)
         
        try {
             const hexToDecimal = hex => parseInt(hex, 16);
            let dataArray =  await contract.getBidOwnerAuctions(auction.bidder)
            console.log(dataArray);
            setAuctionLength(dataArray.length)
            
            let aucl = []
            let temp1 = await dataArray.map(async(it)=>{
                let tempList = await contract.getEachAuctionDetails(hexToDecimal(it._hex))
                // console.log(tempList)
                const [name, startTime, endTime, minBidValue , status] = tempList;
                setAuctionList( [...auctionList , {name : name , startTime : hexToDecimal(startTime._hex),
                    endTime : hexToDecimal(endTime._hex), 
                    minBidValue : hexToDecimal(minBidValue._hex), status : status}])
            })

            // setAuctionList(aucl)
            setIsFetching(false)
        }
        catch (e) {
            setIsFetching(false);
            alert("Unable to Fetch Bids");
          }
          alert("auction Fetched Successfully.");
        //   setAuction({ description: "", startTime: 0, endTime: 0, minBidValue: 0});
    }
    console.log(auctionList)
  return (
    <div className="auctionContainer1">
    <div className="auctionWrapper1">
        <form className="auctionRight1" onSubmit={handleSubmit} >
            <div className="auctionBox1">
            <h1>All Bidder's Auction List</h1>
                
                <div className="divinput" > 
                <input type="text" required  className="auctionInput1" 
                name="bidder" value={auction.bidder} 
                onChange={handleChange}
                 />
                <label for="">Bidder</label>
                </div>
                 
                <button type="submit"  className="auctionButton1" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Click here"}</button>
            </div>
        </form>

       <div className="auctionBox1">
       {auctionList && auctionList.map((it)=>{return <div >
            <p><b>Auction Name: </b> {it.name} </p>
            <p><b>Start Time: </b> {it.startTime} </p>
            <p><b>End Time : </b> {it.endTime}</p> 
            <p><b>Minimum Bid Value: </b> {it.minBidValue} </p>
            <p><b>Status: </b> {it.status.toString()} </p>
            </div>
        })
    }
        </div>
     
        
       
      
    </div>
</div>
  );
};
