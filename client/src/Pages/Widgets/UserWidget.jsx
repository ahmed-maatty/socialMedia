import React from "react";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../Components/MUI/UserImage";
import FlexBetween from "../../Components/MUI/FlexBetween";
import WedgitWrapper from "../../Components/MUI/WedgitWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TW from "../../assets/twitter.png";
import LI from "../../assets/linkedin.png"



const UserWidget = ({User}) => {
    const {user} = useSelector(state => state.app)
    const {palette} = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;

    return(
        <WedgitWrapper>
            {/* First Row */}
            <FlexBetween
                pb={"1.1rem"}
                onClick={() => navigate(`/profile/${User._id}`)}
            >
                <Box
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        gap:"1rem"
                    }}
                >
                    <UserImage Image={User?.profilePhoto?.url} />
                    <Box>
                        <Typography 
                            variant="h4"
                            color={dark}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >{`${User?.firstName} ${User?.lastName}`}</Typography>
                        <Typography mt={"5px"} color={medium}> {User?.friends?.length} Friends </Typography>
                    </Box>
                </Box>
                <ManageAccountsOutlined />
            </FlexBetween>
            <Divider />
            {/* Second Row */}
            <Box py={"1.1rem"}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={"1rem"}
                    mb={"1rem"}
                >
                    <LocationOnOutlined sx={{fontSize : "1.8rem"}}/>
                    <Typography variant="h5" color={medium}>{User?.location}</Typography>
                </Box>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={"1rem"}
                >
                    <WorkOutlineOutlined sx={{fontSize : "1.8rem"}}/>
                    <Typography variant="h5" color={medium}>{User?.occupation}</Typography>
                </Box>
            </Box>
            <Divider />
            {/* Third Row */}
            <Box py={"1.1rem"}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={"1rem"}
                    mb={"1rem"}
                >
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography variant="h6" color={dark}>{User?.viewedProfile}</Typography>
                </Box>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={"1rem"}
                >
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography variant="h6" color={dark}>{User?.impressions}</Typography>
                </Box>
            </Box>
            <Divider />
            {/* Fourth Row */}
            <Box>
                <Typography variant="h5" py={"0.8rem"} color={dark}>Social Profiles</Typography>
                <FlexBetween
                    pb={"1.1rem"}
                    onClick={() => navigate(`/profile/${user._id}`)}
                >
                    <Box
                        sx={{
                            display:"flex",
                            alignItems:"center",
                            gap:"1rem"
                        }}
                    >
                        <img src={TW} width={"25px"} height={"25px"} alt="Twitter-Icon" />
                        <Box>
                            <Typography
                                variant="h6"
                                color={dark}
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.light,
                                        cursor: "pointer",
                                    },
                                }}
                            >Twitter</Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </Box>
                    <EditOutlined />
                </FlexBetween>
                <FlexBetween
                    pb={"1.1rem"}
                    onClick={() => navigate(`/profile/${user._id}`)}
                >
                    <Box
                        sx={{
                            display:"flex",
                            alignItems:"center",
                            gap:"1rem"
                        }}
                    >
                        <img src={LI} width={"25px"} height={"25px"} alt="Twitter-Icon" />
                        <Box>
                            <Typography
                                variant="h6"
                                color={dark}
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.light,
                                        cursor: "pointer",
                                    },
                                }}
                            >Linkedin</Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </Box>
                    <EditOutlined />
                </FlexBetween>
            </Box>
        </WedgitWrapper>
    );
};

export default UserWidget;
