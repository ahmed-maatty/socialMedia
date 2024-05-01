import React, { useEffect } from "react";
import "../index.css";
import UserWidget from "./Widgets/UserWidget";
import WritePost from "./Widgets/WritePost";
import PostsWedgit from "./Widgets/PostsWedgit";
import FriendWedgit from "./Widgets/FriendWedgit";
import { Box, useMediaQuery } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserFunc, getUserPostsFunc } from "../api/apiCall";
import { useTheme } from "@emotion/react";

const Profile = () => {
    const isNotMobileScreen = useMediaQuery("( min-width : 1000px )");
    const { palette } = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getUserFunc(id));
    dispatch(getUserPostsFunc(id));
    }, [id]);

    const { userPosts, specificUser, loading } = useSelector(
        (state) => state.app
    );

    return (
        <Box
        width={"100%"}
        padding={"2rem 6%"}
        gap={"2rem"}
        justifyContent={"center"}
        display={isNotMobileScreen ? "flex" : "block"}
        >
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
            <Box flexBasis={isNotMobileScreen ? "26%" : undefined}>
                <UserWidget User={specificUser} />
                <Box m="2rem 0" />
                <FriendWedgit ID={specificUser?._id}/>
            </Box>
            <Box
                flexBasis={isNotMobileScreen ? "42%" : undefined}
                mt={isNotMobileScreen ? undefined : "2rem"}
            >
                <WritePost User={specificUser}/>
                <Box mt={"2rem"}>
                <PostsWedgit posts={userPosts}/>
                </Box>
            </Box>
            </>
        )}
        </Box>
    );
};

export default Profile;
