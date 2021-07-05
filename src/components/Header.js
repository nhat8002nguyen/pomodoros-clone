import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Header = () => {
	const [setttingsVisible, setSettingsVisible] = React.useState(false);
	

  return (
    <div className="header">
      <text className="title">pomodoros</text>
      <div className="header-btn-group">
        <div className="header-btn" onClick={() => setSettingsVisible(true)}>
          <text>settings</text>
        </div>
        <div className="header-btn">
          <text>profile</text>
        </div>
      </div>
			<Popup trigger={<button> Trigger</button>} position="right center">
    		<div>Popup content here !!</div>
  		</Popup>
    </div>
  );
};

export default Header;
