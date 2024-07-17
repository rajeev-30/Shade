import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    profile:null,
    signinModal:false,
    allUsers:null,
    refresh:false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) =>{
            state.user = action.payload;
        },
        getProfile: (state, action) =>{
            state.profile = action.payload;
        },
        getAllUsers: (state, action) =>{
            state.allUsers = action.payload;
        },
        setSigninModal: (state, action) => {
            state.signinModal = action.payload;
        },
        getRefresh: (state, action) =>{
            state.refresh = !state.refresh
        }
    }
});

export const {getUser, getProfile, getAllUsers, setSigninModal, getRefresh} = userSlice.actions
export default userSlice.reducer
