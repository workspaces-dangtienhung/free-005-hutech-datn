import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-toastify/dist/ReactToastify.css";
import { ConfigProvider } from "antd";
import vi_VN from "antd/lib/locale/vi_VN";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ConfigProvider locale={vi_VN}>
      <RouterProvider router={routes} />
      <ToastContainer
        // theme="colored"
        position="top-center"
        autoClose={3000}
        hideProgressBar
      />
    </ConfigProvider>
  );
}

export default App;
