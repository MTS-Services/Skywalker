import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";

function MainLayout() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className="h-screen">
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
