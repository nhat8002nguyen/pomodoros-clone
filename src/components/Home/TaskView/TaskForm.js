import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const TaskForm = (props) => {
	const { t } = useTranslation();
	const [totalPomo, setTotalPomo] = useState(props.totalPomo || 1);
	const [title, setTitle] = useState(props.title || "");
	const [noteOpen, setNoteOpen] = useState(props.note ? true : false);
	const [note, setNote] = useState(props.note || "");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title === "" || totalPomo < 1) {
			props.onOpenForm(null);
			return false;
		}
		if (props.id) {
			props.onUpdateTask(props.id, {title, totalPomo, note, done: props.done, donePomo: props.donePomo});
		} else {
			props.onAddTask({title, totalPomo, note});
		}
		props.onOpenForm(null);
	}

	const handleCloseForm = () => {
		props.onOpenForm(null);	
	}

	const handleIncEst = () => {
		totalPomo < 100 && setTotalPomo(prev => prev+1);
	}

	const handleDecEst = () => {
		totalPomo > 0 && setTotalPomo(prev => prev-1);
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)} className="task-form">
			<div className="task-form-body">
				<input id="task-form-input-1" type="text" placeholder="What are you working on ?"
					value={title} onChange={(e) => setTitle(e.target.value)}></input>
				<p id="task-form-label-1">Est pomodoros</p>
				<div className="task-form-row">
					<input type="number" min={0} value={totalPomo} onChange={(e) => setTotalPomo(e.target.value)}></input>
					<ExpandLessIcon className="task-form-count-icon" onClick={() => handleIncEst()}/>			
					<ExpandMoreIcon className="task-form-count-icon" onClick={() => handleDecEst()}/>
				</div>
				<div className="task-form-addition" 
					style={noteOpen ? {flexDirection: "column", alignItems: "flex-start"} : null}>
					{noteOpen ? <textarea placeholder="add note" className="task-form-add-note" value={note} maxLength={1000} 
							onChange={(e) => setNote(e.target.value)}></textarea> 
						: <p onClick={() => setNoteOpen(true)}>+Add Note</p>}
					<p>+Add Project</p>
				</div>
			</div>
			<div className="task-form-buttons">
				<div className="task-form-button1-area">
					{props.id && <input className="task-form-button-1" type="button" value={t("delete")}
						onClick={() => props.onDeleteTask(props.id)}></input>}
				</div>
				<input className="task-form-button-2" type="button" value={t("cancel")}
					onClick={() => handleCloseForm()}	
				></input>
				<input className="task-form-button-3" type="submit" value={t("save")}></input>
			</div>
		</form>
	)
}