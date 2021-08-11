import { SETTING_REQUEST, SETTING_SUCCESS, SETTING_FAIL,
	UPDATE_SETTING_REQUEST, UPDATE_SETTING_SUCCESS, UPDATE_SETTING_FAIL, 
	RESET_SETTING_REQUEST, RESET_SETTING_SUCCESS, RESET_SETTING_FAIL } from '../constants/settingConstants';
import { MyAxios } from '../../utils/Axios';
import { pushNotification } from '../../helpers';


export const getSetting = ({ username }) => async (dispatch, getState) => {
	dispatch({type: SETTING_REQUEST})
	try {
		// get token from state
		const { userSignin: { userSignin: { token }} } = getState();
		// get user id from username
		const axios = MyAxios(token);
		const { data: data1 } = await axios.get("/api/user", {  params: { name: username } });
		const userId = data1.id;

		const { data } = await axios.get(`/api/users/${userId}/userSetting`);
		dispatch({type: SETTING_SUCCESS, payload: data});
	} catch (err) {
		dispatch({type: SETTING_FAIL, payload: err.message});
	}
}

export const updateSetting = (updatingSetting) => async (dispatch, getState) => {
	dispatch({type: UPDATE_SETTING_REQUEST });
	try {
		const { settingState: { setting: { _links: { self: { href: settingURL }}}}} = getState();
		const { userSignin: { userSignin: { token }} } = getState();
		const axios = MyAxios(token);
		const { data } = await axios.put(settingURL, {...updatingSetting});

		pushNotification(UPDATE_SETTING_SUCCESS);
		dispatch({type: UPDATE_SETTING_SUCCESS, payload: data});
	} catch (err) {
		pushNotification(UPDATE_SETTING_FAIL);
		dispatch({type: UPDATE_SETTING_FAIL, payload: err.message});
	}
}
export const resetSetting = ({username}) => async (dispatch, getState) => {
	dispatch({type: RESET_SETTING_REQUEST});
	try {
		// get token from state
		const { userSignin: { userSignin: { token }} } = getState();
		// get user id from username
		const axios = MyAxios(token);
		const { data: data1 } = await axios.get("/api/user", {  params: { name: username } });
		const userId = data1.id;
		const { data } = axios.post(`/api/resetSetting/${userId}`);

		pushNotification(RESET_SETTING_SUCCESS);
		dispatch({type: RESET_SETTING_SUCCESS, payload: data});
	} catch (err) {
		pushNotification(RESET_SETTING_FAIL);
		dispatch({type: RESET_SETTING_FAIL, payload: err.message});
	}
};
