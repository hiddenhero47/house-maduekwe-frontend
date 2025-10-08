import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },

        logout: () => {
            // intentionally left blank. It works to trigger the root reducer state purge.
            return initialState;
        },
    },
});

export const selectUser = (state) => state.auth;

export const { logout, setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
