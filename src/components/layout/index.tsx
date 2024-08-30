import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import SiderBar from "./siderbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <SiderBar />

        {/* Main Content */}
        <div className="flex-1 px-3 py-4 bg-white md:px-6 md:py-8">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
