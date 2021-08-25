import React, { useState } from "react";

import Header from "./Header";
import Main from "./Main";
import TaskView from "./TaskView";
import { ThemeContext, themes } from "../../contexts/ThemeContext";

import { LinearProgress } from "@material-ui/core";



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
					<Main onChangeTheme={changeTheme}/>
					<TaskView />
				</div>
			</div>
		</ThemeContext.Provider>
	)
}