import React, { useState } from 'react';
import {
    ImageOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    TextField
} from "@mui/material";
import FlexBetween from '../../Components/MUI/FlexBetween';
import UserImage from '../../Components/MUI/UserImage';
import WidgetWrapper from '../../Components/MUI/WedgitWrapper';
import { useDispatch } from 'react-redux';
import { createPostFunc } from '../../api/apiCall';


const WritePost = ({User}) => {
    const [isImage , setIsImage] = useState(false);
    const {palette} = useTheme();
    const [description , setDescription] = useState("");
    const [file , setFile] = useState(null);
    const dispatch = useDispatch();

    const createPostHandler = () => {
        const formData = new FormData();
        formData.append("description" , description);
        formData.append("image" , file);
        dispatch(createPostFunc(formData))
    }
    return (
        <WidgetWrapper>
            <FlexBetween gap={"1.5rem"} pb={"1rem"}>
                <UserImage Image={User?.profilePhoto?.url} />
                <InputBase
                    placeholder="What's on your mind..."
                    sx={{
                        width : "100%",
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                        backgroundColor: palette.neutral.light
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </FlexBetween>
            <Box
                pb={ isImage ? "1rem" : 0}
                height={isImage ? "100%": 0}
                overflow={ isImage ? "visible" : "hidden"}
                sx={{
                    transition:"all 0.3s"
                }}
            >
                <TextField
                    type='file'
                    fullWidth
                    sx={{borderRadius:"1rem"}}
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </Box>
            <Divider />
            <FlexBetween pt={"1rem"}>
                <IconButton sx={{borderRadius:"10px"}} onClick={()=> setIsImage(prev => !prev)}>
                    <ImageOutlined /> <Typography >image</Typography>
                </IconButton>
                <Button
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                    onClick={createPostHandler}
                >
                    post
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default WritePost