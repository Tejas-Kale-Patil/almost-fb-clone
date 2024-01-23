import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from './slice'
export  const store = configureStore({
    reducer: userDataSlice
})