//import logo from "./logo.svg";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Button from "@material-ui/core/Button";
import "./App.css";
import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import axios from "axios";
import ProfileComponent from "./components/ProfileComponent";
import HomeComponent from "./components/HomeComponent";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return { articles: state.articles, ...state };
};

function App(props) {
	/*dummy().then((res) => {
		console.log(res, "rienin");
		return res;
	});*/
	//console.log(dummy(), "INI");
	console.log(props, "Proper");

	return (
		<Router>
			<div>
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
						<Home />
					</Route>
					<Route path="/login">
						<LogIn />
					</Route>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/stuff">
						<ProfileComponent />
					</Route>
					<Route path="/home">
						<HomeComponent />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Home() {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	async function dummy() {
		const aut = await axios
			.get("http://localhost:3307/authenticate", {
				withCredentials: true,
			})
			.catch((e) => console.log(e.message));
		setIsAuth(aut.data.loggedIn === "true");
		//setIsAuth(false);
		setIsLoading(false);
		console.log(aut.data, aut.data.loggedIn === "true", "JNJn");
	}
	console.log();
	useEffect(dummy, []);
	return (
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
			<Link to="/stuff">
				<Button variant="outlined">Profile</Button>
			</Link>
			<Link to="/home">
				<Button variant="outlined">Home</Button>
			</Link>
			<h1>Welcome to Bleater</h1>
			<h4>Join Bleater Today</h4>
			{
				<div>
					<button
						onClick={() => {
							try {
								axios
									.get("http://localhost:3307/secret", {
										withCredentials: true,
									})
									.catch((e) => console.log(e));
							} catch (e) {
								console.log(e);
							}
						}}
					>
						Secret
					</button>
					<button
						onClick={() => {
							try {
								axios
									.get("http://localhost:3307/authenticate", {
										withCredentials: true,
									})
									.catch((e) => console.log(e));
							} catch (e) {
								console.log(e);
							}
						}}
					>
						Auth
					</button>
				</div>
			}
		</div>
	);
}
App = connect(mapStateToProps)(App);
export default App;
