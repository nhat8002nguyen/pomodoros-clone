import React from 'react';

import { TaskForm } from './TaskForm';
import { TaskItem } from './TaskItem';

export const EditableTask = React.forwardRef((props, ref) => {
	const handleOpenForm = () => {
		props.onOpenForm(props.id);
	}

	const handleCloseForm = () => {
		props.onOpenForm(null);
	}

	return (
		<div ref={ref} className="editable-task" {...props.provided.draggableProps} {...props.provided.dragHandleProps}>
			{props.formOpenId === props.id ? <TaskForm {...props} onClose={() => handleCloseForm()}/> 
			: <TaskItem {...props} onOpenForm={() => handleOpenForm()}/>}
		</div>
	)
});