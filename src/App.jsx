import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import './index.css';
import GlobalStyleInjector from "./global.style";
import IndexLayout from "./layouts/index-layout/index";
import AppToast from "./layouts/toast";
import Home from "./pages/home";
import AboutUs from "./pages/about-us";
import Settings from "./pages/settings";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyleInjector />
        <div id="containerBody">
          <Routes>
            <Route element={<IndexLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <AppToast />
    </QueryClientProvider>
  );
}

export default App;
