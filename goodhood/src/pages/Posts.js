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
import { useCookies } from "react-cookie";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (true) {
	// Adds messages only in a dev environment
	loadDevMessages();
	loadErrorMessages();
}

function Posts(props) {
	const [formData, setFormData] = useState({
		title: "",
		latitude: "",
		longitude: "",
		image: "",
		donationGoal: "",
		volunteerInfo: "",
	});
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");
	const [cookies, setCookie, removeCookie] = useCookies(['user']);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const createPost = gql`
        mutation Mutation(
            $owner: ID!, 
            $title: String!, 
            $timestamp: String!, 
            $latitude: Float!, 
            $longitude: Float!, 
            $image: String!, 
            $donationGoal: Int!, 
            $volunteerInfo: String!
        ) {
            createPost(
                owner: $owner, 
                title: $title, 
                timestamp: $timestamp, 
                latitude: $latitude, 
                longitude: $longitude, 
                image: $image, 
                donationGoal: $donationGoal, 
                volunteerInfo: $volunteerInfo
            ) {
                _id
            }
        }
	`;

	// Mutate function
	const [mutateFunction] =
		useMutation(createPost);

	// Form Submission handler done by Facundo
	const submitForm = async (e) => {
		e.preventDefault();
		setErrorMessage(null);

		let titleSubmit = "";
		let latitudeSubmit = "";
		let longitudeSubmit = "";
		let imageSubmit = "";
		let donationGoalSubmit = "";
		let volunteerInfoSubmit = "";

		if (!(formData.title.trim() === "")) {
			titleSubmit = formData.title.trim();
		}
		if (!(formData.latitude.trim() === "")) {
			latitudeSubmit = formData.latitude.trim();
		}
		if (!(formData.longitude.trim() === "")) {
			longitudeSubmit = formData.longitude.trim();
		}
		if (!(formData.image.trim() === "")) {
			imageSubmit = formData.image.trim();
		}
		if (!(formData.donationGoal.trim() === "")) {
			donationGoalSubmit = formData.donationGoal.trim();
		}
		if (!(formData.volunteerInfo.trim() === "")) {
			volunteerInfoSubmit = formData.volunteerInfo.trim();
		}

		document.getElementById("title").value = "";
		document.getElementById("latitude").value = "";
		document.getElementById("longitude").value = "";
		document.getElementById("image").value = "";
		document.getElementById("donationGoal").value = "";
		document.getElementById("volunteerInfo").value = "";

		try {
			// Basic Validation


			mutateFunction({
				variables: {
					owner: cookies.user,
					title: titleSubmit,
					timestamp: (new Date()).toISOString(),
					latitude: Number(latitudeSubmit),
					longitude: Number(longitudeSubmit),
					image: imageSubmit,
					donationGoal: Number(donationGoalSubmit),
					volunteerInfo: volunteerInfoSubmit,
				},
			}).then((response) => {
				const postID = response.data?.createPost._id ?? "";
				navigate(`/posts/${postID}`);
			});
		} catch (e) {
			setErrorMessage(`${e}`);
		}
	};

	return (
		<div className="post">
			<div className="input-selection">
				<h1>Create a Post</h1>
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
								id="title"
								name="title"
								label="Title"
							/>
							<TextField
								onChange={(e) => handleChange(e)}
								id="latitude"
								name="latitude"
								label="Latitude"
							/>
							<TextField
								onChange={(e) => handleChange(e)}
								id="longitude"
								name="longitude"
								label="Longitude"
							/>
							<TextField
								onChange={(e) => handleChange(e)}
								id="image"
								name="image"
								label="Image"
							/>
							<TextField
								onChange={(e) => handleChange(e)}
								id="donationGoal"
								name="donationGoal"
								label="Donation Goal"
							/>
							<TextField
								onChange={(e) => handleChange(e)}
								id="volunteerInfo"
								name="volunteerInfo"
								label="Volunteer Info"
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

export default Posts;
