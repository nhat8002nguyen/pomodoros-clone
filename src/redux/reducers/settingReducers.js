import { SETTING_REQUEST, SETTING_SUCCESS, SETTING_FAIL, UPDATE_SETTING_REQUEST, UPDATE_SETTING_SUCCESS, 
	UPDATE_SETTING_FAIL, RESET_SETTING_REQUEST, RESET_SETTING_SUCCESS, RESET_SETTING_FAIL, EXIT_SETTING } 
	from '../constants/settingConstants';

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

export const updateSettingReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_SETTING_REQUEST:
			return { loading: true };
		case UPDATE_SETTING_SUCCESS:
			return { loading: false, success: true, setting: action.payload};
		case UPDATE_SETTING_FAIL:
			return { loading: false, error: action.payload };
		case EXIT_SETTING:
			return { ...state, loading: false, success: false}
		default:
			return state;
	}
}

export const resetSettingReducer = (state = {}, action) => {
	switch (action.type) {
		case RESET_SETTING_REQUEST:
			return { loading: true };
		case RESET_SETTING_SUCCESS:
			return { loading: false, success: true, setting: action.payload };
		case RESET_SETTING_FAIL:
			return { loading: false, error: action.payload };
		case EXIT_SETTING:
			return { ...state, loading: false, success: false}
		default:
			return state;
	}
}