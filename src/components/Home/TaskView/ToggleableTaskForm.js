import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '../../../contexts/ThemeContext';
import { TaskForm } from './TaskForm';

import AddCircleIcon from '@material-ui/icons/AddCircle';

export const ToggleableTaskForm = (props) => {
	const { t } = useTranslation();
	const { theme } = useContext(ThemeContext);
	const handleOpen = () => {
		props.onOpenForm(0);	
	}
	return (
		<div>
			{props.formOpenId === 0 ? <TaskForm {...props} /> 
			:<div className="task-addition" onClick={() => handleOpen()}
				style={{backgroundColor: theme.background}}>
				<div>
					<AddCircleIcon />
					<p>{t("Add task")}</p>
				</div>
			</div>}
		</div>
	)
}