import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";

function App() {
  return (
    <>
      <RouterProvider router={AppRoutes} />
    </>
  );
}

export default App;
