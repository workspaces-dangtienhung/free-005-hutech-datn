import { createBrowserRouter } from "react-router-dom";
import { AboutPage, Contact, Home, ServicePage } from "./pages";
import MainLayout from "./layout/MainLayout";
import {
  ABOUT,
  APPOINTMENT,
  CONTACT,
  HOME,
  PRICE,
  SERVICE,
  TEAM,
  TESTIMONIAL,
} from "./constants/route";
import TeamPage from "./pages/TeamPage";
import PricePage from "./pages/PricePage";
import TestimonialPage from "./pages/TestimonialPage";
import AppointmentPage from "./pages/AppointmentPage";
const routes = createBrowserRouter([
  {
    path: HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ABOUT,
        element: <AboutPage />,
      },
      {
        path: CONTACT,
        element: <Contact />,
      },
      {
        path: SERVICE,
        element: <ServicePage />,
      },
      {
        path: TEAM,
        element: <TeamPage />,
      },
      {
        path: PRICE,
        element: <PricePage />,
      },
      {
        path: TESTIMONIAL,
        element: <TestimonialPage />,
      },
      {
        path: APPOINTMENT,
        element: <AppointmentPage />,
      },
    ],
  },
]);

export default routes;
