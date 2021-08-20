import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popup from 'reactjs-popup';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { CircularProgress } from '@material-ui/core';

import { taskList } from '../../../data/task';
import { v4 } from  'uuid';
import { deleteTask, listTask, saveDonePomo, addTask, updateTask } from '../../../redux/actions/taskAction';
import { EditableTaskList } from './EditableTaskList';
import { ToggleableTaskForm } from './ToggleableTaskForm';
import { TaskListStatus } from './TaskListStatus';
import SaveTemplateDialog from './SaveTemplateDialog';
import AddTemplateDialog from './AddTemplateDialog';


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

	const [list, setList] = useState([]);
	const [focusId, setFocusId] = useState(null);
	const [formOpenId, setFormOpenId] = useState(null);
	const [estCount, setEstCount] = useState(taskList.reduce((acc,cur) => cur.totalPomo + acc, 0) || 0);
	const [actCount, setActCount] = useState(taskList.reduce((acc, cur) => cur.donePomo + acc, 0) || 0);
	const [endTime, setEndTime] = useState("");
	const [isDialogOpen, setDialogOpen] = useState();
	
	const taskState = useSelector(state => state.taskState);
	const { userSignin } = useSelector(state => state.userSignin);
	const { loading, error, tasks } = useSelector(state => state.taskListState);

	const popupRef = useRef();

	// fetch task list when mounted
	useEffect(() => {
		let mounted = true;
		const username = userSignin?.username;
		if (mounted === true && username?.length > 0)
			dispatch(listTask({username}));

		return () => mounted = false;
	}, [])

	useEffect(() => {
		if (tasks?.length > 0) {
			const taskList = tasks.map(item => {
				const url = item._links.self.href;
				const id = url.substring(url.lastIndexOf("/")+1);
				return {...item, id: id};
			})	

			setList(taskList);
		}
	}, [tasks])

	// update TaskListStatus when list change
	useEffect(() => {
		if (list?.length > 0) {
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
		}
	}, [list, pomoMinutes])	

	useEffect(() => {
		if (focusId !== null) {
			setList(prev => prev.map(item => {
				if (item.id === focusId) {
					// save pomo number to db
					dispatch(updateTask(item.id, {...item, donePomo: taskState}));
					return {...item, donePomo: taskState} ;
				} else  
					return item;
			}));
		}
	}, [taskState])

	const handleOnTaskDone = (id) => {
		const task = list.find(item => item.id === id);
		task && dispatch(updateTask(id, {...task, done: !task.done}));
	}

	const handleOnFocus = (id) => {
		setFocusId(id);
		const donePomo = list.find(item => item.id === id).donePomo;
		donePomo && dispatch(saveDonePomo(donePomo));
	}

	const handleTaskDeleted = (id) => {
		setList(prev => prev.filter(item => item.id != id));
		deleteTaskfromDB(id);
	};

	const deleteTaskfromDB = (id) => {
		dispatch(deleteTask(id));
	}

	const handleTaskUpdated = (id, contents) => {
		setList(prev => prev.map(item => item.id === id ? {id, ...item, ...contents} : item));
		updateTaskInDB(id, contents);
	};

	const updateTaskInDB = (id, contents) => {
		dispatch(updateTask(id, contents));
	}

	const handleTaskAdded = (contents) => {
		const genId = v4();
		setList(prev => [...prev].concat({id: genId, ...initialItem, ...contents}));
		addTaskToDB({id: genId, ...contents});
	};

	const addTaskToDB = (task) => {
		// add list to databases
		const username = userSignin?.username;
		if (username?.length > 0)
			dispatch(addTask(username, {
				id: task.id,
				title: task.title,
				note: task.note,
				totalPomo: task.totalPomo,
			}));
	}

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
						<Popup closeOnDocumentClick={!isDialogOpen} ref={popupRef} className="task-header-option-container" trigger={
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
								<SaveTemplateDialog onDialogOpen={() => setDialogOpen(true)} onClose={() => setDialogOpen(false)}/>
								<AddTemplateDialog onDialogOpen={() => setDialogOpen(true)} onClose={() => setDialogOpen(false)}/>	
							</div>
  					</Popup>
					</div>
					<hr style={{color: "white" }}></hr>
				</div>
				{loading ? <CircularProgress style={{color: "white"}} size="large" /> 
				: error ? <p>Something wrong !</p>
				: <EditableTaskList 
						list={list} 
						onTaskDone={handleOnTaskDone}
						onOpenForm={(id) => setFormOpenId(id)}
						formOpenId={formOpenId}
						onFocus={(id) => handleOnFocus(id)} 
						focusId={focusId} 
						onDeleteTask={handleTaskDeleted}
						onUpdateTask={handleTaskUpdated}
						onDragEnd={(result) => handleOnDragEnd(result)}	
				/>}
				<ToggleableTaskForm formOpenId={formOpenId} onOpenForm={(id) => setFormOpenId(id)} onAddTask={handleTaskAdded}/>
			</div>
			<TaskListStatus estCount={estCount} actCount={actCount} endTime={endTime}/>
		</div>
	)
}










	
