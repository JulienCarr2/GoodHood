import React, { useState } from "react";
import {
	Divider,
	Stack
} from "@mui/material";
import Box from "@mui/material/Box";
import Map from "../assets/Map";

function Template(props) {
    return (
        <div class="content-container">
        <Box>
            <Stack>
                <Box>
                    <Map/>
                </Box>
            </Stack>
        </Box>
        </div>
    );
}

export default Template;