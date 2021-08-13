import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation  } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';	
import { CircularProgress } from '@material-ui/core';

export const FetchResultView = () => {
	const { t } = useTranslation();
	const history = useHistory();
	const { message } = useParams();
	const [isLoading, setLoading] = useState(false);

	const handleClick = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			history.go(-2);
		}, 1000);
	}
	
	return (
		<div className="popup-container">
			<div className="result-container">
				<p className="result-message">{t(message)}</p>
				{message === "success" ? <CheckCircleIcon style={{color: "green", transform: "scale(3)"}} /> 
				: <SmsFailedIcon style={{color: "red", transform: "scale(4)"}}/>}
				{isLoading ? <CircularProgress color="secondary" size={30}></CircularProgress> 
				:<input type="submit" value="OK" className="result-button" 
					onClick={() => handleClick()}	
				></input>}
			</div>
		</div>
	)
}