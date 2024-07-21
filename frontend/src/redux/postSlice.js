import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts:null,
    userPosts:null,
    followingPosts:null,
    likedPosts:null,
    savedPosts:null,
    refresh: false,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPosts: (state, action) =>{
            state.posts = action.payload
        },
        getUserPosts: (state, action) =>{
            state.userPosts = action.payload
        },
        getFollowingPosts: (state, action) =>{
            state.followingPosts = action.payload
        },
        getRefresh: (state, action) =>{
            state.refresh = !state.refresh
        },
        getLikePosts: (state, action) =>{
            state.likedPosts = action.payload
        },
        getSavedPosts: (state, action) =>{
            state.savedPosts = action.payload
        }
    }
})

export const {getPosts, getFollowingPosts, getRefresh, getLikePosts, getSavedPosts, getUserPosts} = postSlice.actions
export default postSlice.reducer