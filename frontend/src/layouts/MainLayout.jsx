import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify"; // ✅ Added
import "react-toastify/dist/ReactToastify.css"; // ✅ Added CSS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const MainLayout = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      const frameId = requestAnimationFrame(() => {
        setIsNavigating(true);
      });

      const timer = setTimeout(() => {
        setIsNavigating(false);
        setDisplayLocation(location);
      }, 1000); // 💡 Suggestion: Reduced to 1s, 5s might feel slow to users!

      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(timer);
      };
    }
  }, [location, displayLocation.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ ToastContainer placed here so it's always available globally */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Navbar />
      <main className="flex-grow">
        {isNavigating ? (
          <Loading />
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;