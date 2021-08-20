import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { POMODORO_COLOR } from '../../../constants/windowColors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const TaskItem = (props) => {
	const [isDone, setDone] = useState(props.done || false);
	const [mouseOver, setMouseOver] = useState(false);
	const toggleItem = () => {
		setDone(!isDone);
		// update DB
		props.onTaskDone(props.id);
	}
	
	const handleFocus = () => {
		props.onFocus(props.id);
	}
	return (
		<div className="task-item-area" onClick={() => handleFocus()} 
			onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
			<div className="task-item-focus" 
				style={props.focusId === props.id ? { backgroundColor: "black" } 
				: mouseOver ? {backgroundColor: "#dedede"} : null}>
			</div>    
			<div className="task-item-container">
				<div className="task-item">
					<CheckCircleIcon className="task-item-icon" fontSize="large" 
						style={isDone ? {color: POMODORO_COLOR, opacity: 1} : null}
						onClick={() => toggleItem()}/>			
					<p className="task-item-title"
						style={isDone ? {textDecoration: "line-through", opacity: "0.3"} : null}
					>{props.title}</p>
					<p className="task-item-count">{`${props.donePomo}/${props.totalPomo}`}</p>
					<MoreVertIcon className="task-item-option" onClick={() => props.onOpenForm(props.id)}/>
				</div>
				{props.note && <div className="task-item-note">
					{<p style={{whiteSpace: "pre-line"}}>{props.note}</p>}
				</div>}
			</div>
		</div>
	)
}