import { SAVE_DONE_POMO, INC_DONE_POMO, TASK_LIST_FAIL, TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_DELETE_REQUEST, 
	TASK_DELETE_FAIL, TASK_ADD_REQUEST, TASK_ADD_FAIL, TASK_ADD_SUCCESS, TASK_DELETE_SUCCESS, TASK_UPDATE_SUCCESS,
	TASK_UPDATE_REQUEST, TASK_UPDATE_FAIL} from "../constants/taskConstants"
import { MyAxios } from "../../utils/Axios";

export const saveDonePomo = (donePomo) => {
	return {type: SAVE_DONE_POMO, payload: donePomo};
}

export const incDonePomo = () => {
	return {type: INC_DONE_POMO};
}

export const listTask = ({username}) => async(dispatch, getState) => {
	dispatch({type: TASK_LIST_REQUEST})	
	try {
		// get token from state
		const { userSignin: { userSignin: { token }} } = getState();
		// get user id from username
		const axios = MyAxios(token);
		const { data: data1 } = await axios.get("/api/user", {  params: { name: username } });
		const userId = data1.id;

		const { data: { _embedded: { tasks } } } = await axios.get(`/api/users/${userId}/tasks`);
		dispatch({type: TASK_LIST_SUCCESS, payload: tasks});
	} catch (error) {
		dispatch({type: TASK_LIST_FAIL, payload: error.message})
	}
}

export const addTask = (username, task) => async (dispatch, getState) => {
	dispatch({type: TASK_ADD_REQUEST});
	try {
		const { userSignin: { userSignin: { token }} } = getState();
		const axios = MyAxios(token);
		await axios.post(`/api/user/tasks`, task, { params: { name: username }});
		dispatch({type: TASK_ADD_SUCCESS});
	} catch (error) {
		dispatch({type: TASK_ADD_FAIL, payload: error.message});
	}
}

export const deleteTask = (id) => async (dispatch, getState) => {
	dispatch({type: TASK_DELETE_REQUEST})
	try {
		const { userSignin: { userSignin: { token }} } = getState();
		const axios = MyAxios(token);
		await axios.delete(`/api/tasks/${id}`);
		dispatch({type: TASK_DELETE_SUCCESS});
	} catch (error) {
		dispatch({type: TASK_DELETE_FAIL, payload: error.message});
	}
}

export const updateTask = (id, contents) => async (dispatch, getState) => {
	dispatch({type: TASK_UPDATE_REQUEST})
	try {
		const { userSignin: { userSignin: { token }} } = getState();
		const axios = MyAxios(token);
		await axios.put(`/api/tasks/${id}`, contents);
	dispatch({type: TASK_UPDATE_SUCCESS})
	} catch (error) {
		dispatch({type: TASK_UPDATE_FAIL, payload: error.message});
	}
}
