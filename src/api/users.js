import {BASE_URL} from "~/api/config";
import axios from "axios";
// import Qs from 'qs';
axios.defaults.baseURL = BASE_URL + "/api"
axios.defaults.timeout = 10000
const USER_URL = '/user'
export function login(form) {
    return axios({
        method: 'post',
        url: USER_URL + '/login?username=' + form.username + '&password=' + form.password,
		// headers: {
		//     'Content-Type': 'application/x-www-form-urlencoded'
		// },
		// data: Qs.stringify(form)
    })
}
export function register(form) {
    return axios({
        method: 'post',
        url: USER_URL + '/register?username=' + form.username + '&password=' + form.password,
		// headers: {
		//     'Content-Type': 'application/x-www-form-urlencoded'
		// },
		// data: Qs.stringify(form)
    })
}