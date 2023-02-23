// import Auc from "../../images/auc1.jpeg";
import * as React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import "./home.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
export default function Home() {
  const navigate = useNavigate();
  const createAuction = (e) => {
    // e.preventDefault();
    navigate("/createauction");
  };

  const placeBid = (e) => {
    // e.preventDefault();
    navigate("/placeBid");
  };
  const bidList = (e) => {
    // e.preventDefault();
    navigate("/bidlist");
  };

  const closeAuction = (e) => {
    // e.preventDefault();
    navigate("/closeauction");
  };
  const card1 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 35 }} color="text.secondary" gutterBottom>
          Create Auction
        </Typography>
        <Typography variant="body2">
        Create an Auction AuctionID ,Description , Start Time , End Time , MinBidValue
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={createAuction}>start</Button>
      </CardActions>
    </React.Fragment>
  );

  const card2 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 35 }} color="text.secondary" gutterBottom>
          Place Bid
        </Typography>
        <Typography variant="body2">
        Place Bids On Active Auctions AuctionID , BidValue
      </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" onClick={placeBid}>start</Button>
      </CardActions>
    </React.Fragment>
  );

  

  const card3 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 35 }} color="text.secondary" gutterBottom>
          Bids List
        </Typography>
        <Typography variant="body2">
        Auction Owner can see list of All Bids Placed On their Auction.
      </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" onClick={bidList}>start</Button>
      </CardActions>
    </React.Fragment>
  );


  const card4 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 35 }} color="text.secondary" gutterBottom>
          Auction List
        </Typography>
        <Typography variant="body2">
        Bid Owners Can see list of all Auctions where they placed their Bids.
      </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small">start</Button>
      </CardActions>
    </React.Fragment>
  );
  const card5 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 35 }} color="text.secondary" gutterBottom>
          Close Auction
        </Typography>
        <Typography variant="body2">
        Auction Owner can select a bid and Mark the Auction status as Closed.
      </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" onClick={closeAuction}>start</Button>
      </CardActions>
    </React.Fragment>
  );
  
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4}>
        <Card style={{margin : "20px"}}>{card1}</Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
        <Card style={{margin : "20px"}}>{card2}</Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
        <Card style={{margin : "20px"}}>{card5}</Card>
        </Grid>
        {/* <Grid item xs={2} sm={4} md={4}>
        <Card style={{margin : "20px"}}>{card3}</Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
        <Card style={{margin : "20px"}}>{card4}</Card>
        </Grid> */}
        
        </Grid>
  
  );
}