import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    token: localStorage.getItem("Token")
        ? JSON.parse(localStorage.getItem("Token"))
        : null,
    posts: null,
    userPosts:null,
    friends: null ,
    loading:true,
    specificUser:null
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setMode(state) {
        state.mode = state.mode === "light" ? "dark" : "light";
        },
        setToken(state, action) {
        state.token = action.payload;
        },
        setLogOut(state) {
        localStorage.removeItem("userInfo");
        state.user = null;
        state.token = null;
        },
        setposts(state, action) {
            state.posts = action.payload;
        },
        setPost(state, action) {
            state.userPosts = action.payload
        },
        setFriends(state , action){
            state.friends = action.payload
        },
        getUser(state , action){
            state.specificUser = action.payload ;
        },
        startLoading(state){
            state.loading = true ;
        },
        endLoading(state){
            state.loading = false ;
        }
    },
});

export const appAction = appSlice.actions;
export const appReducer = appSlice.reducer;
