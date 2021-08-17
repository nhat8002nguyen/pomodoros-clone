import React, { useContext } from 'react';

import {ThemeContext} from "../../../contexts/ThemeContext";

export const TaskListStatus = (props) => {
	const { theme } = useContext(ThemeContext);
	return (
		<div className="task-list-status" style={{backgroundColor: theme.foreground}}>
			<p>{`Est: ${props.estCount} -- Act: ${props.actCount} -- Finish at ${props.endTime}`}</p>
		</div>
	)
}