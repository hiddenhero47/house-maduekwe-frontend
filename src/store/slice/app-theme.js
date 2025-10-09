import { getFromLocalStorage } from "../../utilities/basicFunctions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: getFromLocalStorage("appThemes") || "light",
};

const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      state.theme = newTheme;
      localStorage.setItem("appThemes", newTheme);

      if (typeof document !== "undefined") {
        document.body?.setAttribute("data-theme", newTheme);
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("appThemes", action.payload);

      if (typeof document !== "undefined") {
        document.body?.setAttribute("data-theme", action.payload);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
