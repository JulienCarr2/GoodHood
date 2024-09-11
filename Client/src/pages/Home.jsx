import React, { useState } from "react";
import {
    Typography,
	Stack
} from "@mui/material";
import Box from "@mui/material/Box";

function Home(props) {
    return (
        <Box>
            <Stack
            direction="row"
            sx={{justifyContent: "center"}}
            display="flex"
            >
            <Stack>
                <Box width="50%">
                    <Typography variant="h3">
                        About
                    </Typography>
                    <Typography>
                    Good Hood is a web application designed to help donators find the optimal way to donate their money and help those who truly need it.

                    Our webpage is a one stop shop destination for making and donating to different outreach programs.
                    </Typography>
                </Box>
                <Box width="50%">
                    <Typography variant="h3">
                        Making a Difference
                    </Typography>
                    <Typography variant="h5">
                    Make an Account
                    </Typography>
                    <Typography>
                    Sign up on our webpage
                    </Typography>

                    <Typography variant="h5">
                    Find a Donation You Wish to Sponsor
                    </Typography>
                    <Typography>
                    Once you find a donation request you like,
                    click the icon on the map and open
                    the donation page. From here you
                    can see what type relief the donation page is
                    requesting.
                    </Typography>

                    <Typography variant="h5">
                    Create a Fundraising Page
                    </Typography>
                    <Typography>
                    If you are a business account, you are able to make
                    donation requests on the map. Using either your
                    current location or a given location, you can create
                    a pin that links to your donation page. On the
                    donation page, you can set up what kind of
                    donations you require, whether it is service
                    hours, food/canned goods, or monetary donations
                    </Typography>
                </Box>
            </Stack>
                <Box width="50%"></Box>
            </Stack>
        </Box>
    );
}

export default Home;