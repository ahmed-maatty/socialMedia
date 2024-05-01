import { toast } from "react-toastify";
import Domain from "./domain"
import {appAction} from "./slices"


export function registerFunc(userData){
    return async () => {
        try {
            const {data} = await Domain.post("/api/auth/register" , userData);
            toast.success(data.message)
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }
}

export function loginFunc(userData){
    return async (dispatch) => {
        try {
            const {data} = await Domain.post("/api/auth/login" , userData);
            localStorage.setItem("Token" , JSON.stringify(data.token));
            localStorage.setItem("userInfo" , JSON.stringify(data.user));
            await toast.success(data.message);
            window.location.reload();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export function getUserFriendsFunc(id){
    return async (dispatch , state) => {
        try {
            const {data} = await Domain.get(`/api/user/${id}/friends` , {
                headers : {
                    Authorization : "Bearer " + state().app.token
                }
            })
            dispatch(appAction.setFriends(data));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export function getUserFunc(id){
    return async (dispatch , state)=>{
        try {
            dispatch(appAction.startLoading());
            const { data } = await Domain.get(`/api/user/${id}`, {
                headers : {
                    Authorization : "Bearer " + state().app.token
                }
            });
            dispatch(appAction.getUser(data));
            dispatch(appAction.endLoading())
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

/*==================> POSTS <==================*/

export function createPostFunc(postData){
    return async (dispatch , state) => {
        try {
            const {data} = await Domain.post("/api/post/create-post" , postData , {
                headers:{
                    Authorization : "Bearer " + state().app.token
                }
            })
            toast.success(data.message)
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export function getAllPostsFunc() {
    return async (dispatch) => {
        try {
            const {data} = await Domain.get("/api/post");
            dispatch(appAction.setposts(data));
            dispatch(appAction.endLoading());
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export function manageFreindShipFunc(userId , friendId){
    return async (dispatch , state) => {
        try {
            await Domain.patch(`/api/user/${userId}/${friendId}` , {} , {
                headers : {
                    Authorization : "Bearer " + state().app.token
                }
            });
            window.location.reload();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export function manageLikesFunc(postId){
    return async (dispatch , state) => {
        try {
            await Domain.patch(`/api/post/${postId}/like`, {} , {
                headers:{
                    Authorization:"Bearer " + state().app.token
                }
            });
            window.location.reload();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export function getUserPostsFunc(userId){
    return async (dispatch) => {
        try {
            dispatch(appAction.startLoading());
            const {data} = await Domain.get(`/api/post/${userId}/posts`);
            await dispatch(appAction.setPost(data));
            dispatch(appAction.endLoading());
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}