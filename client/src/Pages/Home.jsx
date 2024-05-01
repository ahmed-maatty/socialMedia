import React , {useEffect} from "react";
import "../index.css";
import UserWidget from "./Widgets/UserWidget";
import { Box, useMediaQuery } from "@mui/material";
import WritePost from "./Widgets/WritePost";
import PostsWedgit from "./Widgets/PostsWedgit";
import AdvertWedgit from "./Widgets/AdvertWedgit";
import FriendWedgit from "./Widgets/FriendWedgit";
import { useSelector , useDispatch } from "react-redux";
import {getAllPostsFunc} from "../api/apiCall";
const Home = () => {
    const isNotMobileScreen = useMediaQuery("( min-width : 1000px )");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPostsFunc());
    }, []);

    const { posts , user} = useSelector((state) => state.app);
    return (
            <Box
                width={"100%"}
                padding={"2rem 6%"}
                gap={"0.5rem"}
                justifyContent={"space-between"}
                display={isNotMobileScreen ? "flex" : "block"}
            >
                <Box flexBasis={isNotMobileScreen ? "26%" : undefined}>
                    <UserWidget User={user} />
                </Box>
                <Box
                    flexBasis={isNotMobileScreen ? "42%" : undefined}
                    mt={isNotMobileScreen ? undefined : "2rem"}
                >
                    <WritePost User={user} />
                    <Box mt={"2rem"}>
                        <PostsWedgit posts={posts} />
                    </Box>
                </Box>
                <Box
                    flexBasis={isNotMobileScreen ? "26%" : undefined}
                    mt={isNotMobileScreen ? undefined : "2rem"}
                >
                    <AdvertWedgit />
                    <Box m="2rem 0" />
                    <FriendWedgit ID={user._id}/>
                </Box>
            </Box>
    );
};

export default Home;
