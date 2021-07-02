import React from "react";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import {
	Formik,
	Field,
	Form,
	useField,
	FieldAttributes,
	FieldArray,
} from "formik";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";

const axios = require("axios");

async function dummy(disp) {
	const aut = await axios
		.get("http://localhost:3307/authenticate", {
			withCredentials: true,
		})
		.catch((e) => console.log(e.message, "Ntbub"));

	let authYes = aut.data.loggedIn === "true";
	if (authYes) {
		console.log("j jn", aut.data.user.email);
	}
}

async function subFunc(data, email, time) {
	// make async call
	console.log("submit: ", data);
	await axios
		.post(`/api/savebleat`, {
			email: email,
			msg: data.bleat,
			time: time,
		})
		.then(function (response) {
			console.log(response);
		});
}

async function gBleats(userName) {
	return await axios
		.post("http://localhost:3307/getbleats", {
			withCredentials: true,
			user: userName,
		})
		.catch((e) => console.log(e.message, "Ntbub"));
}
export default function HomeComponent({ props }) {
	const [bList, setBList] = useState(null);
	const [loading, setLoading] = useState(true);
	const userName = useSelector((state) => {
		console.log(state, "Stjauny");
		return state.app.user;
	});

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.post(
				"http://localhost:3307/getbleats",
				{
					withCredentials: true,
					user: userName,
				}
			);

			//console.log(result.data, "reuc");

			setBList(result.data.bList);
			setLoading(false);
		};

		fetchData();
	}, []);

	//setBList(gBleats(userName));
	console.log(bList, "Bleato's");

	//const user = props.user;
	//const bleats = props.bleats;
	//const hideFunc = props.hideFunc;
	//console.log(props);
	const [bTime, setBTime] = useState(null);

	//	console.log(bleats.bleats, "Baaa");

	//const [msgList, setMsg] = useState([...bleats.bleats]);
	if (loading) {
		return null;
	}
	return (
		<>
			<div>
				<div>
					<h2> Bleats for user {userName || "No Body"} </h2>
				</div>
				<div>
					<div>
						<Formik
							validateOnChange={false}
							initialValues={{
								bleat: "",
							}}
						>
							{({ values, errors, isSubmitting }) => (
								<Form>
									<div>
										<div>
											<Field
												as={TextField}
												type="text"
												label="Enter Bleat"
												name="bleat"
												variant="outlined"
											></Field>
										</div>
										<div></div>
										<div>
											<Button
												type="button"
												variant="contained"
												onClick={async () => {
													console.log("tex", values.bleat);
													await axios
														.post(
															"http://localhost:3307/addbleat",
															{
																text: values.bleat,
																user: userName,
															},
															{
																withCredentials: true,
															}
														)
														.then((res) => console.log("bRes", res));
													setBList([
														...bList,
														{
															text: values.bleat,
															user: userName,
															createdAt: new Date().toISOString(),
														},
													]);
												}}
												/*onClick={() => {
													const time = new Date()
														.toISOString()
														.slice(0, 19)
														.replace("T", " ");
													setBTime(time);
													setMsg([
														...msgList,
														{
															bleatmsg: user.email,
															bleatemail: values.bleat,
															bleattimestamp: time,
														},
													]);
												}}*/
											>
												Submit
											</Button>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
				<div>
					{bList === null
						? "Yerr"
						: bList.map((bleat, ind) => {
								return (
									<div key={`bleat${ind}`}>
										<p>{bleat.text}</p>
										<br />
										<p> {bleat.userEmail}</p>
										<br />
										<p>{bleat.createdAt || "30xx"}</p>
									</div>
								);
						  })}
				</div>
			</div>
			<div>
				<div></div>
			</div>
		</>
	);
}
