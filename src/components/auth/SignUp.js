import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { signin, signup } from '../../redux/actions/userActions';


export const SignUp = () => {
	const { t, i18n } = useTranslation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { success } = useSelector(state => state.userSignup);

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		if (email.length < 1 || username.length < 1 || password.length < 1 || rePassword.length < 1) {
			setDisabled(true);
		} else setDisabled(false);
	}, [username, password, email, rePassword]);

	useEffect(() => {
		if (success) {
			history.replace("/signin");
		} 
	}, [success]);

	const moveToSignIn = () => {
		history.replace("/signin");
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// validate input
		if (email.length < 4 || username.length < 4 || password.length < 4 || rePassword.length < 4) {
			alert(t('lengthGreater4'));
			return false;
		} 
		if (password !== rePassword) {
			alert(t("samePasswords"));
			return false;
		}  

		dispatch(signup({email, username, password}));
	}

	return (
		<div className="signin-container">
			<div onClick={() => history.goBack()}>
				<ArrowBackIcon className="back-btn"/>
			</div>
			<p className="big-title">Pomodoros</p>
			<p className="title">{t('signUp')}</p>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="email" className="credential" placeholder={t("email")}
					onChange={(e) => setEmail(e.target.value)}></input>
				<input type="input" className="credential" placeholder={t("username")}
					onChange={(e) => setUsername(e.target.value)}></input>
				<input type="password" className="credential" placeholder={t("password")}
					onChange={(e) => setPassword(e.target.value)}></input>
				<input type="password" className="credential" placeholder={t("rePassword")}
					onChange={(e) => setRePassword(e.target.value)}></input>
				<input type="submit" disabled={disabled} className="credential signin-btn" value={t("signUp")}></input>
				<div className="row">
					<p>{t("hadAccount")}</p>
					<p onClick={() => moveToSignIn()} className="signup-link">{t("signIn")}</p>
				</div>
			</form>
		</div>
	)
}