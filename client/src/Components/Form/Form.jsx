import React, { useState } from "react";
import {
    Box,
    useTheme,
    TextField,
    Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { loginFunc, registerFunc } from "../../api/apiCall";
import { useNavigate } from "react-router-dom";

function Form() {
    const dispatch = useDispatch() ;
    const theme = useTheme();
    const navigate = useNavigate()
    const [pageType, setPageType] = useState("login");

    /*****Login Data Functions*****/
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const editLogin = (key, value) => {
        setLoginData({
        ...loginData,
        [key]: value,
        });
    };

    /***** Register Data Functions *****/
    const [firsName , setFirstName] = useState("") ;
    const [lastName , setLastName] = useState("") ;
    const [email , setEmail] = useState("") ;
    const [password , setPassword] = useState("") ;
    const [occupation , setOccupation] = useState("") ;
    const [location , setLocation] = useState("") ;
    const [image , setPhoto] = useState(null) ;

    const authHandler = async () => {
        if(pageType === "register"){
            const formData = new FormData()
            formData.append("firstName" , firsName);
            formData.append("lastName" , lastName);
            formData.append("email" , email);
            formData.append("password" , password);
            formData.append("occupation" , occupation);
            formData.append("location" , location);
            formData.append("image" , image);
            dispatch(registerFunc(formData));
        }else{
            await dispatch(loginFunc(loginData));
            navigate("/home")
        }
    }

    return (
        <Box
        width={"100%"}
        display={"grid"}
        gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
        gap="30px"
        >
        {pageType === "login" ? (
            <>
            <TextField
                required
                label={"Email"}
                defaultValue={loginData.email}
                onChange={(e) => editLogin("email", e.target.value)}
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                required
                label={"Password"}
                defaultValue={loginData.password}
                onChange={(e) => editLogin("password", e.target.value)}
                sx={{ gridColumn: "span 4" }}
            />
            </>
        ) : (
            <>
            <TextField
                required
                label="First Name"
                defaultValue={firsName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                required
                label="Last Name"
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                required
                label="Location"
                defaultValue={location}
                onChange={(e) => setLocation(e.target.value)}
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                required
                label="Occupation"
                defaultValue={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                    required
                    type="file"
                    label="Profile Photo"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    sx={{ gridColumn: "span 4" }}
            />
            <TextField
                required
                label={"Email"}
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                required
                label={"Password"}
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ gridColumn: "span 4" }}
            />
            </>
        )}

        <Button
            type="submit"
            sx={{
            gridColumn: "span 4",
            p: "1rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.alt,
            "&:hover": { color: theme.palette.primary.main },
            }}
            onClick={authHandler}
        >
            {" "}
            {pageType === "login" ? "login" : "register"}{" "}
        </Button>
        <Button
            sx={{
            gridColumn: "span 4",
            color: theme.palette.primary.main,
            textDecoration: "underline",
            "&:hover": { color: theme.palette.primary.main },
            }}
            onClick={() => setPageType(pageType === "login" ? "register" : "login")}
        >
            {pageType === "login"
            ? "Don't have an account? Sign Up here."
            : "Already have an account? Login here."}
        </Button>
        </Box>
    );
}

export default Form;
