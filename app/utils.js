import axios from "axios";

export const web3StorageToken = "";

const backendBaseURL = "http://localhost:300/api";

export const request = async ({url, fname, method = 'GET', data = null, _baseURL = null}) => {
	const instance = axios.create();
	const baseURL = _baseURL || backendBaseURL;
	return instance.request({
		baseURL,
		url,
		method,
		data
	})
	.then(response => response.data)
	.catch(err => {
		const { message, response:{data, status} } = err;
		console.log(`request error in %c ${fname}`, 'font-weight:900');
		console.log(message);
		return { err: true, errmsg: message, ...data };
	})
}

export async function getProducts(url) {
    const response = await request({
        _baseURL: backendBaseURL,
        url: `/getProducts`,
        method: 'POST',
        fname: 'getProducts',
        data: {url},
    });

    return response;
}

export const getCategories = () => {
    return [
        "furniture", "clothes", "other"
    ]
}

export const splitHexAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(addr.length - 4)}`;
}

export const weiToTrx = (amount) => {
	return amount/1000000
}

export const trxToWei = (amount) => {
	return amount*1000000
}