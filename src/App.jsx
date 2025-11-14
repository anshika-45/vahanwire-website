import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AmcDataProvider } from "./context/AmcDataContext.jsx";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import "./api/axiosInstance.js";

const Homepage = React.lazy(() => import("./pages/Homepage"));
const VehicleAmc = React.lazy(() => import("./pages/VehicleAmc"));
const MyAccount = React.lazy(() => import("./pages/MyAccount"));
const VehicleAmcFilter = React.lazy(() => import("./pages/VehicleAmcFilter"));
const PaymentStatus = React.lazy(() => import("./components/PaymentStatus"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const TermsCondition = React.lazy(() => import("./pages/TermsCondition"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const PetrolPump = React.lazy(() => import("./pages/PetrolPump"));
// const Mechanic = React.lazy(() => import("./pages/Mechanic"));
const Ecommerce = React.lazy(() => import("./pages/ECommerce"));
const TowTruck = React.lazy(() => import("./pages/TowTruck"));
const ServiceCenter = React.lazy(() => import("./pages/ServiceCenter"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#266DDF]"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AmcDataProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/vehicle-amc" element={<VehicleAmc />} />
                  <Route path="/vehicle-amc-filter" element={<VehicleAmcFilter />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/terms-condition" element={<TermsCondition />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/petrol-pump" element={<PetrolPump />} />
                  {/* <Route path="/" element={<Mechanic />} /> */}
                  <Route path="/e-commerce" element={<Ecommerce />} />
                  <Route path="/tow-truck" element={<TowTruck />} />
                  <Route path="/service-center" element={<ServiceCenter />} />
                  <Route 
                    path="/my-account" 
                    element={
                      <ProtectedRoute>
                        <MyAccount />
                      </ProtectedRoute>
                    } 
                  />
                </Route>
               
                <Route 
                  path="/payment-status" 
                  element={
                    <ProtectedRoute>
                      <PaymentStatus />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AmcDataProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;