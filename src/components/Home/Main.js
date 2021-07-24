import React, { useEffect, useState, useRef } from "react";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { useTranslation } from "react-i18next";

export default function Main() {
	const {t, i18n } = useTranslation();
  const [timeType, setTimeType] = useState("Pomodoros");
  const [runState, setRunState] = useState(false);
  const [time, setTime] = useState(5);
  const [numPomo, setNumPomo] = useState(1);
  const [midAreaColor, setMidAreaColor] = useState("#f06e65");

  const timeRun = useRef();

  const onStartTime = () => {
    setRunState(true);
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
	}

  useEffect(() => {
    // when time = -1 for a bit delay before move to next time type
    if (time === -1) {
      clearInterval(timeRun.current);
      changeNextTimeType();
    }
  }, [time]);

	const changeNextTimeType = () => {
    let newType;
    if (timeType === "Pomodoros" && numPomo < 4) {
      newType = "Short Break";
      setNumPomo((prev) => prev + 1);
      setMidAreaColor("#54bf66");
    } else if (timeType === "Pomodoros" && numPomo === 4) {
      newType = "Long Break";
      setNumPomo(1);
      setMidAreaColor("#5a84d1");
    } else {
      newType = "Pomodoros";
      setMidAreaColor("#f06e65");
    }
    setTimeType(newType);
  };

  useEffect(() => {
    resetTimeEachType();
    if (runState === true) triggerTime();
    chageBodyBackgroundColor();
  }, [timeType]);

  const resetTimeEachType = () => {
    if (timeType === "Short Break") setTime(3);
    else if (timeType === "Pomodoros") setTime(5);
    else setTime(4);
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