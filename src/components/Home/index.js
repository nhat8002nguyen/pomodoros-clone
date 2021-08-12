import React from "react";

import Header from "./Header";
import Main from "./Main";


export const Home = () => {

	return (
		<div className="container">
			<div>
				<Header />
				<div className="header-line"></div>
				<Main />
			</div>
		</div>
	)
}