import TronWeb from "tronweb";
import { abi as abiMaster, contractAddress } from "./constants/master";
import { abi as abiDeal, dealBytecode } from "./constants/deal";
import { trxToWei } from "./utils";

const disputeReferi = "TLL9YxjXPkLKxNsgkZrpNf6cEQUjygeu2a";

function useTronWeb() {
    return new TronWeb({
        fullHost: "https://nile.trongrid.io",
        privateKey: process.env.NEXT_PUBLIC_PK        
    });
}

export function getTronWeb() {
    var obj = setInterval(async () => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            clearInterval(obj);
            console.log("tronWeb successfully detected!");
        }
    }, 100);
}

export const getBalance = async () => {
    if (window.tronLink.tronWeb && window.tronLink.tronWeb.ready) {
        let walletBalances = await window.tronLink.tronWeb.trx.getAccount(
            window.tronLink.tronWeb.defaultAddress.base58
        );
        return walletBalances;
    } else {
        return 0;
    }
};

export const getWalletDetails = async () => {
    if (window.tronLink.tronWeb) {
        //checking if wallet injected
        if (window.tronLink.tronWeb.ready) {
            let tempBalance = await getBalance();
            let tempFrozenBalance = 0;

            if (!tempBalance.balance) {
                tempBalance.balance = 0;
            }

            //checking if any frozen balance exists
            if (
                !tempBalance.frozen &&
                !tempBalance.account_resource.frozen_balance_for_energy
            ) {
                tempFrozenBalance = 0;
            } else {
                if (
                    tempBalance.frozen &&
                    tempBalance.account_resource.frozen_balance_for_energy
                ) {
                    tempFrozenBalance =
                        tempBalance.frozen[0].frozen_balance +
                        tempBalance.account_resource.frozen_balance_for_energy
                            .frozen_balance;
                }
                if (
                    tempBalance.frozen &&
                    !tempBalance.account_resource.frozen_balance_for_energy
                ) {
                    tempFrozenBalance = tempBalance.frozen[0].frozen_balance;
                }
                if (
                    !tempBalance.frozen &&
                    tempBalance.account_resource.frozen_balance_for_energy
                ) {
                    tempFrozenBalance =
                        tempBalance.account_resource.frozen_balance_for_energy
                            .frozen_balance;
                }
            }

            //we have wallet and we are logged in
            const details = {
                name: window.tronLink.tronWeb.defaultAddress.name,
                address: window.tronLink.tronWeb.defaultAddress.base58,
                balance: tempBalance.balance / 1000000,
                frozenBalance: tempFrozenBalance / 1000000,
                network: window.tronLink.tronWeb.fullNode.host,
                link: "true",
            };
            return {
                connected: true,
                details,
            };
        } else {
            //we have wallet but not logged in
            const details = {
                name: "none",
                address: "none",
                balance: 0,
                frozenBalance: 0,
                network: "none",
                link: "false",
            };
            return {
                connected: false,
                details,
            };
        }
    } else {
        //wallet is not detected at all
        return {
            connected: false,
            details: null,
        };
    }
};

export const getHexAddress = (addr) => {
    const tWeb = useTronWeb();
    return tWeb.address.toHex(addr);
};

export const getBase58Address = (addr) => {
    const tWeb = useTronWeb();
    return tWeb.address.fromHex(addr);
};

// This fn lists the articles available to deal
export async function getArticles() {
    const tWeb = useTronWeb();
    const contract = await tWeb.contract(abiMaster, contractAddress);

    try {
        const articles = await contract.getArticles().call();
        return articles;
    } catch (error) {
        console.log("smartcontract error", error);
        return {};
    }
}

// This fn gets the indexes of articles published by a single user
export async function getAccountPublications(myAddress) {
    const tWeb = useTronWeb();
    const contract = await tWeb.contract(abiMaster, contractAddress);

    try {
        const articles = await contract.getAccountArticles(myAddress).call();
        return articles;
    } catch (error) {
        console.log("smartcontract error", error);
        return {};
    }
}

// This fn list the deals of a given user address
export async function getAccountDeals(myAddress) {
    const tWeb = useTronWeb();
    const contract = await tWeb.contract(abiMaster, contractAddress);

    try {
        const deals = await contract.getDeals(myAddress).call();
        return deals;
    } catch (error) {
        console.log("smartcontract error", error);
        return {};
    }
}

