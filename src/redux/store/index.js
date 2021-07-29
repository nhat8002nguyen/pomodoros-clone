import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Cookies from "js-cookie";

import { signInReducer, signUpReducer } from '../reducers/userReducers';


export const configureStore = () => {
	const getInitalState = () => {
		const userSignin = Cookies.getJSON('credential');
		return {
			userSignin: { userSignin },
		}
	}

	const initialState = getInitalState();	
	const reducers =  combineReducers({
		userSignin: signInReducer,
		userSignup: signUpReducer,
	});
	const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

	const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));
	return store;
}

