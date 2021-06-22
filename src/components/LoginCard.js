import {
	Formik,
	Field,
	Form,
	useField,
	FieldAttributes,
	FieldArray,
} from "formik";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/TextField";
import axios from "axios";
import { Link } from "react-router-dom";
export default function LoginCard(props) {
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
			<h1 style={{ textAlign: "center" }}>Log in</h1>
			<Formik
				validateOnChange={true}
				validate={(values) => {
					const errors = {};
					if (values.email === "") {
						errors.email = "Empty Email";
					}
					return errors;
				}}
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={(data) => {
					// make async call
					console.log("Login submit: ", data);
					axios
						.post(
							"http://localhost:3307/login",
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
					//let res = props.logFunc(data.email, data.password);
					//console.log(res);
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
									label="Enter Password"
									type="password"
									name="password"
									variant="outlined"
								></Field>
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
		</div>
	);
}
