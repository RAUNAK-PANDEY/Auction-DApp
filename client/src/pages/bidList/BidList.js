import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { Card, FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import './bidList.css';
import { CircularProgress } from '@mui/material';
 
export const BidList = ({contract, account , provider}) => {
    const [bid, setBid] = useState({ auctionId: 0})
    const [bidLength, setBidLength] = useState(0)
    const [bidList, setBidList] = useState([])
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setBid({ ...bid, [name]: value });
    }
    // console.log(contract)
    const [isFetching, setIsFetching] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFetching(true)
         
        try {
            // console.log( parseFloat(bid.auctionId) )
            // console.log( contract )
            // const dataArray = await contract.getAllBidsOfAuction(parseFloat(bid.auctionId));
            // const signer = contract.connect(provider.getSigner());
            // console.log(signer)
            // let dataArray =  await contract.getAllBidsOfAuction(parseFloat(bid.auctionId))
            const hexToDecimal = hex => parseInt(hex, 16);
            let dataArray =  await contract.getAllBidsOfAuction(parseFloat(bid.auctionId))
            console.log(dataArray);
            setBidLength(dataArray.length)
            let bidl=[]
            let temp1 = await dataArray.map((it)=>{
                // console.log(it)
                const [auctionId, bidIndex, bidValue, bidder] = it;
                // console.log('Acution ID:', auctionId.toFixed());
                bidl.push({auctionId : hexToDecimal(auctionId._hex) , bidIndex : hexToDecimal(bidIndex._hex), 
                    bidValue : hexToDecimal(bidValue._hex), bidder : bidder})
                
            })
            setBidList(bidl)
            setIsFetching(false)
        }
        catch (e) {
            setIsFetching(false);
            alert("Unable to Fetch Bids");
          }
          alert("Bid Fetched Successfully.");
        //   setAuction({ description: "", startTime: 0, endTime: 0, minBidValue: 0});
    }
    console.log(bidList)
  return (
    <div className="bidContainer1">
    <div className="bidWrapper1">
        <form className="bidRight1" onSubmit={handleSubmit} >
            <div className="bidBox1">
            <h1>All Bid List for an Auction</h1>
                
                <div className="divinput" > 
                <input type="text" required  className="bidInput1" 
                name="auctionId" value={bid.auctionId} 
                onChange={handleChange}
                 />
                <label for="">Auction Id</label>
                </div>
                 
                <button type="submit"  className="bidButton1" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Click here"}</button>
            </div>
        </form>

       <div className="bidBox1"><h3><b>Total Count : </b> {bidLength} </h3>
       {bidList.map((it)=>{return <div >
            <p><b>Auction Id : </b> {it.auctionId} </p>
            <p><b>Bid Index : </b> {it.bidIndex} </p>
            <p><b>Bid Value : </b> {it.bidValue}</p> 
            <p><b>Bidder Adress: </b> {it.bidder} </p>
            </div>
        })
    }
        </div>
     
        
       
      
    </div>
</div>
  );
};
