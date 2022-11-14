import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router'
import { Web3Storage } from "web3.storage";
import { web3StorageToken } from "./utils";
import { deals, articles, categories } from "./data";
import { getTronWeb, getWalletDetails, getArticles, generateDealContract, getDeals, getDealContractInfo, releaseAmount } from "./tronsvc";

const storageClient = new Web3Storage({ token: web3StorageToken });

const DataContext = createContext();
export const useDatacontext = () => useContext(DataContext);

const DataContextProvider = (props) => {
    const router = useRouter();

    const [dealsList, setDealsList] = useState([]);
    const [articleList, setArticleList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [accountInfo, setAccountInfo] = useState({});
    const [status, setStatus] = useState("");

    useEffect(() => {
        setDealsList(deals);
        setArticleList(articles);
        setCategoriesList(categories);

        setTimeout(() => {
            initTron();
        }, 1000);

        // getArticles().then((response) => {
        //     const items = response.map(([data, active]) => {
        //         const obj = JSON.parse(atob(data));
        //         return {...obj, ...active};
        //     })
        //     console.log(items)
        //     setArticleList(items);
        // });

        
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

    const getDealsList = (addr) => {
        getDeals(addr).then(response => {
            const contracts = response[0].map(o => getDealContractInfo(o.addr));
            Promise.all(contracts).then(result => {
                console.log('contracts', result)
                setDealsList(result);
            })
            
        })
    }

    const releaseDealAmount = (addr) => {
        releaseAmount(addr).then(response => {
            if (response.err) {
                alert('Something gone wrong! Try again!')
            }
            else {
                alert("Contract amount released")
            }
        })
    }

    const getShippingQuote = () => {
        // This is a mock quote, the real quote will be obtained using the weight and dimentions of the item
        const min = Math.ceil(25);
        const max = Math.floor(50);
        return Math.floor(Math.random() * (max - min) + min);
    };

    const getDiscountQuote = () => {
        // Same here, just a dummy random number to test
        const min = Math.ceil(1);
        const max = Math.floor(10);
        return Math.floor(Math.random() * (max - min) + min);
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
        // setTimeout(() => {
        //     lockArticle(data.articleId);
        // }, 1000);
    }

    const data = {
        status,
        dealsList,
        categoriesList,
        articleList,
        accountInfo,
    };

    const fn = {
        doCheckout,
        setWalletDetails,
        getShippingQuote,
        getDiscountQuote,
        releaseDealAmount
    };

    return (
        <DataContext.Provider value={{ data, fn }}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;
