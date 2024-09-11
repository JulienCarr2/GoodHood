import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
	Alert,
	Button,
	Divider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

function Profile(props) {
	const [formData, setFormData] = useState({
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const createUser = gql`
		mutation Mutation(
			$username: String!,
			$firstName: String!,
			$lastName: String!,
			$userEmail: String!,
			$password: String!
		) {
			createUser(
				username: $username
				firstName: $firstName
				lastName: $lastName
				userEmail: $userEmail
				password: $password
			) {
				_id
				username
				firstName
				lastName
				userEmail
			}
		}
	`;

	// Mutate function
	const [mutateFunction] =
		useMutation(createUser);

	// Form Submission handler done by Facundo
	const submitForm = async (e) => {
		e.preventDefault();
		setErrorMessage(null);

		let usernameSubmit = "";
		let firstSubmit = "";
		let lastSubmit = "";
		let emailSubmit = "";
		let passwordSubmit = "";
		
		if (!(formData.username.trim() === "")) {
			usernameSubmit = formData.username.trim();
		}
		if (!(formData.firstName.trim() === "")) {
			firstSubmit = formData.firstName.trim();
		}
		if (!(formData.lastName.trim() === "")) {
			lastSubmit = formData.lastName.trim();
		}
		if (!(formData.email.trim() === "")) {
			emailSubmit = formData.email.trim();
		}
		if (!(formData.password.trim() === "")) {
			passwordSubmit = formData.password.trim();
		}

		document.getElementById("username").value = "";
		document.getElementById("firstName").value = "";
		document.getElementById("lastName").value = "";
		document.getElementById("email").value = "";
		document.getElementById("password").value = "";

		try {

			// Basic Validation
			if (usernameSubmit.length > 30) {
				throw new Error("Username must be less than 30 characters.");
			}
			if (firstSubmit.length > 20) {
				throw new Error("First Name must be less than 20 characters.");
			}
			if (lastSubmit.length > 20) {
				throw new Error("Last Name must be less than 20 characters.");
			}

			mutateFunction({
				variables: {
					username: usernameSubmit,
					firstName: firstSubmit,
					lastName: lastSubmit,
					userEmail: emailSubmit,
					password: passwordSubmit
				},
			}).then((response) => {
				const userID = response.data?.createPost._id;
				if (!userID) {
					throw "Invalid Data";
				}
				navigate("/");
			});
		} catch(e) {
			setErrorMessage(`${e}`);
		}
	};

	return (
		<div className="profile">
			<div className="input-selection">
				<h1>User Profile</h1>
				{/* Example Form based on MUI documentation for TextField */}
				<Alert severity="warning" sx={{ mt: 2 }}>
					Input Your Information Below!
				</Alert>
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					noValidate
					autoComplete="off"
					onSubmit={submitForm}
				>
					{/* onKeyDown solution provided by https://stackoverflow.com/questions/70264223/mui-textfield-how-to-prevent-form-from-being-submitted to handle form submission by enter key. */}
					<Stack>
						<Stack direction="row">
						<TextField
							onChange={(e) => handleChange(e)}
							id="username"
							name="username"
							label="Username"
						/>
						<TextField
							onChange={(e) => handleChange(e)}
							id="firstName"
							name="firstName"
							label="First Name"
						/>
						<TextField
							onChange={(e) => handleChange(e)}
							id="lastName"
							name="lastName"
							label="Last Name"
						/>
						<TextField
							onChange={(e) => handleChange(e)}
							id="email"
							name="email"
							label="Email Address"
						/>
						<TextField
							onChange={(e) => handleChange(e)}
							id="password"
							name="password"
							label="Password"
						/>
						</Stack>
					<button type="submit">
						Submit
					</button>
					</Stack>
				</Box>
			</div>
			{errorMessage ? (
				<Alert severity="error" sx={{ mt: 2 }}>
					{errorMessage}
				</Alert>
			) : null}
		</div>
	);
}

export default Profile;
