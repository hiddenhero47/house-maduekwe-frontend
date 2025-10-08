import { getFromLocalStorage } from "../../utilities/basicFunctions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: getFromLocalStorage("appThemes") || "dark",
};

const themeSlice = createSlice({
    name: "themes",
    initialState,
    reducers: {
        toggleTheme: state => {
            const htmlElement = document.querySelector("html");
            const newTheme = state.theme === "dark" ? "light" : "dark";
            state.theme = newTheme;
            localStorage.setItem("appThemes", newTheme);

            if (htmlElement) {
                htmlElement.classList.remove("nightMode", "dayMode");
                htmlElement.classList.add(
                    newTheme === "dark" ? "nightMode" : "dayMode"
                );
            }
        },
        setTheme: (state, action) => {
            const htmlElement = document.querySelector("html");
            state.theme = action.payload;
            localStorage.setItem("appThemes", action.payload);
            if (htmlElement) {
                htmlElement.classList.remove("nightMode", "dayMode");
                htmlElement.classList.add(
                    action.payload === "dark" ? "nightMode" : "dayMode"
                );
            }
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
