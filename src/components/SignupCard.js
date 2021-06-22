import { Button } from "@material-ui/core";
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
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignupCard(props) {
	return (
		<div style={{}}>
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
			<h1 style={{ textAlign: "center" }}>Sign up!</h1>
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
					email: "",
					password: "",
					confirmPassword: "",
				}}
				onSubmit={(data) => {
					// make async call
					console.log("submit: ", data);
					axios
						.post(
							"http://localhost:3307/signup",
							{
								email: data.email,
								password: data.password,
							},
							{
								withCredentials: true,
							}
						)
						.then(function (response) {
							// handle success
							console.log(response);
						})
						.catch(function (e) {
							console.log(e.message);
						});
					//	props.subFunc(data.email, data.password);
				}}
			>
				{({ values, errors, isSubmitting }) => (
					<Form>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								width: "100%",
							}}
						>
							<div>
								<Field
									as={TextField}
									type="email"
									label="Enter Email"
									name="email"
									variant="outlined"
								></Field>
							</div>
							<div>
								<Field
									as={TextField}
									label="Create Password"
									type="password"
									name="password"
									variant="outlined"
								></Field>
							</div>
							<div>
								<Field
									as={TextField}
									id="confirm"
									label="Confirm Password"
									type="password"
									name="confirmPassword"
									variant="outlined"
									error={errors?.password != null}
									helperText={
										errors?.password == null
											? ""
											: "Passwords must match"
									}
								></Field>
							</div>
							<div>
								<Button type="submit" variant="contained">
									Submit
								</Button>
							</div>
						</div>
						<pre>{JSON.stringify(errors, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</div>
	);
}
