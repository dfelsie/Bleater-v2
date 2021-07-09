import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
	name: "app",
	initialState: {
		loggedIn: false,
		logInTime: null,
		user: null,
	},
	reducers: {
		setUser: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.user = action.payload;
		},
		setLoggedIn: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.loggedIn = action.payload;
		},
		setLogInTime: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.logInTime = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, setLogInTime, setLoggedIn } =
	appSlice.actions;

export default appSlice.reducer;
