import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import Main from "./Main";
import { Settings } from "./Settings";

import { getSetting } from "../../redux/actions/settingActions"; 
import { Flash } from "./Flash";

export const Home = () => {
	const dispatch = useDispatch();
	const [ isSettingOpen, setSettingOpen ] = useState(true);

	const { userSignin } = useSelector(state => state.userSignin);
	const settingState = useSelector(state => state.settingState);
	const { loading, error, setting } = settingState;

	useEffect(() => {
		const username = userSignin?.username;
		if (username?.length > 0)
			dispatch(getSetting({username}));
	}, [userSignin])

	const openSetting = () => {
		setSettingOpen(prev => !prev);	
	}	

	return (
		<div className="container">
			{loading ? <Flash /> 
			: error ? <h1>something wrong ! please try again</h1> 
			:<div>
				<Header onOpenSetting={openSetting}/>
				<div className="header-line"></div>
				{isSettingOpen && <Settings />}
				<Main setting={setting}/>
			</div>}
		</div>
	)
}