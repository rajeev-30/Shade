import {combineReducers, configureStore} from '@reduxjs/toolkit'
// import {persistStore, persistReducer} from 'redux-persist'
import userReducer from './userSlice'
import postReducer from './postSlice'
import NotificationReducer from './NotificationSlice'

// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//     key:'root',
//     storage
// }

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    notification: NotificationReducer
})

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducer
})

// export const persistor = persistStore(store)