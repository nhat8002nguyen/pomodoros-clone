import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export const SignIn = () => {
	const { t, i18n } = useTranslation();
	const history = useHistory(); 

	const moveToSignUp = () => {
		history.replace("/signup")
	}

	return (
		<div className="signin-container">
			<div onClick={() => history.goBack()}>
				<ArrowBackIcon className="back-btn"/>
			</div>
			<p className="big-title">Pomodoros</p>
			<p className="title">{t('signIn')}</p>
			<form>
				<input type="input" className="credential" placeholder={t("username")}></input>
				<input type="password" className="credential" placeholder={t("password")}></input>
				<div className="row keep-signin">
					<input type="checkbox" value="duy tri" ></input>
					<p>{t("keepSignIn")}</p>
				</div>
				<input type="submit" className="credential signin-btn" value={t("signIn")}></input>
				<div className="row">
					<p>{t("noAccount")}</p>
					<p onClick={() => moveToSignUp()} className="signup-link">{t("signUpNow")}</p>
				</div>
			</form>
		</div>
	)
}