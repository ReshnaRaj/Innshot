import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import adminReducer from './adminSlice'
import staffReducer from './staffSlice'
export default configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
        staff:staffReducer
    }
})