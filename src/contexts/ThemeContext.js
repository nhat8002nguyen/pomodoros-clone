import React from 'react';
import { LONG_BREAK_AREA_COLOR, LONG_BREAK_COLOR, POMODORO_AREA_COLOR, POMODORO_COLOR, SHORT_BREAK_AREA_COLOR, SHORT_BREAK_COLOR } from "../constants/windowColors";

export const themes = {
	pomodoroTheme: {
		background: POMODORO_COLOR,	
		foreground: POMODORO_AREA_COLOR,
	},
	shortBreakTheme: {
		background: SHORT_BREAK_COLOR,	
		foreground: SHORT_BREAK_AREA_COLOR,
	},
	longBreakTheme: {
		background: LONG_BREAK_COLOR,	
		foreground: LONG_BREAK_AREA_COLOR,
	}
}

export const ThemeContext = React.createContext({
	theme: themes.pomodoroTheme,
	changeTheme: () => {}
});