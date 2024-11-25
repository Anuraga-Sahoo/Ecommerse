import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
      <ToastContainer />
      <TopBar />
      <Navigation />
      <main className="py-24">
        <Outlet />
      </main>
    </>
  );
}

export default App;
