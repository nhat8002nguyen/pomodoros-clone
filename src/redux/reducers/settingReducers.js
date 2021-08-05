import { SETTING_REQUEST, SETTING_SUCCESS, SETTING_FAIL } from '../constants/settingConstants';

export const getSettingReducer = (state = {}, action) => {
	switch (action.type) {
		case SETTING_REQUEST:
			return { loading: true };
		case SETTING_SUCCESS:
			return { loading: false, success: true, setting: action.payload };
		case SETTING_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}