// This fn list the reviews of a given user address
export async function getAccountReviews(myAddress) {
    const tWeb = useTronWeb();
    const contract = await tWeb.contract(abiMaster, contractAddress);

    try {
        const reviews = await contract.getAccountReviews(myAddress).call();
        return reviews;
    } catch (error) {
        console.log("smartcontract error", error);
        return {};
    }
}

// This fn gets the info of a given contract address
export async function getDealContractInfo(address) {
    const tWeb = useTronWeb();
    const contract = await tWeb.contract(abiDeal, address);

    try {
        let timestamp = await contract.timestamp().call();
        let info = await contract.getContractData().call();
        let [buyer, seller, _amount, productId, shippingAddress, status] = info;
        let amount = parseInt(_amount);

        return {
            address,
            buyer,
            seller,
            amount,
            productId,
            shippingAddress,
            status,
            timestamp,
        };
    } catch (error) {
        console.log("smartcontract error", error);
        return {};
    }
}

export async function addPublication(dataBase64) {
    const tWeb = window.tronLink.tronWeb;
    const contract = await tWeb.contract(abiMaster, contractAddress);

    try {
        const result = await contract.addArticle(dataBase64).send({
            feeLimit: 1_000_000_000,
        });

        return {
            result,
            transactionId: result,
            err: false,
        };
    } catch (error) {
        console.log("smartcontract error", error);
        return {
            err: true,
        };
    }
}

export async function lockPublication(data, index) {
    const tWeb = useTronWeb();
    const contract = await tWeb.contract(abiMaster, contractAddress);

    try {
        const result = await contract.updateArticle(data, false, index)
        .send({
            feeLimit: 1_000_000_000,
        });

        return {
            result,
            transactionId: result,
            err: false,
        };
    } catch (error) {
        console.log("smartcontract error", error);
        return {
            err: true,
        };
    }
}

export async function addDealReview(addrDeal, toUser, score, comment) {
    const tWeb = useTronWeb();
    const contract = await tWeb.contract(abiMaster, contractAddress);

    try {
        const result = await contract.addReview(
            toUser,
            addrDeal,
            0,
            Math.ceil(score),
            comment,
            Date.now().toString(),
            0
        ).send({
            feeLimit: 1_000_000_000,
        });

        return {
            result,
            transactionId: result,
            err: false,
        };
    } catch (error) {
        console.log("smartcontract error", error);
        return {
            err: true,
        };
    }
}

// This fn releases the balance of a given contract to the seller. The executer must be the buyer.
export async function releaseAmount(address) {
    const tWeb = window.tronLink.tronWeb;
    const contract = await tWeb.contract(abiDeal, address);

    try {
        const result = await contract.releaseAmount().send({
            feeLimit: 100_000_000,
        });

        return {
            address,
            transactionId: "",
            err: false,
        };
    } catch (error) {
        console.log(error);
        return {
            err: true,
        };
    }
}

// This fn generates an unique contract for each new deal
export async function generateDealContract({
    articleId,
    shippingAddress,
    amount,
    seller,
    buyer,
    timestamp,
}) {
    const tweb = window.tronLink.tronWeb;
    const _callValue = trxToWei(amount);
    try {
        let abi = JSON.stringify(abiDeal);
        let code = dealBytecode.object;
        let transaction = await tweb.transactionBuilder.createSmartContract(
            {
                abi: abi,
                bytecode: code,
                feeLimit: 1000000000,
                callValue: _callValue,
                userFeePercentage: 1,
                originEnergyLimit: 10000000,
                parameters: [
                    buyer,
                    seller,
                    disputeReferi,
                    amount,
                    articleId,
                    shippingAddress,
                    timestamp,
                ],
            },
            tweb.defaultAddress.hex
        );

        const signedTransaction = await tweb.trx.sign(transaction);
        const instance = await tweb.trx.sendRawTransaction(signedTransaction);
        console.log(instance);

        // update master contract
        const masterContract = await tweb.contract(abiMaster, contractAddress);
        const result = await masterContract
            .addDeal(instance.transaction.contract_address, seller, buyer)
            .send({
                feeLimit: 100_000_000,
            });

        return {
            err: false,
            hex: instance.transaction.contract_address,
            base58: tweb.address.fromHex(instance.transaction.contract_address),
        };
    } catch (error) {
        console.log(error);
        return {
            err: true,
        };
    }
}
