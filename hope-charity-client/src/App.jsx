/* eslint-disable jsx-quotes */
/* eslint-disable import/order */
/* eslint-disable react/jsx-tag-spacing */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import LoadingSpinner from "./Components/Layouts/Shared/LoadingSpinner";
import Navbar from "./Components/Layouts/Shared/Navbar";
import Footer from "./Components/Layouts/Shared/Footer";

const App = () => {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 400,
    });
  }, []);
  const [isLoading, setIsLoading] = useState(
    document.readyState !== "complete"
  );

  useLayoutEffect(() => {
    const handlePageLoad = () => {
      setIsLoading(false);
      Aos.refresh();
    };

    if (!isLoading) {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, [isLoading]);
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
        <Outlet />
        <ScrollRestoration />
      <Footer />
    </div>
  );
};

export default App;