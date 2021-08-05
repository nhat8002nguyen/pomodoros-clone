import { SETTING_REQUEST, SETTING_SUCCESS, SETTING_FAIL } from '../constants/settingConstants';
import { MyAxios } from '../../utils/Axios';

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

const resetSetting = () => {};
const updateSetting = () => {};