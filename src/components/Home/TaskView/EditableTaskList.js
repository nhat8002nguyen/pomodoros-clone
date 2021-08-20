import React from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { EditableTask } from './EditableTask';


export const EditableTaskList = (props) => {
	return (
		<DragDropContext onDragEnd={(result) => props.onDragEnd(result)}>
			<Droppable droppableId="editableTaskList">
				{(provided) => (
					<div className="editable-task-list" {...provided.droppableProps} ref={provided.innerRef}>
						{props.list.map((item, index) => 
						<Draggable key={`${item.id}`} draggableId={`${item.id}`} index={index}>
							{(provided) => (
								<EditableTask ref={provided.innerRef} provided={provided} 
								{...item} {...props}/>
							)}
						</Draggable>
					)}
					{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}