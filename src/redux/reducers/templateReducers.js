import { TEMPLATE_LIST_REQUEST, TEMPLATE_ADD_REQUEST, TEMPLATE_ADD_SUCCESS, 
	TEMPLATE_ADD_FAIL, TEMPLATE_LIST_SUCCESS, TEMPLATE_LIST_FAIL,
	TEMPLATE_DELETE_REQUEST, TEMPLATE_DELETE_SUCCESS, TEMPLATE_DELETE_FAIL} from "../constants/templateConstants";


export const templateListReducer = (state = [], action) => {
	switch (action.type) {
		case TEMPLATE_LIST_REQUEST:
			return { loading: true };
		case TEMPLATE_LIST_SUCCESS:
			return { loading: false, success: true, templates: action.payload};
		case TEMPLATE_LIST_FAIL:
			return { loading: false, error: action.payload};
		default:
			return state;
	}
}

export const addTemplateReducer = (state = {}, action) => {
	switch (action.type) {
		case TEMPLATE_ADD_REQUEST:
			return { loading: true };
		case TEMPLATE_ADD_SUCCESS:
			return { loading: false, success: true };
		case TEMPLATE_ADD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

export const deleteTemplateReducer = (state = {}, action) => {
	switch (action.type) {
		case TEMPLATE_DELETE_REQUEST:
			return { loading: true };
		case TEMPLATE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case TEMPLATE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}
