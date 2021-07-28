import { LOGOUT, SIGNIN_FAIL, SIGNIN_EXIT, SIGNIN_REQUEST, 
	SIGNIN_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../constants/userConstants";


export const signInReducer = (state = {}, action) => {
	switch (action.type) {
		case SIGNIN_EXIT: 
			return { loading: false, error: "", success: false, userSignin: {} }
		case SIGNIN_REQUEST:
			return { loading: true };
		case SIGNIN_SUCCESS:
			return { loading: false, success: true, userSignin: action.payload };
		case SIGNIN_FAIL:
			return { loading: false, error: action.payload };
		case LOGOUT: 
			return { success: false }
		default: 
			return state;
	}
}

export const signUpReducer = (state = {}, action) => {
	switch (action.type) {
		case SIGNUP_REQUEST:
			return { loading: true };
		case SIGNUP_SUCCESS:
			return { loading: false, success: true, userSignup: action.payload }
		case SIGNUP_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state;
	}
}
