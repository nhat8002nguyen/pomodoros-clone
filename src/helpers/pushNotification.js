import addNotification from 'react-push-notification';
import { SIGNIN_SUCCESS, SIGNIN_FAIL, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../redux/constants/userConstants';
import { UPDATE_SETTING_SUCCESS, UPDATE_SETTING_FAIL, RESET_SETTING_SUCCESS, RESET_SETTING_FAIL
 } from '../redux/constants/settingConstants';		
import { WORK_NOTIFY, SHORT_BREAK_NOTIFY, LONG_BREAK_NOTIFY } from '../constants/notificationConstants';

export const pushNotification = (name, detail = null) => {
	const titles = {
		"Pomodoros": "Time to work !",
		"Short Break": "Time to take a short break !",
		"Long Break": "Time to take a long break !",
		SIGNIN_SUCCESS: "Sign in successfully !",
		SIGNIN_FAIL: "Signin in fail !",
		SIGNUP_SUCCESS: "Sign up successfully !",
		SIGNUP_FAIL: "Signup in fail !",
		UPDATE_SETTING_SUCCESS: "Update setting successfully !",
		RESET_SETTING_SUCCESS: "Reset setting successfully !",
		UPDATE_SETTING_FAIL: "Update setting fail !",
		RESET_SETTING_FAIL: "Reset setting fail !",
		WORK_NOTIFY: `${detail} minutes to start work`,
		SHORT_BREAK_NOTIFY: `${detail} minutes to short break`,
		LONG_BREAK_NOTIFY: `${detail} minutes to long break`,
	}
	const message = {
		SIGNIN_FAIL: "Please try again",
		SIGNUP_FAIL: "Please try again",
		UPDATE_SETTING_FAIL: "please try again",
		RESET_SETTING_FAIL: "please try again",
	}
	const themes = {
		"Pomodoros": "red",
		"Short Break": "light",
		"Long Break": "darkblue",
	}
	addNotification({
		title: titles[name],
		theme: themes[name],
		message: message[name],
		native: true
	});
}