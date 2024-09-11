import React, { useState } from "react";
import {
	Divider,
	Stack
} from "@mui/material";
import Box from "@mui/material/Box";
import Map from "../assets/Map";

function Template(props) {
    return (
        <Box>
            <Stack>
                <Box>
                    <Map/>
                </Box>
            </Stack>
        </Box>
    );
}

export default Template;