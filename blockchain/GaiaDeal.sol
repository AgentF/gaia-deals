// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract GaiaDeal {
    
    enum Status {
        Open,
        Closed,
        Dispute
    }

    address private referi;
    address public buyer;
    address public seller;
    uint256 public amount;
    string public productId;
    string public shippingAddress;
    string public timestamp;
    Status public status;
    
    event amountReleased(address addr, uint256 amount);
    event disputeResolved(address winner);
    
    constructor(
        address _buyer,
        address _seller,
        address _referi,
        uint256 _amount,
        string memory _productId,
        string memory _shippingAddress,
        string memory _timestamp
    ) payable  {
        referi = _referi;
        buyer = _buyer;
        seller = _seller;
        amount = _amount;
        productId = _productId;
        shippingAddress = _shippingAddress;
        timestamp = _timestamp;
        status = Status.Open;
    }
    
    receive() external payable {}
    
    function releaseAmount() external {
        require(status == Status.Open, "This deal is not longer Open");
        require(msg.sender == buyer, "You aren't authorized to close this deal!");
        payable(seller).transfer(address(this).balance);
        status = Status.Closed;
        emit amountReleased(seller, amount);
    }
    
    function resolveDispute(bool sellerWin) external {
        require(status == Status.Dispute, "This deal is not on dispute");
        require(msg.sender == referi, "You aren't authorized to settle this deal!");
        
        if (sellerWin) {
            payable(seller).transfer(amount);
        }
        else {
            payable(buyer).transfer(amount);
        }
        
        status = Status.Closed;
        emit disputeResolved(sellerWin ? seller : buyer);
    }
    
    function setDispute() external {
        require(status == Status.Open, "This deal is not longer Open");
        require(msg.sender == buyer || msg.sender == seller, "You aren't authorized to take this action!");
        status = Status.Dispute;
    }
    
    function getContractData() external view returns (address, address, uint256, string memory, string memory, Status) {
        return (buyer, seller, amount, productId, shippingAddress, status);
    }
    
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
    
}