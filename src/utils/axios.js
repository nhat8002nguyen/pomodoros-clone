import axios from 'axios';
import Cookies from 'js-cookie';

export const myAxios = (() => {
	const authToken = Cookies.get('auth-token');

	const instance = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
	});

	if (authToken) instance.defaults.headers.common['Authorization'] = authToken; 

	return instance;
})();