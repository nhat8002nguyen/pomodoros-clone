import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


export const SignIn = () => {
	const { t, i18n } = useTranslation();

	return (
		<div className="signin-container">
			<p className="big-title">Pomodoros</p>
			<p className="title">{t('signIn')}</p>
			<form>
				<input type="input" className="credential" placeholder={t("username")}></input>
				<input type="password" className="credential" placeholder={t("password")}></input>
				<input type="submit" className="credential signin-btn" value={t("signIn")}></input>
				<div className="row">
					<p>{t("noAccount")}</p>
					<p className="signup-link">{t("signUpNow")}</p>
				</div>
			</form>
		</div>
	)
}