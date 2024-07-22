import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifications:null,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState, 
    reducers: {
        getNotifications: (state, action) =>{
            state.notifications = action.payload
        }
    }
})

export const {getNotifications} = notificationSlice.actions
export default notificationSlice.reducer