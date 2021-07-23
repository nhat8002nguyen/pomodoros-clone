import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


export const SignUp = () => {
	const { t, i18n } = useTranslation();

	return (
		<div className="signin-container">
			<p className="big-title">Pomodoros</p>
			<p className="title">{t('signUp')}</p>
			<form>
				<input type="input" className="credential" placeholder={t("username")}></input>
				<input type="password" className="credential" placeholder={t("password")}></input>
				<input type="password" className="credential" placeholder={t("rePassword")}></input>
				<input type="submit" className="credential signin-btn" value={t("signUp")}></input>
				<div className="row">
					<p>{t("hadAccount")}</p>
					<p className="signup-link">{t("signIn")}</p>
				</div>
			</form>
		</div>
	)
}