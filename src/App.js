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

function App(props) {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [userEmail, setUserEmail] = useState(null);

	useEffect(dummy, []);

	const userName = useSelector((state) => {
		console.log(state, "Stjauny");
		return state.app.user;
	});
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
	async function dummy() {
		const aut = await axios
			.get("http://localhost:3307/authenticate", {
				withCredentials: true,
			})
			.catch((e) => console.log(e.message, "Ntbub"));

		//setIsAuth(aut.data.loggedIn === "true");
		//setIsAuth(false);
		setIsLoading(false);
		let authYes = aut.data.loggedIn === "true";

		console.log(aut.data, authYes, "JNJn");
		setIsAuth(authYes);
		if (authYes) {
			console.log("j jn", aut.data.user.email);
			setUserEmail(aut.data.user.email);
		}
		console.log(userEmail);
	}
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
						{isAuth ? <Home /> : <Redirect to="/login" />}
					</Route>
					<Route path="/login">
						<LogIn setIsAuth={setIsAuth} disp={dumbo} />
					</Route>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/profile">
						{isAuth ? (
							<ProfileComponent props={{ email: userEmail }} />
						) : (
							<Redirect to="/login" />
						)}
					</Route>
					<Route path="/home">
						{isAuth ? (
							<HomeComponent props={{ email: userEmail }} />
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
