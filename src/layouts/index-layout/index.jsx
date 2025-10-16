import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { colors } from "../../utilities/colors";
import { useSelector } from "react-redux";
import ScrollToTop from "../scroll-to-top";
import { LayoutWrapper } from "./index.style";
import Intro from '../app-intros/intro';

function IndexLayout() {
  const { theme } = useSelector((state) => state.themes);
  (() => {
    if (typeof document !== "undefined") {
      document.body?.setAttribute("data-theme", theme);
    }
  })();

  return (
    <ThemeProvider theme={colors[theme]}>
      <ScrollToTop />
      <div className="w-full h-full absolute"><Intro /></div>
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    </ThemeProvider>
  );
}

export default IndexLayout;
