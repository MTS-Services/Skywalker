import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";
import { SiAuth0 } from "react-icons/si";
import AuthProvider from "./context/AuthContext/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
     
        <RouterProvider router={AppRoutes} />
      </AuthProvider>
    </>
  );
}

export default App;
