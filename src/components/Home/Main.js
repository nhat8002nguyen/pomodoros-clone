import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { useTranslation } from "react-i18next";
import useSound from 'use-sound';
import ClickSound from '../../assets/sounds/Mouse-Click.mp3';
import { pushNotification } from "../../helpers/pushNotification";
import { WORK_NOTIFY, SHORT_BREAK_NOTIFY, LONG_BREAK_NOTIFY } from '../../constants/notificationConstants';
import { BirdSound, CatSound, ChickenSound, DogSound, WoodSound} from '../../assets/sounds';
import { WOOD, CAT, BIRD, DOG, CHICKEN } from '../../constants/alarmSounds';

export default function Main() {
	const { t } = useTranslation();
	const [pomodoro, setPomodoro] = useState(3);
	const [shortBreak, setShortBreak] = useState(3);
	const [longBreak, setLongBreak] = useState(3);
	const [longBreakInterval, setLongBreakInterval] = useState(2);
  const [timeType, setTimeType] = useState("Pomodoros");
  const [runState, setRunState] = useState(false);
  const [time, setTime] = useState(5);
  const [numPomo, setNumPomo] = useState(1);
  const [midAreaColor, setMidAreaColor] = useState("#f06e65");
	const [notificationMinutes, setNotificationMinutes] = useState(5);
	const [alarmSound, setAlarmSound] = useState(WOOD);
	const [autoStartBreaks, setAutoStartBreaks] = useState(true);
	const [autoStartPomo, setAutoStartPomo] = useState(true);

	const { setting } = useSelector(state => state.settingState);

	const [play] = useSound(ClickSound);
	const [playWoodSound] = useSound(WoodSound);
	const [playBirdSound] = useSound(BirdSound);
	const [playChickenSound] = useSound(ChickenSound);
	const [playCatSound] = useSound(CatSound);
	const [playDogSound] = useSound(DogSound);

	const playSounds = {
		[WOOD]: playWoodSound,
		[BIRD]: playBirdSound,
		[CHICKEN]: playChickenSound,
		[CAT]: playCatSound, 
		[DOG]: playDogSound,
	}

  const timeRun = useRef();

	// get time data from setting api
	useEffect(() => {
		if (setting && Object.keys(setting).length > 0) {
			setPomodoro(setting.pomodoro*60);
			setShortBreak(setting.shortBreak*60);
			setLongBreak(setting.longBreak*60);
			setLongBreakInterval(setting.longBreakInterval);
			setNotificationMinutes(setting.notificationMinutes);
			setAlarmSound(setting.alarmSound);
			setAutoStartBreaks(setting.autoStartBreak);
			setAutoStartPomo(setting.autoStartPomodoro);
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
    } else {
      clearInterval(timeRun.current);
    }
  }, [runState]);

	let triggerTime = () => {
		clearInterval(timeRun.current);
  	timeRun.current = setInterval(() => {
        setTime((prev) => prev - 1);
    }, 1000);
		pushNotification(timeType);
		playSounds[alarmSound ? alarmSound : WOOD]();
	}

  useEffect(() => {
    // when time = -1 for a bit delay before move to next time type
    if (time === -1) {
      clearInterval(timeRun.current);
      changeNextTimeType();
    } else if (time == 60 * notificationMinutes) {
			// push noti when remain time
			if (timeType == "Pomodoros" && numPomo < longBreakInterval) {
				pushNotification(SHORT_BREAK_NOTIFY, notificationMinutes)
    	} else if (timeType === "Pomodoros" && numPomo === longBreakInterval) {
				pushNotification(LONG_BREAK_NOTIFY, notificationMinutes);
			} else {
				pushNotification(WORK_NOTIFY, notificationMinutes);
			}
		}
  }, [time, longBreakInterval]);

	const changeNextTimeType = () => {
    let newType;
    if (timeType === "Pomodoros" && numPomo < longBreakInterval) {
      newType = "Short Break";
      setNumPomo((prev) => prev + 1);
      setMidAreaColor("#54bf66");
			setRunState(autoStartBreaks ? true : false);
    } else if (timeType === "Pomodoros" && numPomo === longBreakInterval) {
      newType = "Long Break";
      setNumPomo(1);
      setMidAreaColor("#5a84d1");
			setRunState(autoStartBreaks ? true : false);
    } else {
      newType = "Pomodoros";
      setMidAreaColor("#f06e65");
			setRunState(autoStartPomo ? true : false);
    }
    setTimeType(newType);
  };

  useEffect(() => {
    resetTimeEachType();
    if (runState === true) triggerTime();
    chageBodyBackgroundColor();
  }, [timeType, pomodoro, shortBreak, longBreak]);

  const resetTimeEachType = () => {
    if (timeType === "Short Break") setTime(shortBreak);
    else if (timeType === "Pomodoros") setTime(pomodoro);
    else setTime(longBreak);
  };

  const chageBodyBackgroundColor = () => {
    document.body.style.backgroundColor =
      (timeType === "Short Break" && "#16a82e") ||
      (timeType === "Pomodoros" && "#f25b50") ||
      (timeType === "Long Break" && "#1e5dd4");
  };

  const onMoveTo = (type) => {
		timeType === type && resetTimeEachType();
    setTimeType(type);
		changeMidAreaColor(type);
    onStopTime();
  };

	const changeMidAreaColor = (type) => {
		const areaColors = {
			"Pomodoros": "#f06e65",
			"Short Break": "#54bf66",
			"Long Break": "#5a84d1",
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
      <div className="time-type-area" style={{ backgroundColor: midAreaColor }}>
        <div className="time-type-group">
          <div
            className="time-type-box"
            style={
              timeType !== "Pomodoros" ? { backgroundColor: "#f06e65" } : null
            }
            onClick={() => onMoveTo("Pomodoros")}
          >
            <p>Pomodoros</p>
          </div>
          <div
            className="time-type-box"
            style={
              timeType !== "Short Break" ? { backgroundColor: "#f06e65" } : null
            }
            onClick={() => onMoveTo("Short Break")}
          >
            <p>{t('short_break')}</p>
          </div>
          <div
            className="time-type-box"
            style={
              timeType !== "Long Break" ? { backgroundColor: "#f06e65" } : null
            }
            onClick={() => onMoveTo("Long Break")}
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
      </div>
    </div>
  );
}
