import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Web3Storage } from "web3.storage";
import { dataURItoBlob, getLocationCoords, haversine, web3StorageToken } from "./utils";
import { categories } from "./data";
import {
    getTronWeb,
    getWalletDetails,
    getArticles,
    addPublication,
    getAccountPublications,
    generateDealContract,
    getAccountDeals,
    getDealContractInfo,
    releaseAmount,
    getAccountReviews,
    addDealReview,
    lockPublication,
} from "./tronsvc";

const storageClient = new Web3Storage({ token: web3StorageToken });

const DataContext = createContext();
export const useDatacontext = () => useContext(DataContext);

const DataContextProvider = (props) => {
    const router = useRouter();

    const [dealsList, setDealsList] = useState(null);
    const [articleList, setArticleList] = useState([]);
    const [articlesLoaded, setArticlesLoaded] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);
    const [accountInfo, setAccountInfo] = useState({});
    const [status, setStatus] = useState("");

    useEffect(() => {
        setCategoriesList(categories);

        setTimeout(() => {
            initTron();
        }, 1000);

        getArticles().then((response) => {
            const items = response.map(([data, active]) => {
                const obj = active ? JSON.parse(atob(data)) : {id:data};
                return { ...obj, active };
            });
            console.log('done',items);
            setArticleList(items);
            setArticlesLoaded(true);
            // pending order by distance from user
        });

    }, []);

    async function initTron() {
        const res = await window.tronLink.request({
            method: "tron_requestAccounts",
        });
        getTronWeb();
        setWalletDetails();
    }

    async function setWalletDetails() {
        const interval = setInterval(async () => {
            const walletDetails = await getWalletDetails();
            if (walletDetails.connected) {
                console.log("Wallet connected");
                setStatus("connected");
                setAccountInfo(walletDetails.details);
                console.log(walletDetails.details);
                clearInterval(interval);
                getDealsList(walletDetails.details.address);
            }
        }, 2000);
    }

    const getPublications = async (addr) => {
        const result = await getAccountPublications(addr);
        return result.map((o) => parseInt(o));
    };

    const getDealsList = (addr) => {
        getAccountDeals(addr).then((response) => {
            const contracts = response[0].map((o) =>
                getDealContractInfo(o.addr)
            );
            Promise.all(contracts).then((result) => {
                console.log("contracts", result);
                setDealsList(result);
            });
        });
    };

    const getReviews = async (addr) => {
        const result = await getAccountReviews(addr);
        return result;
    }

    const addReview = async (addrDeal, toUser, score, comment) => {
        const rewardPoints = await getRewadPointsQuote("NY, US", "NY, US", 4, "wood");
        const result = await addDealReview(addrDeal, toUser, score + rewardPoints, comment);
        console.log(result)
        return result;
        // address toUser => user who receives comment
        // address fromUser => address of deal contract (masterContract has to be updated)
        // uint256 dealIndex => 0 (no in use)
        // uint256 score => score + rewardQuote
        // string memory comment => str
        // string memory timestamp => Date.now()
        // uint8 _badge => 0 if no badge to add
    }

    const publishArticle = async (data, base64Image) => {
        const [blob, mimeString] = dataURItoBlob(base64Image);
        const filename = `image.${mimeString.split("/")[1]}`;
        const file = new File([blob], filename, { type: mimeString });

        try {
            console.log("wait...");
            const rootCid = await storageClient.put([file]);
            data.image = `https://${rootCid}.ipfs.w3s.link/${filename}`;

            const dataBase64 = btoa(JSON.stringify(data));
            const result = await addPublication(dataBase64);

            return { success: true, result };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    };

    const makeDispute = (addr) => {
        console.log("dispute enabled for deal " + addr);
    };

    const releaseDealAmount = async (addr) => {
        const response = await releaseAmount(addr);
        if (response.err) {
            alert("Something gone wrong! Try again!");
            return {success: false}
        } else {
            alert("Contract amount released");
            return {success: true}
        } 
    };

    const getShippingQuote = () => {
        // use haversine, the $x per km
        // This is a mock quote, the real quote will be obtained using the weight and dimentions of the item
        const min = Math.ceil(25);
        const max = Math.floor(50);
        return Math.floor(Math.random() * (max - min) + min);
    };

    const getDiscountQuote = () => {
        // check badges and categories to apply
        // Same here, just a dummy random number to test
        const min = Math.ceil(1);
        const max = Math.floor(10);
        return Math.floor(Math.random() * (max - min) + min);
    };

    const getRewadPointsQuote = async (loc1, loc2, age, materials) => {
        const coords1 = await getLocationCoords(loc1);
        const coords2 = await getLocationCoords(loc2);
        const distance = haversine(coords1, coords2);

        const mqty = materials.split(",").length; // count of materials
        const points = 50*(age/8 + mqty/4) / (1 + distance/100); // base 50pt, decrease with larger distances

        return points;
    };

    const doCheckout = async (data) => {
        // create deal contract + send amount
        // update DealsMaster
        let deal = await generateDealContract(data);

        if (deal.err) {
            return false;
        }

        //updateArticle(adata, false)
        alert(`Deal ${deal.base58} was generated`);

        // go to my deals
        router.push(`/deals`);

        // lock item for sell
        setTimeout(() => {
            const index = articleList.findIndex(o => o.id === data.articleId);
            const data = btoa(JSON.stringify(articleList[index]));
            lockPublication(data, index).then(response => {
                console.log('publication locked', response)
            });
        }, 1000);
    };

    const data = {
        status,
        dealsList,
        categoriesList,
        articlesLoaded,
        articleList,
        accountInfo,
    };

    const fn = {
        doCheckout,
        setWalletDetails,
        getShippingQuote,
        getDiscountQuote,
        getRewadPointsQuote,
        releaseDealAmount,
        getPublications,
        publishArticle,
        makeDispute,
        getReviews,
        addReview
    };

    return (
        <DataContext.Provider value={{ data, fn }}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;
