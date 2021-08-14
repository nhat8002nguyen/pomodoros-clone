import React, {useState, useContext} from 'react';
import { useTranslation } from 'react-i18next';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { POMODORO_COLOR } from '../../../constants/windowColors';
import {ThemeContext} from "../../../contexts/ThemeContext";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { taskList } from '../../../data/task';


export default function TaskView() {

	const { t } = useTranslation();
	const { theme } = useContext(ThemeContext);

	const TView = () => {
		return (
			<div className="task-area">
				<div className="current-task-title">
					<p style={{fontSize: "16px", opacity: "0.5"}}>WORKING ON</p>
					<p>Learn by project-based</p>
				</div>
				<div className="task-dashboard">
					<div className="task-header">
						<div className="task-header-row">
							<p>Task</p>
							<MoreVertIcon style={{cursor: "pointer"}}/>
						</div>
						<hr style={{color: "white" }}></hr>
					</div>
					<EditableTaskList />
					<ToggleableTaskForm />
				</div>
				<TaskListStatus />
			</div>
		)
	}

	const EditableTaskList = () => {
		const [focusingTask, setFocusingTask] = useState(null);


		return (
			<div className="editable-task-list">
				{taskList.map(item => <EditableTask 
					key={item.id} {...item}
					onFocus={(id) => setFocusingTask(id)}
					focusId={focusingTask}
				/>)}
			</div>
		)
	}

	const EditableTask = (props) => {
		const [isOpen, setOpen] = useState(false);
		return (
			<div className="editable-task">
				{isOpen ? <TaskForm {...props} onClose={() => setOpen(false)}/> 
				: <TaskItem {...props} onOpenForm={() => setOpen(true)}/>}
			</div>
		)
	}

	const ToggleableTaskForm = () => {
		const [isOpen, setOpen] = useState(false);

		const handleToggle = () => {
			setOpen(!isOpen);
		}
		return (
			<div>
				{isOpen ? <TaskForm onClose={() => {setOpen(false)}}/> 
				:<div className="task-addition" onClick={() => handleToggle()}
					style={{backgroundColor: theme.background}}>
					<div>
						<AddCircleIcon />
						<p>{t("add-task")}</p>
					</div>
				</div>}
			</div>
		)
	}

	const TaskForm = (props) => {
		const [numExt, setNumExt] = useState(props.totalPomo || 1);
		const [title, setTitle] = useState(props.title || "");
		const [noteOpen, setNoteOpen] = useState(props.note ? true : false);
		const [note, setNote] = useState(props.note || "");

		const handleSubmit = (e) => {
			e.preventDefault();
		}

		const handleCloseForm = () => {
			props.onClose();	
		}

		const handleIncEst = () => {
			numExt < 100 && setNumExt(prev => prev+1);
		}

		const handleDecEst = () => {
			numExt > 0 && setNumExt(prev => prev-1);
		}

		return (
			<form onSubmit={(e) => handleSubmit(e)} className="task-form">
				<div className="task-form-body">
					<input id="task-form-input-1" type="text" placeholder="What are you working on ?"
						value={title} onChange={(e) => setTitle(e.target.value)}></input>
					<p id="task-form-label-1">Est pomodoros</p>
					<div className="task-form-row">
						<input type="number" min={0} value={numExt} onChange={(e) => setNumExt(e.target.value)}></input>
						<ExpandLessIcon className="task-form-count-icon" onClick={() => handleIncEst()}/>			
						<ExpandMoreIcon className="task-form-count-icon" onClick={() => handleDecEst()}/>
					</div>
					<div className="task-form-addition" 
						style={noteOpen ? {flexDirection: "column", alignItems: "flex-start"} : null}>
						{noteOpen ? <textarea placeholder="add note" className="task-form-add-note" value={note} 
								onChange={(e) => setNote(e.target.value)}></textarea> 
							: <p onClick={() => setNoteOpen(true)}>+Add Note</p>}
						<p>+Add Project</p>
					</div>
				</div>
				<div className="task-form-buttons">
					<div className="task-form-button1-area">
						<input className="task-form-button-1" type="button" value={t("delete")}></input>
					</div>
					<input className="task-form-button-2" type="button" value={t("cancel")}
						onClick={() => handleCloseForm()}	
					></input>
					<input className="task-form-button-3" type="submit" value={t("save")}></input>
				</div>
			</form>
		)
	}

	const TaskItem = (props) => {
		const [isDone, setDone] = useState(props.done || false);
		const [mouseOver, setMouseOver] = useState(false);
		const toggleItem = () => {
			setDone(!isDone);
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
						<MoreVertIcon className="task-item-option" onClick={() => props.onOpenForm()}/>
					</div>
					{props.note && <div className="task-item-note">
						<p>{props.note}</p>
					</div>}
				</div>
			</div>
		)
	}

	const TaskListStatus = () => {
		return (
			<div className="task-list-status" style={{backgroundColor: theme.foreground}}>
				<p>{`Est: 16   Act: 7   Finish at 21:30`}</p>
			</div>
		)
	}
	
	return <TView></TView>;
}