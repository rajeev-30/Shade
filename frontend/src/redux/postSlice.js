import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts:null,
    followingPosts:null,
    refresh: false
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
        }
    }
})

export const {getPosts, getFollowingPosts, getRefresh} = postSlice.actions
export default postSlice.reducer