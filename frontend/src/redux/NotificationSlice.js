import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifications:null,
    refresh:false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState, 
    reducers: {
        getNotifications: (state, action) =>{
            state.notifications = action.payload
        },
        getRefresh: (state, action) => {
            state.refresh = !state.refresh
        }
    }
})

export const {getNotifications, getRefresh} = notificationSlice.actions
export default notificationSlice.reducer