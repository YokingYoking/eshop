import {BASE_URL} from "~/api/config";
import axios from "axios";
// import Qs from 'qs';
axios.defaults.baseURL = BASE_URL + "/api"
const PRODUCT_URL = '/product'
axios.defaults.timeout = 10000
export function getHot(num,username) {
    return axios({
        method: 'get',
        url: PRODUCT_URL + '/hot' +'?num=' + num + '&username=' + username,
    })
}
export function getRate(num,username) {
    return axios({
        method: 'get',
        url: PRODUCT_URL + '/rate' +'?num=' + num + '&username=' + username,
    })
}
export function getDetail(productId) {
    return axios({
        method: 'get',
        url: PRODUCT_URL + '/info?productId=' + productId,
    })
}
export function rate(productId, score, username) {
    return axios({
        method: 'post',
        url: PRODUCT_URL + '/rate?' + 'productId=' + productId + '&score=' + score + '&username=' + username,
		// data: Qs.stringify({
		// 	productId: productId,
		// 	score: score,
		// 	username: username,
		// }),
		// headers: {
		//     'Content-Type': 'application/x-www-form-urlencoded'
		// },
    })
}
export function search(query) {
    return axios({
        method: 'get',
        url: PRODUCT_URL + '/search' +'?query=' + query,
    })
}
export function getCart(username) {
    return axios({
        method: 'get',
        url: PRODUCT_URL + '/cart' + '?username=' + username,
    })
}
export function add2Cart(username, productId, amount) {
    return axios({
        method: 'post',
        url: PRODUCT_URL + '/cart/add?username=' + username + '&productId=' + productId + '&amount=' + amount,
		// data: Qs.stringify({
		// 	username: username,
		// 	productId: productId,
		// 	amount: amount,
		// }),
		// headers: {
		//     'Content-Type': 'application/x-www-form-urlencoded'
		// },
    })
}
export function deleteCart(username, productId) {
	return axios({
		method: 'post',
		url: PRODUCT_URL + '/cart/delete?username=' + username + '&productId=' + productId
	})
}
export function clearCart(username) {
	return axios({
		method: 'post',
		url: PRODUCT_URL + '/cart/clear?username=' + username 
	})
}
export function changeCart(username, productId, amount) {
	return axios({
	    method: 'post',
	    url: PRODUCT_URL + '/cart/change?username=' + username + '&productId=' + productId + '&amount=' + amount,
	})
}