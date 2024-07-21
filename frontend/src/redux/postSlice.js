import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts:null,
    followingPosts:null,
    likedPosts:null,
    savedPosts:null,
    userPosts:null,
    refresh: false,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPosts: (state, action) =>{
            state.posts = action.payload
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

export const {getPosts, getFollowingPosts, getRefresh, getLikePosts, getSavedPosts} = postSlice.actions
export default postSlice.reducer