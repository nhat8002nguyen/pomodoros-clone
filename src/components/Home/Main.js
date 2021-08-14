import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { useTranslation } from "react-i18next";
import useSound from 'use-sound';
import ClickSound from '../../assets/sounds/Mouse-Click.mp3';
import { POMODOROS, SHORT_BREAK, LONG_BREAK } from '../../constants/timeTypes';
import { pushNotification } from "../../helpers/pushNotification";
import { WORK_NOTIFY, SHORT_BREAK_NOTIFY, LONG_BREAK_NOTIFY } from '../../constants/notificationConstants';
import { BirdSound, CatSound, ChickenSound, DogSound, WoodSound, FastTicking, SlowTicking } from '../../assets/sounds';
import { WOOD, CAT, BIRD, DOG, CHICKEN, NONE } from '../../constants/alarmSounds';
import { TICKING_FAST, TICKING_SLOW, NONE as NONE_TICKING } from '../../constants/tickingSpeed';
import { getSetting } from "../../redux/actions/settingActions"; 
import {Flash} from './Flash'
import { POMODORO_COLOR, SHORT_BREAK_COLOR, LONG_BREAK_COLOR, POMODORO_AREA_COLOR, SHORT_BREAK_AREA_COLOR, 
	LONG_BREAK_AREA_COLOR } from '../../constants/windowColors';
import {themes, ThemeContext} from "../../contexts/ThemeContext";

