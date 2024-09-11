import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
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
import { useCookies } from "react-cookie";

function Post(props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const checkUser = gql`
		query Query(
            $emailAddress: String!,
            $password: String!
		) {
			checkUser(
				emailAddress: $emailAddress
				password: $password
			) {
				_id
			}
		}
	`;

	// Mutate function
	const [queryFunction] =
		useLazyQuery(checkUser);

	// Form Submission handler done by Facundo
	const submitForm = async (e) => {
		e.preventDefault();
		setErrorMessage(null);

		let emailSubmit = "";
		let passwordSubmit = "";
		
		if (!(formData.email.trim() === "")) {
			emailSubmit = formData.email.trim();
		}
		if (!(formData.password.trim() === "")) {
			passwordSubmit = formData.password.trim();
		}

		document.getElementById("email").value = "";
		document.getElementById("password").value = "";

		try {
			queryFunction({
				variables: {
					emailAddress: emailSubmit,
					password: passwordSubmit
				},
			}).then((response) => {
				const userID = response.data?.checkUser._id;
				if (!userID) {
					throw "Bad Credentials";
				}
                setCookie("user",userID);
				navigate(`/`);
			});
		} catch(e) {
			setErrorMessage(`${e}`);
		}
	};

	return (
		<div className="posts">
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

export default Post;
