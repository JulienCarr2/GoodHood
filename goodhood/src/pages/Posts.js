import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
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
	const pageStyles = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '10px',
		background: '#c395e6', // Lavender background color
	};

	const headingStyles = {
	fontSize: '60px', // Increased heading size for impact
	fontWeight: 'bold',
	color: '#5f506b', // White text for better contrast
	textShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', // Add subtle text shadow
	marginBottom: '20px',
	};

	const subheadingStyles = {
	fontSize: '22px', // Increased subheading size
	color: 'gray', // Lighter color for readability
	marginBottom: '40px',
	};

	const contactFormStyles = {
	width: '500px', // Fixed width for form
	padding: '40px', // Increased padding for more space
	borderRadius: '10px', // Rounded corners for form
	border: '1px solid #000', // Solid black border with 1px thickness
	borderColor: 'gray',
	backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
	};
	

	const inputStyles = {
	width: '100%',
	padding: '15px 20px', // Increased padding for better look
	marginBottom: '15px',
	border: '1px solid #ddd', // Lighter border color
	borderRadius: '5px', // Rounded corners for inputs
	

	};

	const submitButtonStyles = {
	padding: '15px 30px', // Increased padding for better look
	backgroundColor: '#7955b3', // Darker lavender button color
	color: '#fff', // White text for button
	border: 'none', // Remove border from button
	borderRadius: '3px', // Rounded corners for button
	cursor: 'pointer',
	};

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
	
	
	useEffect(() => {
    if (!cookies?.user)
      navigate("/users/login");
  }, [cookies, navigate]);
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
		if (!(formData.donationGoal.trim() === "")) {
			donationGoalSubmit = formData.donationGoal.trim();
		}
		if (!(formData.volunteerInfo.trim() === "")) {
			volunteerInfoSubmit = formData.volunteerInfo.trim();
		}

		document.getElementById("title").value = "";
		document.getElementById("latitude").value = "";
		document.getElementById("longitude").value = "";
		document.getElementById("donationGoal").value = "";
		document.getElementById("volunteerInfo").value = "";

		try {
			// Basic Validation


			mutateFunction({
				variables: {
					owner: cookies.user.id,
					title: titleSubmit,
					timestamp: (new Date()).toISOString(),
					latitude: Number(latitudeSubmit),
					longitude: Number(longitudeSubmit),
					image: "temp.png",
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
		<div style={pageStyles} class="content-container">
			<div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}> {/* White box for content */}
			<h1 style={headingStyles}>Create a Post</h1>
			<p style={subheadingStyles}>Enter Your Information Below</p>
			<Box
				component="form"
				sx={{
					width: '500px', // Fixed width for form
					padding: 'px', // Increased padding for more space
					borderRadius: '10px', // Rounded corners for form
					border: '1px solid #000', // Solid black border with 1px thickness
					borderColor: 'gray',
					backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
				}}
				noValidate
				autoComplete="off"
				onSubmit={submitForm}
			>
				{/* onKeyDown solution provided by https://stackoverflow.com/questions/70264223/mui-textfield-how-to-prevent-form-from-being-submitted to handle form submission by enter key. */}
				<Stack spacing={2}>
					<Stack spacing={2}>
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
							type="number"
						/>
						<TextField
							onChange={(e) => handleChange(e)}
							id="longitude"
							name="longitude"
							label="Longitude"
							type="number"
						/>
						<TextField
							onChange={(e) => handleChange(e)}
							id="donationGoal"
							name="donationGoal"
							label="Donation Goal"
							type="number"
						/>
						<TextField
							onChange={(e) => handleChange(e)}
							id="volunteerInfo"
							name="volunteerInfo"
							label="Volunteer Info"
						/>
					</Stack>
				<button type="submit" style={submitButtonStyles}>
					Submit
				</button>
				</Stack>
			</Box>
			{errorMessage ? (
				<Alert severity="error" sx={{ mt: 2 }}>
					{errorMessage}
				</Alert>
			) : null}
			</div>
		</div>
	);
}

export default Posts;
