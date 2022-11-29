// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract GaiaMasterTS2 {
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
        initArticles();
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

    function initArticles() private {
        accountArticles[msg.sender].push(0);
        accountArticles[msg.sender].push(1);
        accountArticles[msg.sender].push(2);
        articles.push(Article("eyJpZCI6IjVmOWU0Nzk1LWZlYjgtNDlhZi04NTZiLThhNDE1OWMxMjU3NyIsInNlbGxlciI6IlRSY1VYRVJvUGhRRXJVTnlwM1UxNGhjbjdxbnVxVEtIRVIiLCJ0aXRsZSI6IkpvcmRhbiBTaG9lcyIsImltYWdlIjoiaHR0cHM6Ly9iYWZ5YmVpYWF1a2dtNGtnbmNwNGZ6cGdqdGdnZnpiNjd4eHFtdXJrNHBxYmp2dnJ3a3QzcnA0NHZmcS5pcGZzLnczcy5saW5rL2ltYWdlLmpwZWciLCJjYXRlZ29yeSI6ImNsb3RoZXMiLCJwcmljZSI6IjgwIiwiZGVzY3JpcHRpb24iOiJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4iLCJ0aW1lc3RhbXAiOjE2NjkzMDg4OTEwNzQsImRldGFpbHMiOnsiYWdlIjoiMyIsIm1hdGVyaWFscyI6IkxlYXRoZXIiLCJjb3VudHJ5IjoiVVMiLCJzdGF0ZSI6IkNhbGlmb3JuaWEiLCJ6aXBjb2RlIjoiOTAyMTAiLCJ3ZWlnaHQiOjF9fQ==",true));
        articles.push(Article("eyJpZCI6IjM0OTdkYTk2LWEzZDEtNDNhOC05MWMwLTAxOTUyNzM3ZWJkZCIsInNlbGxlciI6IlRSY1VYRVJvUGhRRXJVTnlwM1UxNGhjbjdxbnVxVEtIRVIiLCJ0aXRsZSI6IlJlZCBTb2ZhIiwiaW1hZ2UiOiJodHRwczovL2JhZnliZWlnaGJwc24yYm9qNXJraXM2bWluZXp3aW15bmQ0aTRycHR2NWs2ZHJucGQ1Y2tja2g3ZnlxLmlwZnMudzNzLmxpbmsvaW1hZ2UuanBlZyIsImNhdGVnb3J5IjoiZnVybml0dXJlIiwicHJpY2UiOiIzMDAiLCJkZXNjcmlwdGlvbiI6IkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiIsInRpbWVzdGFtcCI6MTY2OTMwODc5Njc4NiwiZGV0YWlscyI6eyJhZ2UiOiIyIiwibWF0ZXJpYWxzIjoiV29vZCIsImNvdW50cnkiOiJVUyIsInN0YXRlIjoiQ2FsaWZvcm5pYSIsInppcGNvZGUiOiI5MDIxMCIsIndlaWdodCI6MX19",true));
        articles.push(Article("eyJpZCI6Ijk2MmM0NDlhLTBhOWYtNDNhNi04MzA2LWZmYzU0OWNiNTIzMSIsInNlbGxlciI6IlRSY1VYRVJvUGhRRXJVTnlwM1UxNGhjbjdxbnVxVEtIRVIiLCJ0aXRsZSI6IlN1cGVyIENoYWlyIiwiaW1hZ2UiOiJodHRwczovL2JhZnliZWliY2dtZ2QzbXRodmN5bWxvcTR5M2o1d2d1YzJ4NHRxd21mYnJ3eXZ1Mjc3a3VidTU2b2VtLmlwZnMudzNzLmxpbmsvaW1hZ2UuanBlZyIsImNhdGVnb3J5IjoiZnVybml0dXJlIiwicHJpY2UiOiI2MCIsImRlc2NyaXB0aW9uIjoiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIiwidGltZXN0YW1wIjoxNjY5MzA4MDE1MzAwLCJkZXRhaWxzIjp7ImFnZSI6IjIiLCJtYXRlcmlhbHMiOiJXb29kLExlYXRoZXIiLCJjb3VudHJ5IjoiVVMiLCJzdGF0ZSI6IkNhbGlmb3JuaWEiLCJ6aXBjb2RlIjoiOTAyMTAiLCJ3ZWlnaHQiOjF9fQ==",true));    
    }
}