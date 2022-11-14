// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract GaiaMaster {
    struct Deal {
        address addr;
        address seller;
        address buyer;
        uint8 status;
    }
    
    struct Article {
        string data; // base64 string
        bool active;
    }
    
    struct Review {
        address rfrom;
        uint256 deal;
        uint256 score;
        string comment;
        string timestamp;
    }
    
    enum Badge {
        FURNITURE_LV_1,
        FURNITURE_LV_2,
        FURNITURE_LV_3,
        CLOTHES_LV_1,
        CLOTHES_LV_2,
        CLOTHES_LV_3
    }
    
    mapping(address => Badge[]) private badges;
    mapping(address => Review[]) private accountReviews; 
    mapping(address => uint256[]) private accountArticles;  
    mapping(address => uint256[]) private accountDeals;
    
    address private owner;
    Article[] public articles;
    Deal[] public deals;
    
    event DealCreated(uint256 id, address contractAddr);
    event DealUpdated(uint256 id, uint8 status);
    event ArticleCreated(uint256 id, address seller);
    event ArticleUpdated(uint256 id);
    event ReviewUpdated(uint256 id);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
      require(msg.sender == owner, "caller is not owner");
      _;
    }
    
    function addDeal(address addr, address seller, address buyer) public {
        uint256 index = deals.length;
        deals.push(Deal(addr, seller, buyer, 0)); // 0: open, 1: closed, 2: dispute
        accountDeals[seller].push(index);
        accountDeals[buyer].push(index);
        emit DealCreated(index, addr);
    }
    
    function disputeDeal(uint256 index) public {
        deals[index].status = 2;
        emit DealUpdated(index, 2);
    }
    
    function closeDeal(uint256 index) public {
        deals[index].status = 1;
        emit DealUpdated(index, 1);
    }

    function addArticle(string memory data) public {
        uint256 index = articles.length;
        articles.push(Article(data, true));
        accountArticles[msg.sender].push(index);
        emit ArticleCreated(index, msg.sender);
    }
    
    function updateArticle(string memory data, bool active, uint256 index) public onlyOwner {
        articles[index].data = data;
        articles[index].active = active;
        emit ArticleUpdated(index);
    }
    
    function addReview(
        address toUser,
        address fromUser,
        uint256 dealIndex,
        uint256 score,
        string memory comment,
        string memory timestamp,
        uint8 _badge
    ) public onlyOwner {
        accountReviews[toUser].push(Review(fromUser, dealIndex, score, comment, timestamp));
        addBadge(toUser, _badge);
        emit ReviewUpdated(dealIndex);
    }
    
    function addBadge(address toUser, uint8 _type) private {
        if (_type == 1) {
            badges[toUser].push(Badge.FURNITURE_LV_1);
        }
        else if (_type == 2) {
            badges[toUser].push(Badge.FURNITURE_LV_2);
        }
        else if (_type == 3) {
            badges[toUser].push(Badge.FURNITURE_LV_3);
        }
        else if (_type == 4) {
            badges[toUser].push(Badge.CLOTHES_LV_1);
        }
        else if (_type == 5) {
            badges[toUser].push(Badge.CLOTHES_LV_2);
        }
        else if (_type == 6) {
            badges[toUser].push(Badge.CLOTHES_LV_3);
        }
    }
    
    function getArticles() public view returns (Article[] memory){
        return articles;
    }
    
    function getDeals(address user) public view returns (Deal[] memory result){
        uint256 len = accountDeals[user].length;
        result = new Deal[](len);
        for (uint256 i = 0; i < len; i++) {
            result[i] = deals[accountDeals[user][i]];
        }
        return result;
    }
    
    function getAccountBadges(address user) public view returns (Badge[] memory) {
        return badges[user];
    }
    
    function getAccountReviews(address user) public view returns (Review[] memory) {
        return accountReviews[user];
    }
    
    function getAccountArticles(address user) public view returns (uint256[] memory) {
        return accountArticles[user];
    }
    
    function getAccountDeals(address user) public view returns (uint256[] memory) {
        return accountDeals[user];
    }
}