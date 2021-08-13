import { SIGNIN_REQUEST, SIGNIN_FAIL, SIGNIN_SUCCESS, 
	LOGOUT, SIGNIN_EXIT, SIGNUP_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST} from "../constants/userConstants" 
import { MyAxios } from "../../utils/Axios"
import Cookies from "js-cookie"
import { pushNotification } from "../../helpers/pushNotification"

export const exitSignin = () => async (dispatch) => {
	dispatch({type: SIGNIN_EXIT})
}

export const signin = ({username, password}) => async (dispatch) => {
	dispatch({type: SIGNIN_REQUEST})
	try {
		const axios = MyAxios();
		const response = await axios.post("/api/login", {name: username, password});
		const data = response.data;
		if (data) {
			Cookies.set('credential', JSON.stringify({username, password, token: data}));
		}
		pushNotification(SIGNIN_SUCCESS);
		dispatch({type: SIGNIN_SUCCESS, payload: {username, password, token: data}});
	} catch (err) {
		pushNotification(SIGNIN_FAIL);
		dispatch({type: SIGNIN_FAIL, payload: err.message});
	}
}

export const signup = ({email, username, password}) => async (dispatch) => {
	dispatch({type: SIGNUP_REQUEST})
	try {
		const axios = MyAxios();
		const { data } = await axios.post("/api/register", {gmail: email, name: username, password: password});
		pushNotification(SIGNUP_SUCCESS);
		dispatch({type: SIGNUP_SUCCESS, payload: data});
	} catch (err) {
		pushNotification(SIGNUP_FAIL);
		dispatch({type: SIGNUP_FAIL, payload: err.message});
	}
}

export const logout = () => async (dispatch) => {
	Cookies.set('credential', {});
	dispatch({type: LOGOUT});
}