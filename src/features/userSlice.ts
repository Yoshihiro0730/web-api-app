import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../features/store";

interface USER {
    uid: string;
    displayName: string;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user:{ uid: "",  displayName: "" },
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = { uid: "",  displayName: "" };
        },
        updateUserProfile: (state, action: PayloadAction<USER>) => {
            state.user.uid = action.payload.uid;
            state.user.displayName = action.payload.displayName;
        }
    }
})

export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = ( state: RootState ) => state.user.user;

export default userSlice.reducer;