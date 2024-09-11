import React, { useState } from "react";
import {
	Divider,
	Stack
} from "@mui/material";
import Box from "@mui/material/Box";

function Template(props) {
    return (
        <div class="conten-container">
        <Box>
            <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            >
            <Box>
                <p>Template Page</p>
            </Box>
            </Stack>
        </Box>
        </div>
    );
}

export default Template;