export default function Main({onChangeTheme}) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [pomodoro, setPomodoro] = useState(3);
	const [shortBreak, setShortBreak] = useState(3);
	const [longBreak, setLongBreak] = useState(3);
	const [longBreakInterval, setLongBreakInterval] = useState(2);
  const [timeType, setTimeType] = useState(POMODOROS);
  const [runState, setRunState] = useState(false);
  const [time, setTime] = useState(5);
  const [numPomo, setNumPomo] = useState(1);
  const [midAreaColor, setMidAreaColor] = useState("#f06e65");
	const [notificationMinutes, setNotificationMinutes] = useState(5);
	const [alarmSound, setAlarmSound] = useState(WOOD);
	const [audio, setAudio] = useState(WoodSound);
	const [autoStartBreaks, setAutoStartBreaks] = useState(true);
	const [autoStartPomo, setAutoStartPomo] = useState(true);
	const [alarmVolume, setAlarmVolume] = useState(39);
	const [alarmRepeat, setAlarmRepeat] = useState(1);
	const [alarmTimes, setAlarmTimes] = useState(1);
	const [tickingSpeed, setTickingSpeed] = useState(NONE_TICKING);
	const [tickingVolume, setTickingVolume] = useState(50);
	const [ticking, setTicking] = useState(SlowTicking);
	const [isTickingPlaying, setTickingPlaying] = useState(false);

	const { userSignin } = useSelector(state => state.userSignin);
	const { setting, loading, error } = useSelector(state => state.settingState);

	const [play] = useSound(ClickSound);
	const [playAlarmSound] = useSound(audio, { 
		volume: alarmVolume / 100, 
		interrupt: true 
	});
	
	const [playTicking, { stop: stopTicking }] = useSound(ticking, {
		volume: tickingVolume / 100,
		interrupt: true,
		onend: () => setTickingPlaying(false),
	});

	const audioSounds = {
		[WOOD]: WoodSound,
		[BIRD]: BirdSound,
		[CHICKEN]: ChickenSound,
		[CAT]: CatSound, 
		[DOG]: DogSound,
		[NONE]: "",
		[TICKING_FAST]: FastTicking,
		[TICKING_SLOW]: SlowTicking,
	}

  const timeRun = useRef();
	const alarmRun = useRef();

	useEffect(() => {
		let mounted = true;
		return () => {
			clearInterval(timeRun.current); 
			clearInterval(alarmRun.current);
			mounted = false;
		}
	},[])

	useEffect(() => {
		let isMounted = true;
		const username = userSignin?.username;
		if (isMounted && username?.length > 0)
			dispatch(getSetting({username}));

		return () => isMounted = false;
	}, [userSignin])

	// get time data from setting api
	useEffect(() => {
		if (setting && Object.keys(setting).length > 0) {
			setPomodoro(setting.pomodoro*60);
			setShortBreak(setting.shortBreak*60);
			setLongBreak(setting.longBreak*60);
			setLongBreakInterval(setting.longBreakInterval);
			setNotificationMinutes(setting.notificationMinutes);
			setAlarmSound(setting.alarmSound);
			setAudio(audioSounds[setting.alarmSound]);
			setAutoStartBreaks(setting.autoStartBreak);
			setAutoStartPomo(setting.autoStartPomodoro);
			setAlarmVolume(setting.alarmVolume);
			setAlarmRepeat(setting.alarmRepeat);
			setTickingSpeed(setting.tickingSpeed);
			setTickingVolume(setting.tickingVolume);
			setTicking(audioSounds[setting.tickingSpeed]);
		}
	}, [setting])
	
  const onStartTime = () => {
    setRunState(true);
		play(); // play click sound 
  };

  // start time or stop time
  useEffect(() => {
    if (runState === true) {
      triggerTime();
			// run ticking if it's enable
			if (tickingSpeed !== NONE_TICKING) {
				playTicking();
				setTickingPlaying(true);
			}
    } else {
      clearInterval(timeRun.current);
    }
		return () => {
			stopTicking();
		}
  }, [runState]);

	// continue starting ticking if run state is true
	useEffect(() => {
		if (!isTickingPlaying && runState) {
			playTicking();
			setTickingPlaying(true);
		} else if (isTickingPlaying && !runState) {
			stopTicking();
			setTickingPlaying(false);
		}
	},[isTickingPlaying, runState])

	let triggerTime = () => {
		clearInterval(timeRun.current);
  	timeRun.current = setInterval(() => {
        setTime((prev) => prev - 1);
    }, 1000);
	}

	// repeat alarm sound with repeat times
	useEffect(() => {
		if (alarmTimes >= alarmRepeat) {
			clearInterval(alarmRun.current);
			setAlarmTimes(1);
		}
	}, [alarmTimes])

  useEffect(() => {
    // when time = -1 for a bit delay before move to next time type
    if (time === -1) {
      clearInterval(timeRun.current);
      changeNextTimeType();
    } else if (time === 60 * notificationMinutes) {
			// push noti when remain time
			if (timeType === POMODOROS && numPomo < longBreakInterval) {
				pushNotification(SHORT_BREAK_NOTIFY, notificationMinutes)
    	} else if (timeType === POMODOROS && numPomo === longBreakInterval) {
				pushNotification(LONG_BREAK_NOTIFY, notificationMinutes);
			} else {
				pushNotification(WORK_NOTIFY, notificationMinutes);
			}
		}
  }, [time, longBreakInterval]);

	const changeNextTimeType = () => {
    let newType;
    if (timeType === POMODOROS && numPomo < longBreakInterval) {
      newType = SHORT_BREAK;
      setNumPomo((prev) => prev + 1);
      setMidAreaColor("#54bf66");
			setRunState(autoStartBreaks ? true : false);
    } else if (timeType === POMODOROS && numPomo === longBreakInterval) {
      newType = LONG_BREAK;
      setNumPomo(1);
      setMidAreaColor("#5a84d1");
			setRunState(autoStartBreaks ? true : false);
    } else {
      newType = POMODOROS;
      setMidAreaColor("#f06e65");
			setRunState(autoStartPomo ? true : false);
    }
		pushNotificationAndSound(newType);
		changeHomeTheme(newType);
    setTimeType(newType);
  };

	const pushNotificationAndSound = (curTimeType) => {
		pushNotification(curTimeType);
		// play sound
		if (alarmRepeat >= 1) playAlarmSound();
		if (alarmRepeat > 1) {
			alarmRun.current && clearInterval(alarmRun.current)
			alarmRun.current = setInterval(() => { 
				playAlarmSound(); 
				setAlarmTimes(prev => prev+1);
			}, 2500);
		}
	}

	const changeHomeTheme = (timeType) => {
		const ths = {
			[POMODOROS]: themes.pomodoroTheme,
			[SHORT_BREAK]: themes.shortBreakTheme,
			[LONG_BREAK]: themes.longBreakTheme,
		}
		onChangeTheme(ths[timeType]);
	}

  useEffect(() => {
    resetTimeEachType();
    if (runState === true) triggerTime();
    chageBodyBackgroundColor();
  }, [timeType, pomodoro, shortBreak, longBreak]);

  const resetTimeEachType = () => {
    if (timeType === SHORT_BREAK) setTime(shortBreak);
    else if (timeType === POMODOROS) setTime(pomodoro);
    else setTime(longBreak);
  };

  const chageBodyBackgroundColor = () => {
    document.body.style.backgroundColor =
      (timeType === SHORT_BREAK && SHORT_BREAK_COLOR) ||
      (timeType === POMODOROS && POMODORO_COLOR) ||
      (timeType === LONG_BREAK && LONG_BREAK_COLOR);
  };

  const onMoveTo = (type) => {
		timeType === type && resetTimeEachType();
    setTimeType(type);
		changeMidAreaColor(type);
		changeHomeTheme(type);
    onStopTime();
  };

	const changeMidAreaColor = (type) => {
		const areaColors = {
			[POMODOROS]: POMODORO_AREA_COLOR,
			[SHORT_BREAK]: SHORT_BREAK_AREA_COLOR,
			[LONG_BREAK]: LONG_BREAK_AREA_COLOR,
		}
		setMidAreaColor(areaColors[type]);
	}

	const onStopTime = () => {
    setRunState(false);
		play(); 
  };

  const secondsToMinutes = (seconds) => {
    if (seconds < 0) return "00:00";
    const minutePart =
      Math.floor(seconds / 60) < 10
        ? "0" + Math.floor(seconds / 60)
        : Math.floor(seconds / 60);
    const secondPart = seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60;
    return minutePart + ":" + secondPart;
  };

  return (
    <div className="main-container">
			{loading ? <Flash />
      :<div className="time-type-area" style={{ backgroundColor: midAreaColor }}>
        <div className="time-type-group">
          <div
            className="time-type-box"
            style={
              timeType === SHORT_BREAK ? { backgroundColor: SHORT_BREAK_AREA_COLOR}  
							: timeType === LONG_BREAK ? { backgroundColor: LONG_BREAK_AREA_COLOR}  
							: { backgroundColor: POMODORO_COLOR }
            }
            onClick={() => onMoveTo(POMODOROS)}
          >
            <p>Pomodoros</p>
          </div>
          <div
            className="time-type-box"
            style={
              timeType === POMODOROS ? { backgroundColor: POMODORO_AREA_COLOR }  
							: timeType === LONG_BREAK ? { backgroundColor: LONG_BREAK_AREA_COLOR}  
							: { backgroundColor: SHORT_BREAK_COLOR }
            }
            onClick={() => onMoveTo(SHORT_BREAK)}
          >
            <p>{t('short_break')}</p>
          </div>
          <div
            className="time-type-box"
            style={
              timeType === POMODOROS ? { backgroundColor: POMODORO_AREA_COLOR }  
							: timeType === SHORT_BREAK ? { backgroundColor: SHORT_BREAK_AREA_COLOR}  
							: { backgroundColor: LONG_BREAK_COLOR }
            }
            onClick={() => onMoveTo(LONG_BREAK)}
          >
            <p>{t('long_break')}</p>
          </div>
        </div>
        <div className="time-run">
          <p>{secondsToMinutes(time)}</p>
        </div>
        <div className="affect-time-group">
          {runState ? (
            <div className="toggle-time-btn" onClick={onStopTime}>
              <p>{t('stop')}</p>
            </div>
          ) : (
            <div className="toggle-time-btn" onClick={onStartTime}>
              <p>{t('start')}</p>
            </div>
          )}
          <div className="skip-next-btn" onClick={() => changeNextTimeType()}>
            <SkipNextIcon fontSize="large" />
          </div>
        </div>
      </div>}
    </div>
  );
}
