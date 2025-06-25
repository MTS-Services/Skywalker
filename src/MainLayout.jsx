import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import ScrollToTop from "./components/ScrollToTop";
import SearchPageHeader from "./layouts/SearchPageHeader";

function MainLayout() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <header>
        {location.pathname === '/search' ? (
          <SearchPageHeader />
        ) : (
          <Header />
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>

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
