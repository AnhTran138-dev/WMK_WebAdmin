import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import SiderBar from "./siderbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen">
      <Header />
      <div className="flex flex-1 w-full gap-4 h-fit ">
        <SiderBar />
        <div className="w-full h-fit">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
