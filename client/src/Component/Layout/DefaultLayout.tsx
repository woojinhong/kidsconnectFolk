import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer/Footer";
import Header from "../Common/Header/Header";

function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default DefaultLayout;
