import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import Announcementbanner from "../components/Announcementbanner";
import Header from "../components/Header";
import Navvar from "../components/Navvar";
import BreadcrumbBar from "../components/BreadcrumbBar";
import AccountBanner from "../components/AccountBanner";
import AccountSidebar from "../components/AccountSidebar";
import ProfileForm from "../components/ProfileForm";
import CarCards from "../components/CarCards";
import MyAMCPage from "../components/MyAMCPage";
import AddBanner from "../components/AddBanner";
import Footer from "../components/Footer";

function MyAccount() {
  const { setIsLoggedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const [activeView, setActiveView] = useState(viewParam || "profile");

  useEffect(() => {
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (viewParam) {
      setActiveView(viewParam);
    }
  }, [viewParam]);

  const renderContent = () => {
    switch (activeView) {
      case "vehicles":
        return <CarCards />;
      case "amc":
        return <MyAMCPage />;
      case "profile":
      default:
        return <ProfileForm />;
    }
  };

  return (
    <div className="max-w-full overflow-hidden">
      <Announcementbanner />
      <Header />
      <Navvar />

      {/* ✅ Breadcrumb always visible except home */}
      <div className="w-full">
        <BreadcrumbBar />
      </div>

      <AccountBanner />

      <div className="bg-[#F4F4F4] py-10 md:py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            {/* Sidebar */}
            <div className="md:w-72 shrink-0">
              <AccountSidebar
                activeView={activeView}
                setActiveView={setActiveView}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 mb-10">{renderContent()}</div>
          </div>
        </div>
      </div>

      <AddBanner />
      <Footer />
    </div>
  );
}

export default MyAccount;
