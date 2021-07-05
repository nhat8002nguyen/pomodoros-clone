import i18next from "i18next";
import React, {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
	const [setttingsVisible, setSettingsVisible] = useState(false);
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(i18n.language);
	
	const toggleLanguage = () => {
		const newLang = language === "vi" ? "en" : "vi";
		setLanguage(newLang);
		i18next	
		.changeLanguage(newLang)
		.then((t) => {
			t('key'); // -> same as i18next.t
		});
	}


  return (
    <div className="header">
      <text className="title">pomodoros</text>
      <div className="header-btn-group">
        <div className="header-btn" onClick={() => setSettingsVisible(true)}>
          <text>{t('settings')}</text>
        </div>
        <div className="header-btn">
          <text>{t('profile')}</text>
        </div>
        <div className="header-btn" onClick={() => toggleLanguage()}>
          <text>{language}</text>
        </div>
      </div>
    </div>
  );
};

export default Header;
