import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popup from 'reactjs-popup';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

import { taskList } from '../../../data/task';
import { v4 } from  'uuid';
import { saveDonePomo } from '../../../redux/actions/taskAction';
import { EditableTaskList } from './EditableTaskList';
import { ToggleableTaskForm } from './ToggleableTaskForm';
import { TaskListStatus } from './TaskListStatus';


export default function TaskView(props) {
	const dispatch = useDispatch();
	const [initialItem, setInitialItem] = useState({
		title: "",
		totalPomo: 0,
		donePomo: 0,
		note: null,
		done: false
	});
	const [pomoMinutes, setPomoMinutes] = useState(25);
	const { setting } = useSelector(state => state.settingState);
	useEffect(() => {
		if (setting && Object.keys(setting).length > 0) {
			setPomoMinutes(setting.pomodoro);
		}
	},[setting])

	const [list, setList] = useState(taskList);
	const [focusId, setFocusId] = useState(null);
	const [formOpenId, setFormOpenId] = useState(null);
	const [estCount, setEstCount] = useState(taskList.reduce((acc,cur) => cur.totalPomo + acc, 0) || 0);
	const [actCount, setActCount] = useState(taskList.reduce((acc, cur) => cur.donePomo + acc, 0) || 0);
	const [endTime, setEndTime] = useState("");
	
	const taskState = useSelector(state => state.taskState);

	const popupRef = useRef();

	// update TaskListStatus when list change
	useEffect(() => {
		const est = list.reduce((acc,cur) => cur.totalPomo + acc, 0);
		const act = list.reduce((acc, cur) => acc + cur.donePomo, 0);
		setEstCount(est);
		setActCount(act);

		if (est - act >= 0 && pomoMinutes > 0) {
			let dt = new Date();
			dt.setMinutes(dt.getMinutes() + (est - act)*pomoMinutes);
			const displayedTime = dt.getHours() + ":" + dt.getMinutes()%60;
			setEndTime(displayedTime);
		}
	}, [list, pomoMinutes])	

	useEffect(() => {
		if (focusId !== null) {
			setList(prev => prev.map(item => item.id === focusId ? {...item, donePomo: taskState} : item));
		}
	}, [taskState])

	const handleOnFocus = (id) => {
		setFocusId(id);
		const donePomo = list.find(item => item.id === id).donePomo;
		donePomo && dispatch(saveDonePomo(donePomo));
	}

	const deleteTask = (id) => {
		setList(prev => prev.filter(item => item.id != id));
	};

	const updateTask = (id, contents) => {
		setList(prev => prev.map(item => item.id === id ? {id, ...item, ...contents} : item));
	};

	const addTask = (contents) => {
		setList(prev => [...prev].concat({id: v4(), ...initialItem, ...contents}));
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const reorderedList = [...list];
		const [reorderedItem] = reorderedList.splice(result.source.index, 1);
		reorderedList.splice(result.destination.index, 0, reorderedItem);
		setList(reorderedList);
	}

	const handleClearAllTasks = () => {
		closePopup();
		clearAllTasks()
	}
	const clearAllTasks = () => setList([]);
	
	const closePopup = () => popupRef.current.close();

	const handleClearFinishTasks = () => {
		closePopup();
		clearFinistTasks();
	}
	const clearFinistTasks = () => setList(list.filter(item => !item.done));

	const handleClearActs = () => {
		closePopup();
		clearActs();
	}
	const clearActs = () => setList(list.map(item => ({...item, donePomo: 0})));

	const handleSaveAsTemplate = () => {
		closePopup();
		openSaveTemplateView();
	}

	const openSaveTemplateView = () => {
	}

	const handleAddFromTemplates = () => {
		closePopup();
		openAddFromTemplatesView()
	}

	const openAddFromTemplatesView = () => {
	}


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
						<Popup ref={popupRef} className="task-header-option-container" trigger={
							<MoreVertIcon 
								style={{cursor: "pointer", backgroundColor: "white", opacity: "0.2", color: "black", borderRadius: "5px"}}>
							</MoreVertIcon>
						} position="bottom right">
							<div className="task-header-options">
								<div onClick={() => handleClearAllTasks()} className="task-header-option">
									<DeleteIcon color="secondary"/>
									<p>Clear all tasks</p>
								</div>
								<div onClick={() => handleClearFinishTasks()} className="task-header-option">
									<DeleteIcon color="secondary"/>
									<p>Clear finist tasks</p>
								</div>
								<div onClick={() => handleClearActs()} className="task-header-option">
									<DoneIcon color="primary"/>
									<p>Clear act pomodoros</p>
								</div>
								<div onClick={() => handleSaveAsTemplate()} className="task-header-option">
									<SaveIcon />
									<p>Save as template</p>
								</div>
								<div onClick={() => handleAddFromTemplates()} className="task-header-option">
									<AddIcon />
									<p>Add from templates</p>
								</div>
							</div>
  					</Popup>
						
					</div>
					<hr style={{color: "white" }}></hr>
				</div>
				<EditableTaskList 
					list={list} 
					onOpenForm={(id) => setFormOpenId(id)}
					formOpenId={formOpenId}
					onFocus={(id) => handleOnFocus(id)} 
					focusId={focusId} 
					onDeleteTask={(id) => deleteTask(id)}
					onUpdateTask={(id, contents) => updateTask(id, contents)}
					onDragEnd={(result) => handleOnDragEnd(result)}	
				/>
				<ToggleableTaskForm formOpenId={formOpenId} onOpenForm={(id) => setFormOpenId(id)} onAddTask={(contents) => addTask(contents)}/>
			</div>
			<TaskListStatus estCount={estCount} actCount={actCount} endTime={endTime}/>
		</div>
	)
}










	
