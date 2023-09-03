import { Outlet } from "react-router-dom";
import Header from "../shared/header";
import Footer from "../shared/footer";

const HomeLayout = () => {
  return (
    <div className="overflow-auto h-screen scroll-smooth">
      <Header />
      <div className="h-80">
        <Outlet />
      </div>
      <div className="text-center padding-20">
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
