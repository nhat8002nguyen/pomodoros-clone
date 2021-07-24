import i18next from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { Settings } from "./Settings";

const Header = ({ onOpenSetting }) => {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(i18n.language);
	const history = useHistory();
	
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

  return (
    <div className="header">
      <p className="title">pomodoros</p>
      <div className="header-btn-group">
				<Settings triggerButton={
					<div className="header-btn" onClick={() => onOpenSetting()}>
						<p>{t('settings')}</p>
					</div>
				}/>
        
        <div className="header-btn" onClick={() => goToSignin()}>
          <p>{t('signIn')}</p>
        </div>
        <div className="header-btn" onClick={() => toggleLanguage()}>
          <p>{language}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;