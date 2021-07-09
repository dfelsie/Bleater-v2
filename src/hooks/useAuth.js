import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	setUser,
	setLogInTime,
	setLoggedIn,
} from "../features/app/appslice";
import axios from "axios";

const LOGOUTTIME = 15 * 1000 * 60;

function checkTimeLeft(logInTime, currentTime, timeLimit) {
	if (currentTime - logInTime >= timeLimit) {
		return false;
	}
	return true;
}

function localStorageCheck() {
	if (
		window.localStorage.getItem("loggedIn") !== null &&
		window.localStorage.getItem("logInTime") !== null &&
		window.localStorage.getItem("user") !== null
	) {
		console.log(
			new Date().getTime() - window.localStorage.getItem("logInTime"),
			LOGOUTTIME,
			"Rimo"
		);
		if (
			checkTimeLeft(
				window.localStorage.getItem("logInTime"),
				new Date().getTime(),
				LOGOUTTIME
			)
		) {
			return true;
		}
	}
	return false;
}

export default function useAuth(authHook, loadHook) {
	const dispatch = useDispatch();

	const appState = useSelector((state) => {
		return state.app;
	});
	useEffect(async () => {
		window.setInterval(async () => {
			console.log("Timeo");
			if (
				appState.loggedIn === true &&
				appState.user !== null &&
				appState.logInTime !== null
			) {
				if (
					checkTimeLeft(
						appState.logInTime,
						new Date().getTime(),
						LOGOUTTIME
					)
				) {
					authHook(true);
					loadHook(false);
					return;
				}
			} else if (localStorageCheck()) {
				dispatch(setUser(appState.user));
				dispatch(setLoggedIn(appState.logInTime));
				dispatch(setLogInTime(appState.loggedIn));
				authHook(true);
				loadHook(false);
				return;
			} else {
				await axios
					.get("http://localhost:3307/refresh", {
						withCredentials: true,
					})
					.then((aut) => {
						console.log(aut, "bauty");
						if (aut.data?.user) {
							window.localStorage.setItem("loggedIn", "true");
							window.localStorage.setItem(
								"logInTime",
								aut.data.user.iat * 1000
							);
							window.localStorage.setItem(
								"userName",
								aut.data.user.email
							);
							dispatch(setUser(appState.user));
							dispatch(setLoggedIn(appState.logInTime));
							dispatch(setLogInTime(appState.loggedIn));
							authHook(true);
							loadHook(false);
							return true;
						}
						authHook(false);
						loadHook(false);
						return false;
					})
					.catch((e) => console.log(e.message, "Btbub"));
			}
		}, 15 * 1000 * 60);
	}, []);
}

/*
export default function useAuth(authHook) {
	const dispatch = useDispatch();

		let user = null;
		const appState = useSelector((state) => {
			return state.app;
		});
		if (
			appState.loggedIn === true &&
			appState.user !== null &&
			appState.logInTime !== null
		) {
			if (
				checkTimeLeft(
					appState.logInTime,
					new Date.getTime(),
					fifteenMinutes
				)
			) {
				authHook(true);
			}
		} else if (
			window.localStorage.getItem("loggedIn") !== null &&
			window.localStorage.getItem("logInTime") !== null &&
			window.localStorage.getItem("user") !== null
		) {
			console.log(
				new Date().getTime() -
					window.localStorage.getItem("logInTime"),
				fifteenMinutes,
				"TImo"
			);
			if (
				!checkTimeLeft(
					appState.logInTime,
					new Date.getTime(),
					fifteenMinutes
				)
			) {
				window.localStorage.setItem("loggedIn", "false");
				window.localStorage.setItem("logInTime", null);
				window.localStorage.setItem("userName", null);
				authHook(false);
			} else {
				dispatch(setUser(appState.user));
				dispatch(setUser(appState.logInTime));
				dispatch(setUser(appState.loggedIn));

				authHook(true);
			}
		}
		authHook(false);
}
*/
