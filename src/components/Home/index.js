import React, { useState } from "react";

import Header from "./Header";
import Main from "./Main";
import Task from "./TaskView";
import { ThemeContext, themes } from "../../contexts/ThemeContext";

export const Home = () => {

	const [theme, setTheme] = useState(themes.pomodoroTheme);
	const changeTheme = (theme) => {
		setTheme(theme);
	}

	return (
		<ThemeContext.Provider value={{theme, changeTheme}}>
			<div className="container">
				<div>
					<Header />
					<div className="header-line"></div>
					<Main onChangeTheme={changeTheme}/>
					<Task />
				</div>
			</div>
		</ThemeContext.Provider>
	)
}