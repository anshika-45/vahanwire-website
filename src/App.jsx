import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
const Homepage = React.lazy(() => import("./pages/Homepage"));
const VehicleAmc = React.lazy(() => import("./pages/VehicleAmc"));
const MyAccount = React.lazy(() => import("./pages/MyAccount"));
const VehicleAmcFilter = React.lazy(() => import("./pages/VehicleAmcFilter"));
const PaymentStatus = React.lazy(() => import("./components/PaymentStatus"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const TermsCondition = React.lazy(() => import("./pages/TermsCondition"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#266DDF]"></div>
  </div>
);
function App() {
  
  return (
   
    <ErrorBoundary>
      <AuthProvider>
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
              </Route>
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/payment-status" element={<PaymentStatus />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
export default App;
