import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RouterProvider router={routes} />;
      <ToastContainer theme="colored" position="top-center" />
    </>
  );
}

export default App;
