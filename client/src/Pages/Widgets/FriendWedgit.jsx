import React, { useEffect } from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from '../../Components/MUI/WedgitWrapper';
import { useDispatch, useSelector } from "react-redux";
import { getUserFriendsFunc } from '../../api/apiCall';
import FlexBetween from '../../Components/MUI/FlexBetween';
import UserImage from '../../Components/MUI/UserImage';
import { useNavigate } from 'react-router-dom';


const FriendWedgit = ({ID}) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const navigate = useNavigate()
    const {friends} = useSelector(state => state.app);
    useEffect(()=>{ dispatch(getUserFriendsFunc(ID))} ,[ID]);
    return (
        <WidgetWrapper>
            <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: "1.5rem" }}
            >
            Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
            {friends?.map((friend) => (
                <FlexBetween
                pb={"1.1rem"}
                onClick={() => navigate(`/profile/${friend._id}`)}
                key={friend._id}
            >
                <Box
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        gap:"1rem"
                    }}
                >
                    <UserImage Image={friend.profilePhoto.url} />
                    <Box>
                        <Typography 
                            variant="h5"
                            color={""}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >{`${friend.firstName} ${friend.lastName}`}</Typography>
                        <Typography mt={"5px"} color={""}>{friend.location}</Typography>
                    </Box>
                </Box>
            </FlexBetween>
            ))}
        </Box>
        </WidgetWrapper>
    )
}

export default FriendWedgit