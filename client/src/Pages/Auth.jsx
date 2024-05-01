import React from "react";
import "../index.css";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "../Components/Form/Form";

const Auth = () => {
    const isNotMobileScreen = useMediaQuery("( min-width : 1000px )");
    const theme = useTheme();

    return (
        <Box>
        <Box
            width={"100%"}
            backgroundColor={theme.palette.background.alt}
            p={"1rem 6%"}
            textAlign={"center"}
        >
            <Typography variant="h1" color={"primary"} fontWeight={"500"}>
            sociopedia
            </Typography>
        </Box>
        <Box
            width={isNotMobileScreen ? "50%" : "93%"}
            p={"2rem"}
            m={"2rem auto"}
            borderRadius={"1.5rem"}
            backgroundColor={theme.palette.background.alt}
        >
            <Typography
            fontWeight={"500"}
            variant="h5"
            sx={{
                mb: "1.5rem",
            }}
            >
                welcome to socipedia, the social media for sociopaths !
            </Typography>
            <Form />
        </Box>
        </Box>
    );
};

export default Auth;
