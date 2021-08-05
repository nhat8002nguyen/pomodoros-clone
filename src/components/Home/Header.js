import i18next from "i18next";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { Settings } from "./Settings";
import { logout } from "../../redux/actions/userActions";

import Popup from "reactjs-popup";

const Header = ({ onOpenSetting }) => {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(i18n.language);
	const history = useHistory();
	const dispatch = useDispatch(); 
	const [isSignedIn, setSignedIn] = useState(false);
	const [username, setUsername] = useState("");

	const { userSignin, success } = useSelector(state => state.userSignin);

	// check if keep signin is checked
	useEffect(() => {
		if (Cookies.getJSON('credential')?.token != null) {
			const { username } = Cookies.getJSON('credential');
			const name = username;
			setUsername(name);
			setSignedIn(true);
		} else if (userSignin?.username) {
			setUsername(userSignin.username);
			setSignedIn(true);
		}
	},[userSignin])

	useEffect(() => {
		const token = Cookies.getJSON('credential')?.token;
		(!success && !token?.includes('Bearer')) && setSignedIn(false);
	},[success])
	
	const toggleLanguage = () => {
		const newLang = language === "vi" ? "en" : "vi";
		setLanguage(newLang);
		i18next	
		.changeLanguage(newLang)
		.then((t) => {
			t('key'); // -> same as i18next.t
		});
	}

	const goToSignin = () => {
		history.push("/signin");
	}

	const handleLogout = () => {
		dispatch(logout())
	}

  return (
    <div className="header">
      <p className="title">pomodoros</p>
      <div className="header-btn-group">
				<Settings triggerButton={
					<div className="header-btn" onClick={() => onOpenSetting()}>
						<p>{t('settings')}</p>
					</div>
				}/>
        
        {!isSignedIn ? <div className="header-btn" onClick={() => goToSignin()}>
          <p>{t('signIn')}</p>
        </div>
				:<Popup trigger={<div className="header-btn">
          <p>{username}</p>
        </div>} position="bottom center">
					<div className="header-menu">
						<p className="header-logout" onClick={() => handleLogout()}>Log out</p>		
					</div>			
				</Popup>}
        <div className="header-btn" onClick={() => toggleLanguage()}>
          <p>{language}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
