pragma solidity >=0.4.16 <0.9.0;

// SPDX-License-Identifier: MIT

// Create a Smart Contract For an Auction Platform with below mentioned features:
// 1) Create an Auction {AuctionID ,Description , Start Time , End Time , MinBidValue}
// 2) Place Bids On Active Auctions {AuctionID , BidValue} 
// 3) Auction Owner can see list of All Bids Placed On their Auction.
// 4) Bid Owners Can see list of all Auctions where they placed their Bids.
// 5) Auction Owner can select a bid and Mark the Auction status as Closed.
// 6) All Other Necessary View Functions.


contract AuctionPlatform {
    
    struct Auction {
        uint auctionId;
        string description;
        uint startTime;
        uint endTime;
        uint minBidValue;
        bool closed;
    }
    
    struct Bid {
        uint auctionId;
        uint bidId;
        uint bidValue;
        address bidder;
    }
    
    mapping(uint => Auction) public auctions;
    mapping(uint => Bid[]) public bids;
    mapping(address => uint[]) public bidderAuctions;
     
    
    uint public auctionCounter;
    uint public bidCounter;

    event AuctionCreated(uint auctionId, string description, uint startTime, uint endTime, uint minBidValue );
    event BidPlaced(uint auctionId, uint bidId, uint bidValue, address bidder);
    // event AuctionClosed(uint auctionId, uint bidValue, address bidder);
    event AuctionClosed(uint auctionId, uint bidValue);
    
    address owner;

    constructor()  {  // special function , only called at time of deployemnet
	    owner = msg.sender;
    }  

    modifier onlyOwner  {
        require (msg.sender == owner);
        _;
    }
    
    function createAuction(string memory _description, uint _startTime, uint _endTime, uint _minBidValue) public {
        require(_endTime > _startTime, "End time must be greater than start time");
        auctions[auctionCounter] = Auction(auctionCounter, _description, _startTime, _endTime, _minBidValue, false);
        emit AuctionCreated(auctionCounter, _description, _startTime, _endTime, _minBidValue);
        auctionCounter++;
    }
    
    function placeBid(uint _auctionId, uint _bidValue) public  {
        require(block.timestamp >= auctions[_auctionId].startTime, "Auction has not started yet");
        require(block.timestamp <= auctions[_auctionId].endTime, "Auction has ended");
        require(!auctions[_auctionId].closed, "Now can't place bids as Auction has been closed.");
        // require(msg.value == _bidValue, "Bid value must match sent ether amount");
        require(_bidValue >= auctions[_auctionId].minBidValue, "Bid value must be greater than or equal to minimum bid value");
        bids[_auctionId].push(Bid(_auctionId , bidCounter , _bidValue, msg.sender));
        bidderAuctions[msg.sender].push(_auctionId);
        emit BidPlaced(_auctionId, bidCounter , _bidValue, msg.sender);
        bidCounter++;
    }
    
    function closeAuction(uint _auctionId, uint _bidIndex) public onlyOwner {
        require(!auctions[_auctionId].closed, "Auction already closed");
        uint winningBid = bids[_auctionId][_bidIndex].bidValue;
        auctions[_auctionId].closed = true;
        
        emit AuctionClosed(_auctionId, winningBid);
    }
    
    function getTotalAuctionCount() public view returns (uint) {
        return auctionCounter;
    }
    
    function getAllBidsOfAuction(uint _auctionId) public onlyOwner view returns (Bid [] memory) {
        return bids[_auctionId];
    }
    
    function getBidOwnerAuctions(address _bidder) public onlyOwner view returns (uint []memory) {
        uint n = bidderAuctions[_bidder].length;
        uint[] memory uniqueArray = new uint[](n);
        uint uniqueArrayIndex = 0;
        bool isUnique;
        for (uint i = 0; i < n; i++) {
            isUnique = true;
            for (uint j = i + 1; j < n; j++) {
                if (bidderAuctions[_bidder][i] == bidderAuctions[_bidder][j]) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) {
                uniqueArray[uniqueArrayIndex] = bidderAuctions[_bidder][i];
                uniqueArrayIndex++;
            }
        }
        // Resize the array to remove any empty elements
        uint[] memory trimmedArray = new uint[](uniqueArrayIndex);
        for (uint i = 0; i < uniqueArrayIndex; i++) {
            trimmedArray[i] = uniqueArray[i];
        }
        return trimmedArray;
    }
    

    function getEachAuctionDetails(uint _auctionId) public view returns (string memory, uint, uint, uint, bool) {
        return (auctions[_auctionId].description, auctions[_auctionId].startTime, auctions[_auctionId].endTime, auctions[_auctionId].minBidValue, auctions[_auctionId].closed);
    }
    
    function getEachBidDetails(uint _auctionId, uint _bidIndex) public view returns (uint, address) {
        return (bids[_auctionId][_bidIndex].bidValue, bids[_auctionId][_bidIndex].bidder);
    }
     
}
