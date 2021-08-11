import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import Main from "./Main";
import { getSetting } from "../../redux/actions/settingActions"; 

import { Flash } from "./Flash";

export const Home = () => {
	const dispatch = useDispatch();

	const { userSignin } = useSelector(state => state.userSignin);
	const settingState = useSelector(state => state.settingState);
	const { loading, error, setting } = settingState;

	useEffect(() => {
		let isMounted = true;
		const username = userSignin?.username;
		if (isMounted && username?.length > 0)
			dispatch(getSetting({username}));

		return () => isMounted = false;
	}, [userSignin])

	return (
		<div className="container">
			{loading ? <Flash /> 
			: error ? <h1>something wrong ! please try again</h1> 
			:<div>
				<Header />
				<div className="header-line"></div>
				{/* <Main setting={setting}/> */}
				<Main />
			</div>}
		</div>
	)
}