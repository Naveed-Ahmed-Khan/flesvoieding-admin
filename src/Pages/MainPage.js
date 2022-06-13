import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/UI/Navbar";
import Sidebar from "../Components/UI/Sidebar";
import Spinner from "../Components/UI/Spinner";

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1);
  }, []);

  return (
    <>
      <div
        className={` bg-primary z-0 md:min-h-screen md:flex md:p-4
        ${!isLoading ? "opacity-100" : "opacity-0"}
        transition ease-linear duration-700 `}
      >
        <Sidebar
          open={open}
          setOpen={setOpen}
          showBackdrop={showBackdrop}
          setShowBackdrop={setShowBackdrop}
        />
        <Navbar
          open={open}
          setOpen={setOpen}
          showBackdrop={showBackdrop}
          setShowBackdrop={setShowBackdrop}
        />
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
