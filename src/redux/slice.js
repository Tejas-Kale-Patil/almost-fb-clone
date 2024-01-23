/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [
        {
            userId: "01",
            fname: "Tejas",
            lname: "Kale",
            email: "tejas@abc.com",
            phone: 5471236589,
            pass: "aa",
            requests: [],
        },
        {
            userId: "02",
            fname: "abc",
            lname: "abcd",
            email: "aaa@aaa.com",
            phone: 5471236589,
            pass: "aa",
            requests: [],
        },
    ],
    currentUser: {},
};

export const userdataSlice = createSlice({
    name: "facebook",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return {...state,users:[...state.users,action.payload]};
        },
        addCurrentUser: (state, action) => {
            return { ...state, currentUser: action.payload };
        },
        editUserData: (state, action) => {
            return { ...state, users: action.payload };
        },
        sentRequest: (state, action) => {
            return { ...state, users: action.payload };
        },

    },
});

export const { addUser, addCurrentUser, editUserData, sentRequest } =
    userdataSlice.actions;
export default userdataSlice.reducer;
