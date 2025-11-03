import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
// Lazy load page components for code splitting
const Homepage = React.lazy(() => import("./pages/Homepage"));
const VehicleAmc = React.lazy(() => import("./pages/VehicleAmc"));
const MyAccount = React.lazy(() => import("./pages/MyAccount"));
const VehicleAmcFilter = React.lazy(() => import("./pages/VehicleAmcFilter"));
// Loading fallback component
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
              </Route>
              {/* MyAccount has its own layout */}
              <Route path="/my-account" element={<MyAccount />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
export default App;
