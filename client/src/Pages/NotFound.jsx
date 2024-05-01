import React from 'react'
import { Box, Typography } from "@mui/material";

const NotFound = () => {
    return (
        <Box
            width={"100%"}
            height={"100vh"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Typography
            variant="h1"
            fontWeight={500}
            textAlign={"center"}
            > Not Found <br /> <span style={{color:'red'}}>404</span></Typography>
        </Box>
    )
}

export default NotFound