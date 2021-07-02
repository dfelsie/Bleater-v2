import Button from "@material-ui/core/Button";
import {
	Drawer,
	Card,
	Select,
	MenuItem,
	DialogContent,
} from "@material-ui/core";
import goat1 from "../images/goat2.jpg";
import goat2 from "../images/goat2.jpg";
import {
	Formik,
	Field,
	Form,
	useField,
	FieldAttributes,
	FieldArray,
} from "formik";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileComponent(props) {
	const axios = require("axios");
	const userName = useSelector((state) => {
		console.log(state, "Stjauny");
		return state.app.user;
	});
	//console.log(props, "prouser");

	return (
		<>
			<div id="profileCard">
				<div>
					<div>
						{" "}
						<h4>Profile of {userName || "No one"}</h4>
					</div>
				</div>
				<div>
					<div>
						<p>It's Me</p>
						<p>Joined June 30xx</p>

						<label>
							<Button
								component="span"
								onClick={(e) => {
									document.getElementById("hider").style.display =
										"block";
									document.getElementById("desc").style.display =
										"block";
									document.getElementById(
										"profileCard"
									).style.minHeight = "1px";
								}}
							>
								Edit Profile
							</Button>
						</label>
					</div>
				</div>
			</div>

			<div
				id="hider"
				style={{
					background: "rgba(0,0,0,0.5)",
					position: "absolute",
					top: "0",
					right: "0",
					bottom: "0",
					left: "0",
					height: "100%",
					overflowY: "hidden",
					display: "none",
				}}
			>
				<div
					id="desc"
					style={{
						backgroundColor: "white",
						height: "85%",
						width: "40%",
						margin: "2.5% auto 0 auto",
						zIndex: "100",
						display: "none",
						borderRadius: "25px",
						paddingTop: "10px",
					}}
				>
					<div
						style={{
							overflowY: "auto",
							width: "99%",
							height: "95%",
							borderRadius: "45px",
						}}
					>
						<Formik
							validateOnChange={true}
							validate={(values) => {
								const errors = {};
								if (values.email === "") {
									errors.email = "Empty Email";
								}
								if (
									values.confirmPassword !== "" &&
									values.password !== ""
								) {
									if (values.confirmPassword !== values.password) {
										errors.password = "Must Match";
									}
								}
								return errors;
							}}
							initialValues={{
								name: "",
								bio: "",
								location: "",
								website: "",
								file: null,
								profileFile: null,
							}}
							onSubmit={(data) => {
								// make async call

								const url = "/api/upload";
								const formData = new FormData();
								formData.append("file", data.file);
								formData.append("profileFile", data.profileFile);
								//formData.append("email", props.user.email);
								console.log(data.file, "Bespo", data.profileFile);

								console.log("formoDs", formData);
								/*try {
									axios
										.post(url, formData)
										.then(function (response) {});
								} catch (error) {
									console.log(error.message);
								}*/
								/*
								console.log("submit: ", data);
								try {
									axios
										.post(`/api/upload`, {
											file: data.file,
											profileFile: data.profileFile,
										})
										.then(function (response) {
											console.log(response, "Despo");
											return response;
										});
								} catch {
									return { ok: false };
								}*/

								//	props.subFunc(data.email, data.password);
							}}
						>
							{({ values, errors, isSubmitting, setFieldValue }) => (
								<Form>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											width: "100%",
										}}
									>
										<div>
											<img src={goat1} />

											<input
												id="profileFile"
												name="profileFile"
												type="file"
												style={{
													opacity: "0",
													cursor: "pointer",
													width: "100%",
													height: "100%",
													position: "absolute",
													top: "0",
												}}
												onChange={(event) => {
													values.profileFile =
														event.currentTarget.files[0];
													console.log(
														values.profileFile
														//	event.currentTarget.files[0]
													);
												}}
											/>
										</div>

										<div style={{ marginTop: "50px" }}>
											<Field
												fullWidth
												rowsMax={4}
												multiline
												as={TextField}
												label="name"
												name="name"
												type="text"
												variant="outlined"
											></Field>
										</div>
										<div>
											<Field
												fullWidth
												rowsMax={4}
												multiline
												as={TextField}
												label="bio"
												name="bio"
												type="text"
												variant="outlined"
											></Field>
										</div>
										<div>
											<Field
												fullWidth
												rowsMax={4}
												multiline
												as={TextField}
												label="location"
												name="location"
												type="text"
												variant="outlined"
											></Field>
										</div>
										<div>
											<Field
												fullWidth
												rowsMax={4}
												multiline
												as={TextField}
												label="website"
												name="website"
												type="text"
												variant="outlined"
											></Field>
										</div>
										<div>
											<img src={goat1} />
											<input
												id="file"
												name="file"
												type="file"
												style={{
													opacity: "0",
													cursor: "pointer",
													width: "100%",
													height: "100%",
													position: "absolute",
													top: "0",
												}}
												onChange={(event) => {
													values.file = event.currentTarget.files[0];
													console.log(
														values.file
														//	event.currentTarget.files[0]
													);
												}}
											/>
										</div>
										<div>
											<Button type="submit" variant="contained">
												Submit
											</Button>
										</div>
									</div>
								</Form>
							)}
						</Formik>
						<Button
							onClick={(e) => {
								document.getElementById("hider").style.display =
									"none";
								document.getElementById("desc").style.display =
									"none";
								document.getElementById(
									"profileCard"
								).style.minHeight = "500px";
							}}
						>
							Hide
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
