import React, { useState } from "react";

import Header from "./Header";
import Main from "./Main";
import TaskView from "./TaskView";

import { ThemeContext, themes } from "../../contexts/ThemeContext";

export const Home = () => {

	const [theme, setTheme] = useState(themes.pomodoroTheme);
	const changeTheme = (theme) => {
		setTheme(theme);
	}
	const [saveTemplateOpen, setSaveTemplateOpen] = useState(false);
	const [addTemplateOpen, setAddTemplateOpen] = useState(false);


	return (
		<ThemeContext.Provider value={{theme, changeTheme}}>
			<div className="container">
				<div>
					<Header />
					<div className="header-line"></div>
					<Main onChangeTheme={changeTheme}/>
					<TaskView />
				</div>
			</div>
		</ThemeContext.Provider>
	)
}