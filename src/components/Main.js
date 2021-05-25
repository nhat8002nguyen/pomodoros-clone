import React, { useEffect, useState } from "react";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default function Main() {
  const [timeType, setTimeType] = useState("Pomodoros");
  const [runState, setRunState] = useState(false);
  const [time, setTime] = useState(5);
  const [timeRun, setTimeRun] = useState("");
  const [numPomo, setNumPomo] = useState(1);
  const [midAreaColor, setMidAreaColor] = useState("#f06e65");

  const onStartTime = () => {
    setRunState(true);
  };

  let triggerTime = () =>
    setTimeRun(
      setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000)
    );

  // start time or stop time
  useEffect(() => {
    if (runState === true) {
      triggerTime();
    } else {
      clearInterval(timeRun);
    }
  }, [runState]);

  useEffect(() => {
    // when time = -1 for a bit delay before move to next time type
    if (time === -1) {
      clearInterval(timeRun);
      changeNextTimeType();
    }
  }, [time]);

  useEffect(() => {
    setTimeEachType();
    if (runState === true) triggerTime();
    chageBodyBackgroundColor();
  }, [timeType]);

  const setTimeEachType = () => {
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

  const onStopTime = () => {
    setRunState(false);
  };

  const onMoveTo = (type) => {
    setTimeType(type);
    switch (type) {
      case "Pomodoros":
        setMidAreaColor("#f06e65");
        break;
      case "Short Break":
        setMidAreaColor("#54bf66");
        break;
      case "Long Break":
        setMidAreaColor("#5a84d1");
        break;
      default:
        setMidAreaColor("#f06e65");
    }
    onStopTime();
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
            <text>Pomodoros</text>
          </div>
          <div
            className="time-type-box"
            style={
              timeType !== "Short Break" ? { backgroundColor: "#f06e65" } : null
            }
            onClick={() => onMoveTo("Short Break")}
          >
            <text>Short Break</text>
          </div>
          <div
            className="time-type-box"
            style={
              timeType !== "Long Break" ? { backgroundColor: "#f06e65" } : null
            }
            onClick={() => onMoveTo("Long Break")}
          >
            <text>Long Beak</text>
          </div>
        </div>
        <div className="time-run">
          <text>{secondsToMinutes(time)}</text>
        </div>
        <div className="affect-time-group">
          {runState ? (
            <div class="toggle-time-btn" onClick={onStopTime}>
              <text>Stop</text>
            </div>
          ) : (
            <div class="toggle-time-btn" onClick={onStartTime}>
              <text>Start</text>
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
