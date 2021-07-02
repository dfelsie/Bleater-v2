import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import appSliceReducer from "./features/app/appslice";

export default configureStore({
	reducer: {
		counter: counterReducer,
		app: appSliceReducer,
	},
});
