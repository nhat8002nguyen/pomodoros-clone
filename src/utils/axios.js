import axios from 'axios';
import Cookies from 'js-cookie';

export const myAxios = (() => {
	const authToken = Cookies.get('auth-token');

	const instance = axios.create({
		baseURL: "http://localhost:8080",
	});

	if (authToken) instance.defaults.headers.common['Authorization'] = authToken; 

	return instance;
})();