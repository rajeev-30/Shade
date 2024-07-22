import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts:null,
    post:null,
    userPosts:null,
    followingPosts:null,
    likedPosts:null,
    savedPosts:null,
    mediaPosts:null,
    refresh: false,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPosts: (state, action) =>{
            state.posts = action.payload
        },
        getPost: (state, action) =>{
            state.post = action.payload
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
        },
        getMediaPosts: (state, action) =>{
            state.mediaPosts = action.payload
        }
    }
})

export const {getPosts, getPost, getFollowingPosts, getRefresh, getLikePosts, getSavedPosts, getUserPosts, getMediaPosts} = postSlice.actions
export default postSlice.reducer