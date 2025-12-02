import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import AccountBanner from "../components/AccountBanner";
import AccountSidebar from "../components/AccountSidebar";

const ProfileForm = React.lazy(() => import("../components/ProfileForm"));
const CarCards = React.lazy(() => import("../components/CarCards"));
const MyAMCPage = React.lazy(() => import("../components/MyAMCPage"));

const ContentLoader = () => (
  <div className="flex items-center justify-center min-h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#266DDF]"></div>
  </div>
);

const CardLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div className="bg-gray-200 p-3 sm:p-4 md:p-6 flex items-center justify-center h-24 sm:h-32 md:h-40 animate-pulse"></div>
      <div className="p-3 sm:p-4 md:p-5 space-y-1.5 sm:space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
        <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          <div className="h-9 sm:h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-9 sm:h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div className="bg-gray-200 p-3 sm:p-4 md:p-6 flex items-center justify-center h-24 sm:h-32 md:h-40 animate-pulse"></div>
      <div className="p-3 sm:p-4 md:p-5 space-y-1.5 sm:space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
        <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          <div className="h-9 sm:h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-9 sm:h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

function MyAccount() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const [activeView, setActiveView] = useState(viewParam || "profile");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (viewParam && viewParam !== activeView) {
      setActiveView(viewParam);
    }
  }, [viewParam, activeView]);

  const handleChangeView = (next) => {
    setActiveView(next);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("view", next);
      return p;
    }, { replace: true });
  };

  const renderContent = () => {
    switch (activeView) {
      case "vehicles":
        return (
          <Suspense fallback={<CardLoader />}>
            <CarCards />
          </Suspense>
        );
      case "amc":
        return (
          <Suspense fallback={<ContentLoader />}>
            <MyAMCPage />
          </Suspense>
        );
      case "profile":
      default:
        return (
          <Suspense fallback={<ContentLoader />}>
            <ProfileForm />
          </Suspense>
        );
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="bg-[#F4F4F4]">
      <div className="">
        <div className="mb-10 sm:mb-8 md:mb-8">
          <AccountBanner />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 lg:px-10">
          <div className="flex flex-col xl:flex-row gap-x-15">
            <div className="w-full xl:w-72 shrink-0">
              <AccountSidebar
                activeView={activeView}
                setActiveView={handleChangeView}
              />
            </div>

            <div className="flex-1 w-full">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;