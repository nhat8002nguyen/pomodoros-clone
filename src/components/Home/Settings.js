import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import Switch from '@material-ui/core/Switch';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const timeTypes = [
	{ id: 1, name: "Pomodoros", value: 20 },
	{ id: 2, name: "shortBreak", value: 5 },
	{ id: 3, name: "longBreak", value: 15 },
];

const alarmSounds = [
	{id: 1, name: "wood"},
	{id: 2, name: "cat"},
	{id: 3, name: "dog"},
	{id: 4, name: "tiger"},
	{id: 5, name: "summer"},
] 
const tickingSounds = [
	{id: 1, name: "wood"},
	{id: 2, name: "cat"},
	{id: 3, name: "dog"},
	{id: 4, name: "tiger"},
	{id: 5, name: "summer"},
];

const notifyTypes = [
	{ id: 1, name: "Last" },
	{ id: 2, name: "Before" },
]

export const Settings = ({triggerButton}) => {
	const { t } = useTranslation();
	const settingState = useSelector(state => state.settingState);
	const { setting } = settingState;

	const [pomoMinutes, setPomoMinutes] = useState(timeTypes[0].value);
	const [shortMinutes, setShortMinutes] = useState(timeTypes[1].value);
	const [longMinutes, setLongMinutes] = useState(timeTypes[2].value);
	const [autoStartBreaks, setAutoStartBreaks] = useState(false);
	const [autoStartPomo, setAutoStartPomo] = useState(true);
	const [longBreakInterval, setLongBreakInterval] = useState(4);
	const [alarmVolume, setAlarmVolume] = useState(39);
	const [alarmRepeat, setAlarmRepeat] = useState(1);
	const [tickingVolume, setTickingVolume] = useState(50);
	const [darkMode, setDarkMode] = useState(false);
	const [notificationMode, setNotificationMode] = useState("Last");
	const [notificationMinutes, setNotificationMinutes] = useState(2);

	const popup = useRef();
	
	useEffect(() => {
		if (setting && Object.keys(setting).length > 0) {
			setPomoMinutes(setting.pomodoro);
			setShortMinutes(setting.shortBreak);
			setLongMinutes(setting.longBreak);
			setAutoStartBreaks(setting.autoStartBreak);
			setAutoStartPomo(setting.autoStartPomodoro);
			setLongBreakInterval(setting.longBreakInterval);
			setAlarmVolume(setting.alarmVolume);
			setAlarmRepeat(setting.alarmRepeat);
			setTickingVolume(setting.tickingVolume);
			setDarkMode(setting.darkMode);
			setNotificationMode(setting.notificationMode);
			setNotificationMinutes(setting.notificationMinutes);
		}
	},[setting]);

	const toggleStartBreaks = (event) => {
		setAutoStartBreaks(event.target.checked);
	}

	const toggleStartPomo = (event) => {
		setAutoStartPomo(event.target.checked);
	}

	const PopupToggle = ({title, state, onToggle}) => {
		return (
			<div className="popup-one-line-control">
				<p className="popup-item-title">{title}</p>
				<Switch
					checked={state}
					onChange={onToggle}
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
	
			</div>
		)
	}

	return (
		<Popup ref={popup} trigger={triggerButton} position="bottom right">
			<div className="popup-container">
				<div className="popup-header">
					<p className="popup-title">{t("timer_setting")}</p>
					<div onClick={() => popup.current.close()}>
						<CheckCircleIcon className="popup-exit" />
					</div>
				</div>
				<hr></hr>
				<div className="popup-time-amount-setup">
					<p className="popup-item-title">{`${t("time")} (${t("minutes")})`}</p>
					<div className="popup-time-amount-box">
						<div className="popup-time-box">
							<p className="popup-time-input-label">{t("pomodoros")}</p>
							<input type="number" value={pomoMinutes} placeholder={0} min={0}
							onChange={(e) => setPomoMinutes(parseInt(e.target.value))} className="popup-number-input"></input>
						</div>
						<div className="popup-time-box">
							<p className="popup-time-input-label">{t("short_break")}</p>
							<input type="number" value={shortMinutes} placeholder={0} min={0}
							onChange={(e) => setShortMinutes(parseInt(e.target.value))} className="popup-number-input"></input>
						</div>
						<div className="popup-time-box">
							<p className="popup-time-input-label">{t("long_break")}</p>
							<input type="number" value={longMinutes} placeholder={0} min={0}
							onChange={(e) => setLongMinutes(parseInt(e.target.value))} className="popup-number-input"></input>
						</div>
					</div>
				</div>
				<hr></hr>
				<PopupToggle 
					title={t('auto_start_breaks') + " ?"} 
					state={autoStartBreaks} 
					onToggle={(event) => toggleStartBreaks(event)}
				/>
				<hr></hr>
				<PopupToggle 
					title={t(('auto_start_pomodoros')) + " ?"}
					state={autoStartPomo} 
					onToggle={(event) => toggleStartPomo(event)}
				/>
				<hr></hr>
				<div className="popup-one-line-control">
					<p className="popup-item-title">{t("long_break_interval")}</p>
					<input type="number" className="popup-number-input" placeholder={0} value={longBreakInterval}
						min={0} onChange={(e) => setLongBreakInterval(parseInt(e.target.value))}	
					></input>
				</div>
				<hr></hr>
				<div className="popup-multi-line-control">
					<p className="popup-item-title">{t("alarm_sound")}</p>
					<div className="popup-multi-options">
						<select name="alamsOptions" className="popup-select">
							{alarmSounds.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
						</select>
						<div style={{display: 'flex', gap: "10px", alignItems: "center"}}>
							<p className="popup-time-input-label">{alarmVolume}</p>
							<input type="range" min="1" max="100" value={alarmVolume} 
								onChange={(e) => setAlarmVolume(parseInt(e.target.value))}/>
						</div>
						<div className="popup-alarm-repeat">
							<p>{t('repeat')}</p>
							<input type="number" className="popup-number-input popup-repeat-input" min={0}
								placeholder={0} value={alarmRepeat} onChange={(e) => setAlarmRepeat(parseInt(e.target.value))}></input>
						</div>
					</div>
				</div>
				<hr></hr>
				<div className="popup-multi-line-control">
					<p className="popup-item-title">{t("ticking_sound")}</p>
					<div className="popup-multi-options">
						<select name="tickingOptions" className="popup-select">
							{tickingSounds.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
						</select>
						<div style={{display: 'flex', gap: "10px", alignItems: "center"}}>
							<p className="popup-time-input-label">{tickingVolume}</p>
							<input type="range" min="1" max="100" value={tickingVolume} onChange={(e) => setTickingVolume(parseInt(e.target.value))}/>
						</div>
					</div>
				</div>
				<hr></hr>
				<PopupToggle title={t('dark_mode_when_running')} state={darkMode} 
					onToggle={(event) => setDarkMode(event.target.checked)}/>
				<hr></hr>
				<div className="popup-one-line-control">
					<p className="popup-item-title">{t("notification")}</p>
					<div className="popup-notification-setup">
						<select name="notiOptions" className="popup-select" 
							onChange={(e) => setNotificationMode(e.target.value)} defaultValue={notificationMode}>
							{notifyTypes.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
						</select>
						<input type="number" className="popup-number-input popup-repeat-input" placeholder={0}
							min={0}	value={notificationMinutes} onChange={(e) => setNotificationMinutes(parseInt(e.target.value))}
						></input>
						<p>{t('min')}</p>
					</div>
				</div>
				<hr></hr>
				<div className="popup-button-area">
					<button type="submit">{t("ok")}</button>
				</div>
			</div>
		</Popup>
		
	)
}