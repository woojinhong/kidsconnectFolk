import { useEffect } from "react";

import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer/Footer";
import Header from "../Common/Header/Header";

function DefaultLayout({ bgColor }: { bgColor?: "lightGray" | undefined }) {
  const modifyBackgroundColor = () => {
    document.body.style.backgroundColor = "#F2F2F2";
  };

  const modifyBackgroundColorWhite = () => {
    document.body.style.backgroundColor = "#ffffff";
  };

  useEffect(() => {
    if (bgColor === "lightGray") {
      modifyBackgroundColor();
    } else {
      modifyBackgroundColorWhite();
    }
  });

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default DefaultLayout;
