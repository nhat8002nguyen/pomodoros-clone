import { SAVE_DONE_POMO, INC_DONE_POMO } from "../constants/taskConstants";


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