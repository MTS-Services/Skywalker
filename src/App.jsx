import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";
import { SiAuth0 } from "react-icons/si";
import AuthProvider from "./context/AuthContext/AuthProvider";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <>
      <LanguageProvider>
        <AuthProvider>

          <RouterProvider router={AppRoutes} />
        </AuthProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
