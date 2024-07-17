import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'

const rootReducer = {
    user: userReducer
}

export const store = configureStore({
    reducer: rootReducer
})