import { SAVE_DONE_POMO, INC_DONE_POMO, TASK_LIST_REQUEST, TASK_ADD_REQUEST, TASK_ADD_SUCCESS, 
	TASK_ADD_FAIL, TASK_LIST_SUCCESS, TASK_LIST_FAIL,
	TASK_DELETE_REQUEST,
	TASK_DELETE_SUCCESS,
	TASK_DELETE_FAIL} from "../constants/taskConstants";


export const taskReducer = (state = 0, action) => {
	switch (action.type) {
		case INC_DONE_POMO:
			return state+1;
		case SAVE_DONE_POMO:
			return action.payload;
		default:
			return state;
	}
}

export const taskListReducer = (state = [], action) => {
	switch (action.type) {
		case TASK_LIST_REQUEST:
			return { loading: true };
		case TASK_LIST_SUCCESS:
			return { loading: false, success: true, tasks: action.payload};
		case TASK_LIST_FAIL:
			return { loading: false, error: action.payload};
		default:
			return state;
	}
}

export const addTaskReducer = (state = {}, action) => {
	switch (action.type) {
		case TASK_ADD_REQUEST:
			return { loading: true };
		case TASK_ADD_SUCCESS:
			return { loading: false, success: true };
		case TASK_ADD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

export const deleteTaskReducer = (state = {}, action) => {
	switch (action.type) {
		case TASK_DELETE_REQUEST:
			return { loading: true };
		case TASK_DELETE_SUCCESS:
			return { loading: false, success: true };
		case TASK_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}