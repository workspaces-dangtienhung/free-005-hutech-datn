import { createBrowserRouter } from "react-router-dom";
import { Contact, Home } from "./pages";
import MainLayout from "./layout/MainLayout";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default routes;
