import { SIGNIN_REQUEST, SIGNIN_FAIL, SIGNIN_SUCCESS, LOGOUT, SIGNIN_EXIT} from "../constants/userConstants" 
import { myAxios } from "../../utils/axios"
import Cookies from "js-cookie"

export const exitSignin = () => async (dispatch) => {
	dispatch({type: SIGNIN_EXIT})
}

export const signin = ({username, password, checked}) => async (dispatch) => {
	dispatch({type: SIGNIN_REQUEST})
	try {
		const response = await myAxios.post("/login", {name: username, password});
		const data = response.data;
		if (data && checked) {
			Cookies.set('credential', JSON.stringify({username, password, token: data}));
		}
		dispatch({type: SIGNIN_SUCCESS, payload: {username, password, token: data}});
	} catch (err) {
		dispatch({type: SIGNIN_FAIL, payload: err.message});
	}
}

export const signup = ({username, email, password}) => async (dispatch) => {
	dispatch({type: SIGNIN_REQUEST})
	try {
		const { data } = await myAxios.post("/register", null, {params: {email, username, password}});
		dispatch({type: SIGNIN_SUCCESS, payload: data});
	} catch (err) {
		dispatch({type: SIGNIN_FAIL, payload: err.message});
	}
}

export const logout = () => async (dispatch) => {
	Cookies.set('credential', {});
	dispatch({type: LOGOUT});
}