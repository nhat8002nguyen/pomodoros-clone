import axios from 'axios';

export const MyAxios = (authToken) => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
	});

	if (authToken) instance.defaults.headers.common['Authorization'] = authToken; 

	return instance;
};