import axios from "axios";

export const web3StorageToken = process.env.NEXT_PUBLIC_WEB3STORAGE_KEY;

export async function getLocationCoords(location) {
	try {
		const base = "https://maps.googleapis.com"; 
		const url = `${base}/maps/api/geocode/json?address=${location}&key=AIzaSyC7v1ol30fETyVST2Tc9-bhwqDIhAmriUE`;
		const _response = await axios.get(url);
		const response = await _response.data;
		return response.results.length > 0 ? response.results[0].geometry.location : null;
	} catch (error) {
		const { message } = err;
		console.log(`error in %c getLocationCoords`, 'font-weight:900');
		//return { results: [], err: true, msg: message };
		return null;
	}
}

export const getCategories = () => {
    return [
        "furniture", "clothes", "other"
    ]
}

export const splitHexAddress = (addr) => {
	if (!addr) return "0x0"
    return `${addr.slice(0, 6)}...${addr.slice(addr.length - 4)}`;
}

export const weiToTrx = (amount) => {
	return amount/1000000
}

export const trxToWei = (amount) => {
	return amount*1000000
}

// String base 64 to blob 
export const dataURItoBlob = (dataURI) => {
	var byteString = atob(dataURI.split(',')[1]);
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	
	for (var i = 0; i < byteString.length; i++) {
	  ia[i] = byteString.charCodeAt(i);
	}
	var blob = new Blob([ab], {type: mimeString});
	
	return [blob, mimeString];
}

// Haversine Formula
export const haversine = (l1, l2) => {
	const toRad = (coord) => Math.PI/180 * coord;
	const kmToMiles = (km) => (km * 0.62137).toFixed(2);

	var R = 6371; // km 
	var x1 = l2.lat-l1.lat;
	var dLat = toRad(x1);  
	var x2 = l2.lng-l1.lng;
	var dLon = toRad(x2);  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
			Math.cos(toRad(l1.lat)) * Math.cos(toRad(l2.lat)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}