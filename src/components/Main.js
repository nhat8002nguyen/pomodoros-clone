import React, { useEffect, useState } from "react";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default function Main() {
  const [timeType, setTimeType] = useState("Pomodoros");
  const [runState, setRunState] = useState(false);
  const [time, setTime] = useState(5);
  const [timeRun, setTimeRun] = useState("");
  const [numPomo, setNumPomo] = useState(1);

  const onStartTime = () => {
    setRunState(true);
    triggerTime();
  };

  let triggerTime = () =>
    setTimeRun(
      setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000)
    );

  useEffect(() => {
    console.log(time);
    // when time = -1 for a bit delay before move to next time type
    if (time === -1) {
      clearInterval(timeRun);
      changeTimeType();
    }
  }, [time]);

  useEffect(() => {
    if (timeType === "Short Break") setTime(3);
    else if (timeType === "Pomodoros") setTime(5);
    else setTime(10);
    setNumPomo((prev) => (prev === 4 ? 0 : prev + 1));
    if (runState === true) triggerTime();
    chageBodyBackgroundColor();
  }, [timeType]);

  const chageBodyBackgroundColor = () => {
    document.body.style.backgroundColor =
      (timeType === "Short Break" && "green") ||
      (timeType === "Pomodoros" && "#f25b50") ||
      (timeType === "Long Break" && "blue");
  };

  const changeTimeType = () => {
    setTimeType(numPomo < 4 ? "Short Break" : "Long Break");
    let newType;
    if (timeType === "Pomodoros" && numPomo < 4) newType = "Short Break";
    else if (timeType === "Pomodoros" && numPomo === 4) newType = "Long Break";
    else newType = "Pomodoros";
    setTimeType(newType);
  };

  const onStopTime = () => {
    setRunState(false);
    clearInterval(timeRun);
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
      <div className="time-type-area">
        <div className="time-type-group">
          <div
            className="time-type-box"
            style={
              timeType !== "Pomodoros" ? { backgroundColor: "#f06e65" } : null
            }
          >
            <text>Pomodoros</text>
          </div>
          <div
            className="time-type-box"
            style={
              timeType !== "Short Break" ? { backgroundColor: "#f06e65" } : null
            }
          >
            <text>Short Break</text>
          </div>
          <div
            className="time-type-box"
            style={
              timeType !== "Long Break" ? { backgroundColor: "#f06e65" } : null
            }
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
          <div className="skip-next-btn">
            <SkipNextIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
}
