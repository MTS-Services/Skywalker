// import { Outlet, useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import Footer from "./layouts/Footer";
// import Header from "./layouts/Header";
// import ScrollToTop from "./components/ScrollToTop";
// import SearchPageHeader from "./layouts/SearchPageHeader";

// function MainLayout() {
//   const location = useLocation();
//   return (
//     <>
//       <ScrollToTop />
//       <header className="sticky top-0 left-0 z-30 w-full">
//         {location.pathname === '/search' ? (
//           <SearchPageHeader />
//         ) : (
//           <Header />
//         )}
//       </header>

//       <main>
//         <Outlet />
//       </main>

//       <footer>
//         <Footer />
//       </footer>

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={true}
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="colored"
//       />
//     </>
//   );
// }

// export default MainLayout;

import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// UPDATED: Import useState and useEffect

import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import ScrollToTop from "./components/ScrollToTop";
import SearchPageHeader from "./layouts/SearchPageHeader";
// UPDATED: Import our new controller
import { useEffect, useState } from "react";
import FabController from "./pages/fab/FabController";
import { useLanguage } from "./context/LanguageContext";

function MainLayout() {
  const location = useLocation();
  const { setFloatingActionButton, FloatingActionButton } = useLanguage();

  // UPDATED: This logic detects if the user is on a mobile-sized screen
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= 768;

  return (
    <>
      <ScrollToTop />
      <header className="sticky top-0 left-0 z-30 w-full">
        {location.pathname === "/search" ? <SearchPageHeader /> : <Header />}
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>

      {/* If the screen is mobile-sized, it will render our FabController system */}
      {isMobile && !FloatingActionButton && <FabController />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default MainLayout;
