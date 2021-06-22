const initialState = {
	articles: null,
};

function rootReducer(state = initialState, action) {
	if (action.type === "setAuth") {
		return Object.assign({}, state, {
			auth: action.payload,
		});
	}
	return state;
}

export default rootReducer;
