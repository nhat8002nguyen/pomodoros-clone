import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { Home } from "./components/Home";
import { Settings } from "./components/Home/Settings";

import { Notifications } from 'react-push-notification';
import { FetchResultView } from "./components/Home/FetchResultView";

const App = () => {
	

  return (
		<Router>
				<Notifications />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/signin">
						<SignIn />
					</Route>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/settings">
						<Settings />
					</Route>
					<Route path="/result/:message">
						<FetchResultView />
					</Route>
				</Switch>
		</Router>
  );
};

export default App;
