import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { colors } from "../../utilities/colors";
import { useSelector } from "react-redux";
import ScrollToTop from "../scroll-to-top";
import { LayoutWrapper } from "./index.style";

function IndexLayout() {
  const { theme } = useSelector((state) => state.themes);

  (() => {
    const bodyElement = document.querySelector("body");
    const htmlElement = document.querySelector("html");

    if (bodyElement) {
      bodyElement.classList.add("bg-dashboardBg");
    }
    if (htmlElement) {
      htmlElement.classList.add(theme === "dark" ? "nightMode" : "dayMode");
    }
  })();

  return (
    <ThemeProvider
      theme={theme === "light" ? colors?.dayMode : colors?.nightMode}
    >
      <ScrollToTop />
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    </ThemeProvider>
  );
}

export default IndexLayout;
