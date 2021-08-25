import { TEMPLATE_LIST_FAIL, TEMPLATE_LIST_REQUEST, TEMPLATE_LIST_SUCCESS, TEMPLATE_DELETE_REQUEST, 
	TEMPLATE_DELETE_FAIL, TEMPLATE_ADD_REQUEST, TEMPLATE_ADD_FAIL, TEMPLATE_ADD_SUCCESS, TEMPLATE_DELETE_SUCCESS, 
	TEMPLATE_UPDATE_SUCCESS, TEMPLATE_UPDATE_REQUEST, TEMPLATE_UPDATE_FAIL, TEMPLATE_APPEND_REQUEST, TEMPLATE_APPEND_SUCCESS, TEMPLATE_APPEND_FAIL} from "../constants/templateConstants";
import { MyAxios } from "../../utils/Axios";

export const listTemplate = ({username}) => async(dispatch, getState) => {
	dispatch({type: TEMPLATE_LIST_REQUEST})	
	try {
		// get token from state
		const { userSignin: { userSignin: { token }} } = getState();
		// get user id from username
		const axios = MyAxios(token);
		const { data: data1 } = await axios.get("/api/user", {  params: { name: username } });
		const userId = data1.id;

		const { data: { _embedded: { templates } } } = await axios.get(`/api/users/${userId}/templates`);
		dispatch({type: TEMPLATE_LIST_SUCCESS, payload: templates});
	} catch (error) {
		dispatch({type: TEMPLATE_LIST_FAIL, payload: error.message})
	}
}

export const addTemplate = (username, template) => async (dispatch, getState) => {
	dispatch({type: TEMPLATE_ADD_REQUEST});
	try {
		const { userSignin: { userSignin: { token }} } = getState();
		const axios = MyAxios(token);
		await axios.post(`/api/add-template`, template, { params: { name: username }});
		dispatch({type: TEMPLATE_ADD_SUCCESS});
	} catch (error) {
		dispatch({type: TEMPLATE_ADD_FAIL, payload: error.message});
	}
}

export const deleteTemplate = (id) => async (dispatch, getState) => {
	dispatch({type: TEMPLATE_DELETE_REQUEST})
	try {
		const { userSignin: { userSignin: { token }} } = getState();
		const axios = MyAxios(token);
		await axios.delete(`/api/templates/${id}`);
		dispatch({type: TEMPLATE_DELETE_SUCCESS});
	} catch (error) {
		dispatch({type: TEMPLATE_DELETE_FAIL, payload: error.message});
	}
}

export const appendTemplate = (id) => async (dispatch, getState) => {
	dispatch({type: TEMPLATE_APPEND_REQUEST})
	try {
		const { userSignin: { userSignin: { token }} } = getState();
		const axios = MyAxios(token);
		await axios.post(`/api/append-template/${id}`);
		dispatch({type: TEMPLATE_APPEND_SUCCESS});
	} catch (error) {
		dispatch({type: TEMPLATE_APPEND_FAIL, payload: error.message});
	}
}
