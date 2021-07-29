import React, { useState } from "react";

import Header from "./Header";
import Main from "./Main";
import { Settings } from "./Settings";

export const Home = () => {
	const [ isSettingOpen, setSettingOpen ] = useState(true);

	const openSetting = () => {
		setSettingOpen(prev => !prev);	
	}	

	return (
		<div className="container">
			<Header onOpenSetting={openSetting}/>
			<div className="header-line"></div>
			{isSettingOpen && <Settings onClosePopup={() => setSettingOpen(false)}/>}
			<Main />
		</div>

	)
}