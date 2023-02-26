# Auction DApp

The Auction Decentralized Application is a web-based platform built on Ethereum blockchain
technology that allows users to create auctions, place bids on active auctions, and manage 
the auction process. The application is built using React.js as the frontend framework, 
Hardhat as the development framework, Ethers.js for blockchain interaction, Solidity for 
writing smart contracts and tests, and JavaScript for React and testing.

The application allows users to create auctions with a unique AuctionID, Description, Start Time,
End Time, and MinBidValue. Users can place bids on active auctions by specifying the AuctionID 
and BidValue. The auction owner can view a list of all bids placed on their auction and select
a bid to mark the auction status as closed. Bid owners can view a list of all auctions where 
they have placed their bids.

The Auction Decentralized Application is a secure and transparent platform that leverages the
benefits of blockchain technology to ensure fairness and trust in the auction process. With 
its user-friendly interface and intuitive design, the application provides a seamless experience
for buyers and sellers to participate in auctions.

## Technology Stack & Tools
- [React.js](https://reactjs.org/) (Frontend Framework)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)


## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`

### 3. Start Hardhat node
`$ npx hardhat node`

### 4. Run deployment script
In a separate terminal execute:
`$ npx hardhat run ./scripts/deploy.js --network localhost`

### 5. Start frontend
`$ npm start`