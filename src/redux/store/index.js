import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Cookies from "js-cookie";

import { signInReducer, signUpReducer } from '../reducers/userReducers';
import { getSettingReducer, resetSettingReducer, updateSettingReducer } from '../reducers/settingReducers';
import { taskReducer } from '../reducers/taskReducers';


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
		settingState: getSettingReducer,
		updateSettingState: updateSettingReducer,
		resetSettingState: resetSettingReducer,
		taskState: taskReducer,
	});
	const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

	const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));
	return store;
}

