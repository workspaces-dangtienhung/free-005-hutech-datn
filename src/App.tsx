import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
