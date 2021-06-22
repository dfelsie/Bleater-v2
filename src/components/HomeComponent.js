import React from "react";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import {
	Formik,
	Field,
	Form,
	useField,
	FieldAttributes,
	FieldArray,
} from "formik";
import TextField from "@material-ui/core/TextField";

const axios = require("axios");

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
export default function HomeComponent({ props }) {
	//const user = props.user;
	//const bleats = props.bleats;
	//const hideFunc = props.hideFunc;
	//console.log(props);
	const [bTime, setBTime] = useState(null);
	//	console.log(bleats.bleats, "Baaa");

	//const [msgList, setMsg] = useState([...bleats.bleats]);
	return (
		<>
			<div>
				<div>
					<h2> Bleats </h2>
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
												type="submit"
												variant="contained"
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
					{/*msgList.map((msg, ind) => {
						return (
							<div key={`msg${ind}`}>
								<p>{msg.bleatmsg}</p>
								<br />
								<p> {msg.bleatemail}</p>
								<br />
								<p>{msg.bleattimestamp || "30xx"}</p>
							</div>
						);
					})*/}
				</div>
			</div>
			<div>
				<div></div>
			</div>
		</>
	);
}
