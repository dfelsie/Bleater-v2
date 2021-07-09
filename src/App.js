//import logo from "./logo.svg";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import goat1 from "./images/bleating_goat.jpg";
import goat2 from "./images/goat2.jpg";
import Button from "@material-ui/core/Button";
import "./App.css";
import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useLocation,
} from "react-router-dom";
import axios from "axios";
import ProfileComponent from "./components/ProfileComponent";
import HomeComponent from "./components/HomeComponent";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./features/app/appslice";
import useAuth from "./hooks/useAuth";

const fifteenMinutes = 60 * 1000 * 15;
/*
function checkAuth() {
	const isLog = useSelector((state) => {
		return state.app.loggedIn;
	});
	if (isLog) {
		if (
			new Date().getTime() - state.app.logInTime.getTime() >
			fifteenMinutes
		) {
			window.localStorage.setItem("loggedIn", "false");
			window.localStorage.setItem("logInTime", null);
			window.localStorage.setItem("userName", null);
			return false;
		}
		return true;
	}
	return false;
}*/

export function localStorageCheck() {
	if (
		window.localStorage.getItem("loggedIn") !== null &&
		window.localStorage.getItem("logInTime") !== null
	) {
		console.log(
			new Date().getTime() - window.localStorage.getItem("logInTime"),
			fifteenMinutes,
			"TImo"
		);
		if (
			new Date().getTime() -
				window.localStorage.getItem("logInTime") >
			fifteenMinutes
		) {
			window.localStorage.setItem("loggedIn", "false");
			window.localStorage.setItem("logInTime", null);
			window.localStorage.setItem("userName", null);
			return false;
		}

		return true;
	}
	return false;
}

export async function initAuth() {
	if (localStorageCheck()) {
		console.log("Checked!");
		return true;
	} else {
		return new Promise((resolve) => {
			axios
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
						return resolve(true);
					}
					return resolve(false);
				})
				.catch((e) => console.log(e.message, "Ntbub"));
		});
	}
}

function App(props) {
	const appState = useSelector((state) => {
		return state.app;
	});
	console.log(appState);

	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [userEmail, setUserEmail] = useState(null);
	useAuth(setIsAuth, setIsLoading);

	/*const userName = useSelector((state) => {
		console.log(state, "Stjauny");
		if (
			state.app.loginTime === null ||
			window.localStorage["loginTime"] === null
		) {
			window.localStorage["userName"] = null;
		} else {
			const timeNow = new Date();
			if (
				timeNow.getTime() -
					window.localStorage["loginTime"].getTime() >
				fifteenMinutes
			) {
				window.localStorage["loginTime"] = null;
				window.localStorage["userName"] = null;
			} else {
				console.log("ReTime");
				state.app.loginTime = window.localStorage["loginTime"];
				state.app.userName = window.localStorage["userName"];
			}
		}
		return state.app.user;
	});*/
	//useEffect(dummy, []);

	const dispatch = useDispatch();

	/*dummy().then((res) => {
		console.log(res, "rienin");
		return res;
	});*/
	//console.log(dummy(), "INI");
	console.log(props, "Proper");
	function dumbo(user) {
		dispatch(setUser(user));
	}
	/*
	async function dummy() {
		const aut = await axios
			.get("http://localhost:3307/authenticate", {
				withCredentials: true,
			})
			.catch((e) => console.log(e.message, "Ntbub"));

		const aut2 = await axios
			.get("http://localhost:3307/authTime", {
				withCredentials: true,
			})
			.catch((e) => console.log(e.message, "Bubman"));
		console.log(aut2, "Mauth");

		//setIsAuth(aut.data.loggedIn === "true");
		//setIsAuth(false);
		setIsLoading(false);
		let authYes = aut.data.loggedIn === "true";
		console.log(aut.data, authYes, "JNJn");
		//setIsAuth(authYes);
		if (authYes) {
			console.log("j jn", aut.data.user.email);
			//		setUserEmail(aut.data.user.email);
			window.localStorage["loginTime"] = new Date();
			window.localStorage["userName"] = aut.data.user.email;
		}
		//	console.log(userEmail);
	}*/
	if (isLoading) {
		return null;
	}
	return (
		<Router>
			<div>
				<Link to="/signup">
					<Button variant="outlined">Sign up</Button>
				</Link>
				<Link to="/login">
					<Button variant="outlined">Log in</Button>
				</Link>
				<Link to="/">
					<Button variant="outlined">Index</Button>
				</Link>
				<Link to="/profile">
					<Button variant="outlined">Profile</Button>
				</Link>
				<Link to="/home">
					<Button variant="outlined">Home</Button>
				</Link>
				<h3>{isAuth ? "Yep" : "Nope"}</h3>
				{/*
				<ul>
					<li>
						<Link to="/">
							<p>Home</p>
						</Link>
					</li>
					<li>
						<Link to="/signup">Sign Up!</Link>
					</li>
					<li>
						<Link to="/login">Log In!</Link>
					</li>
				</ul>

				<hr />
				*/}

				{/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

				<Switch>
					<Route exact path="/">
						{isAuth ? (
							<Home authHook={useAuth} />
						) : (
							<Redirect to="/login" />
						)}
					</Route>
					<Route path="/login">
						<LogIn
							setIsAuth={setIsAuth}
							authHook={useAuth}
							disp={dumbo}
						/>
					</Route>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/profile">
						{isAuth ? (
							<ProfileComponent
								email={"Generic"}
								authHook={useAuth}
							/>
						) : (
							<Redirect to="/login" />
						)}
					</Route>
					<Route path="/home">
						{isAuth ? (
							<HomeComponent email={"Generic"} authHook={useAuth} />
						) : (
							<Redirect to="/login" />
						)}
					</Route>
					<Route path="/">
						<h1>Doesn't Exist</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Redi() {
	<Router>
		<h1>Log in!</h1>
		<Link to="/login">
			<Button variant="outlined">Log in</Button>
		</Link>
		<Route path="/login">
			<LogIn />
		</Route>
	</Router>;
}

function Home() {
	async function dummy() {
		const aut = await axios
			.get("http://localhost:3307/authenticate", {
				withCredentials: true,
			})
			.catch((e) => console.log(e.message));
		//setIsAuth(aut.data.loggedIn === "true");
		//setIsAuth(false);
		//setIsLoading(false);
		console.log(aut.data, aut.data.loggedIn === "true", "JNJn");
	}
	return (
		<div>
			<img src={goat1} alt="goat"></img>
			<img src={goat2} alt="goat"></img>
			<h1>Welcome to Bleater</h1>
			<h4>Join Bleater Today</h4>
		</div>
	);
}
export default App;
