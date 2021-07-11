import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { Settings } from "./components/Settings";

const App = () => {
	const [ isSettingOpen, setSettingOpen ] = useState(true);

	const openSetting = () => {
		setSettingOpen(prev => !prev);	
	}

  return (
    <div className="container">
			<Header onOpenSetting={openSetting}/>
			<div className="header-line"></div>
			<Main />
			{isSettingOpen && <Settings onClosePopup={() => setSettingOpen(false)}/>}
    </div>
  );
};

export default App;
