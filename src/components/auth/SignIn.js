import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { exitSignin, signin } from '../../redux/actions/userActions';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircularProgress from '@material-ui/core/CircularProgress';


export const SignIn = () => {
	const { t } = useTranslation();
	const history = useHistory(); 
	const dispatch = useDispatch();
	const userSignin = useSelector(state => state.userSignin);
	const { loading, error, success } = userSignin;
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setDisabled(username.length > 0 && password.length > 0 ? false: true);
	}, [username, password])

	useEffect(() => {
		success && history.replace("/");
	}, [success, history])

	useEffect(()=> {
		error?.includes("403") && alert(t('signInFail'));
	},[error, t]);

	const moveToSignUp = () => {
		dispatch(exitSignin());
		history.replace("/signup")
	}

	const goBack = () => {
		dispatch(exitSignin());
		history.goBack();
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// validate input
		if (username.length === 0) {
			alert("Please enter name");
			return false;
		}
		if (password.length === 0) {
			alert("please enter passowrd");
			return false;
		}

		dispatch(signin({username, password, checked}));
	}

	return (
		<div className="signin-container">
			<div onClick={() => goBack()}>
				<ArrowBackIcon className="back-btn"/>
			</div>
			<p className="big-title">Pomodoros</p>
			<p className="title">{t('signIn')}</p>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="input" className="credential" placeholder={t("username")} 
					onChange={(e) => setUsername(e.target.value)}></input>
				<input type="password" className="credential" placeholder={t("password")}
					onChange={(e) => setPassword(e.target.value)}></input>
				<div className="row keep-signin">
					<input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} value="duy tri" ></input>
					<p>{t("keepSignIn")}</p>
				</div>
				{!loading ? <input type="submit" disabled={disabled} className="credential signin-btn" value={t("signIn")}></input>
				:<CircularProgress style={{margin: "auto", color: "white"}} size={30}/>}
				<div className="row">
					<p>{t("noAccount")}</p>
					<p onClick={() => moveToSignUp()} className="signup-link">{t("signUpNow")}</p>
				</div>
			</form>
		</div>
	)
}