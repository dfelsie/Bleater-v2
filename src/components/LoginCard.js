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
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function LoginCard({ props }) {
	let history = useHistory();
	const userName = useSelector((state) => {
		console.log(state, "Stjauny");
		return state.app.user;
	});
	console.log(props, "okofj");
	return (
		<div>
			<h1 style={{ textAlign: "center" }}>{userName || "Log in"}</h1>
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
				onSubmit={async (data) => {
					// make async call
					console.log("Login submit: ", data);
					await axios
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
							console.log(response, "iununun");
							window.localStorage.setItem("user", data.email);
							props.disp(data.email);
							props.setIsAuth(true);
							history.push("/home");
						})
						.catch(function (e) {
							console.log(e.message, "whooops");
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
