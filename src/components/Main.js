import React, { useState } from "react";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { ContactSupportOutlined } from "@material-ui/icons";

export default function Main() {
  const [timeType, setTimeType] = useState("Pomodoros");
  const [timeRunning, setTimeRunning] = useState(1500);
  const [pomoTime, setPomoTime] = useState(1500);
  const [shortBreakTime, setShorBreakTime] = useState(300);
  const [longBreakTime, setLongBreakTime] = useState(900);
  const [countPomo, setCountPomo] = useState(1);
  const [runState, setRunState] = useState(false);

  let startTime = runState
    ? setInterval(() => {
        setTimeRunning((prev) => prev - 1);
      })
    : null;

  const onToggleTime = () => {
    setRunState(!runState);
    if (!runState) clearInterval(startTime);
  };

  const secondsToMinutes = (seconds) => {
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
          <div className="time-type-box">
            <text>Pomodoros</text>
          </div>
          <div className="time-type-box">
            <text>Short Break</text>
          </div>
          <div className="time-type-box">
            <text>Long Beak</text>
          </div>
        </div>
        <div className="time-run">
          <text>{secondsToMinutes(timeRunning)}</text>
        </div>
        <div className="affect-time-group">
          <div class="toggle-time-btn" onClick={onToggleTime}>
            <text>{runState ? "Stop" : "Start"}</text>
          </div>
          <div className="skip-next-btn">
            <SkipNextIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
}
