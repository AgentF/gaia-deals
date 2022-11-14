import TronWeb from "tronweb";
import { abi as abiMaster, contractAddress } from './constants/master';
import { abi as abiDeal, dealBytecode } from './constants/deal';
import { trxToWei } from "./utils";

const disputeReferi = "TLL9YxjXPkLKxNsgkZrpNf6cEQUjygeu2a";

function useTronWeb() {
    return new TronWeb({
        fullHost: 'https://nile.trongrid.io',
        privateKey: "f5dedbcbfe1778ac7455adb12d4fcbe8ff9f83a378acee7f10a94242aff1d34e"
    });
}

export function getTronWeb(){
  var obj = setInterval(async ()=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        clearInterval(obj)
        console.log("tronWeb successfully detected!")
    }
  }, 100)
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
}

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
                link: 'true',
            };
            return {
                connected: true,
                details
            }
        } else {
            //we have wallet but not logged in
            const details = {
                name: 'none',
                address: 'none',
                balance: 0,
                frozenBalance: 0,
                network: 'none',
                link: 'false',
            };
            return {
                connected: false,
                details
            }
        }
    } else {
        //wallet is not detected at all
        return {
            connected: false,
            details: null
        }
    }
}

export const getHexAddress = (addr) => {
    const tWeb = useTronWeb();
    return tWeb.address.toHex(addr);
}

export const getBase58Address = (addr) => {
    const tWeb = useTronWeb();
    return tWeb.address.fromHex(addr);
}

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

export async function getDeals(myAddress) {
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

export async function getDealContractInfo(address) {
    const tWeb = useTronWeb();
    const contract = await tWeb.contract(abiDeal, address);

    try {
        let buyer = await contract.buyer().call();
        let seller = await contract.seller().call();
        let amount = await contract.amount().call();
        let productId = await contract.productId().call();
        let shippingAddress = await contract.shippingAddress().call();
        let timestamp = await contract.timestamp().call();
        let status = await contract.status().call();
        return {
            address, buyer, seller, amount, productId, shippingAddress, timestamp, status
        };

    } catch (error) {
        console.log("smartcontract error", error);
        return {};
    }
}

export async function releaseAmount(address) {
    const tWeb = window.tronLink.tronWeb;
    const contract = await tWeb.contract(abiDeal, address);
    
    try {
        const result = await contract
            .releaseAmount()
            .send({
                feeLimit: 100_000_000,
            });
        
        return {
            address,
            transactionId: "",
            err: false
        }

    } catch (error) {
        console.log(error)
        return {
            err: true
        }
    }
}

export async function generateDealContract({
    articleId,
    shippingAddress,
    amount,
    seller,
    buyer,
    timestamp
}) {
    const tweb = window.tronLink.tronWeb;
    const _callValue = trxToWei(amount)
    try {
        let abi = JSON.stringify(abiDeal);
        let code = dealBytecode.object;
        let transaction = await tweb.transactionBuilder.createSmartContract({
            abi:abi,
            bytecode:code,
            feeLimit:1000000000,
            callValue:_callValue,
            userFeePercentage:1,
            originEnergyLimit:10000000,
            parameters:[buyer, seller, disputeReferi, amount, articleId, shippingAddress, timestamp]
        }, tweb.defaultAddress.hex);

        const signedTransaction = await tweb.trx.sign(transaction);
        const instance = await tweb.trx.sendRawTransaction(signedTransaction); 
        console.log(instance)

        // update master contract
        const masterContract = await tweb.contract(abiMaster, contractAddress);
        const result = await masterContract
            .addDeal(instance.transaction.contract_address, seller, buyer)
            .send({
                feeLimit: 100_000_000
            });

        return {
            err: false,
            hex: instance.transaction.contract_address,
            base58: tweb.address.fromHex(instance.transaction.contract_address)
        }
        
    } catch (error) {
        console.log(error)
        return {
            err: true
        }
    }

}