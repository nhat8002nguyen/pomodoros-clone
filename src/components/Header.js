import React from "react";

const Header = () => {
  return (
    <div className="header">
      <text className="title">pomodoros</text>
      <div className="header-btn-group">
        <div className="header-btn">
          <text>settings</text>
        </div>
        <div className="header-btn">
          <text>profile</text>
        </div>
      </div>
    </div>
  );
};

export default Header;
