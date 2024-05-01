import React, { useEffect } from "react";
import WidgetWrapper from "../../Components/MUI/WedgitWrapper";
import FlexBetween from "../../Components/MUI/FlexBetween";
import UserImage from "../../Components/MUI/UserImage";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsFunc, manageFreindShipFunc, manageLikesFunc } from "../../api/apiCall";
import { InfinitySpin } from "react-loader-spinner";
import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";

const PostsWedgit = ({posts}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.app);
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;

    useEffect(() => {
        dispatch(getAllPostsFunc());
    }, []);

    const { loading } = useSelector((state) => state.app);

    return (
        <>
        {loading ? (
            <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <InfinitySpin
                visible={true}
                width="200"
                color={palette.primary.main}
                ariaLabel="infinity-spin-loading"
                />
            </Box>
        ) : (
            <>
            {posts?.map((post) => (
                <WidgetWrapper mb={"1.1rem"} key={post._id}>
                <FlexBetween
                    pb={"1.1rem"}
                >
                    <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                    onClick={() => navigate(`/profile/${post.userId._id}`)}
                    >
                    <UserImage Image={post.userId?.profilePhoto?.url} />
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
                        >{`${post.firstName} ${post.lastName}`}</Typography>
                        <Typography mt={"5px"} color={medium}>
                        {" "}
                        {post.location}
                        </Typography>
                    </Box>
                    </Box>
                    <IconButton
                        onClick={ () => dispatch(manageFreindShipFunc(user._id , post.userId._id))}
                    >
                        {
                            post.userId?.friends?.includes(user._id) ?
                            <PersonRemoveOutlined
                                style={{color : "red"}}
                            />
                            :
                            <PersonAddOutlined
                                style={{color : palette.primary.main}}
                            />
                        }
                        
                    </IconButton>
                </FlexBetween>
                <Box p={"0.8rem"}>
                    <Typography>{post.description}</Typography>
                </Box>
                {post.postPhoto?.url ? (
                    <Box p={"0.8rem"}>
                    <img
                        width={"100%"}
                        height={"auto"}
                        style={{ borderRadius: "15px" }}
                        src={post.postPhoto?.url}
                        alt=""
                    />
                    </Box>
                ) : (
                    <></>
                )}
                <Box pl={"0.8rem"}>
                    <IconButton onClick={() => dispatch(manageLikesFunc(post._id))}>
                        {
                            post.likes.hasOwnProperty(user._id) === true ? <FavoriteOutlined /> : <FavoriteBorderOutlined />
                        }
                    </IconButton>
                </Box>
                </WidgetWrapper>
            ))}
            </>
        )}
        </>
    );
};

export default PostsWedgit;
