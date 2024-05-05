import { createBrowserRouter } from "react-router-dom";
import {
  AboutPage,
  ChangePassword,
  Contact,
  Home,
  MangeAppointment,
  MedicalRecord,
  ServicePage,
  SignInPage,
  SignUpPage,
} from "./pages";
import MainLayout from "./layout/MainLayout";
import {
  ABOUT,
  APPOINTMENT,
  CONTACT,
  HOME,
  PRICE,
  SERVICE,
  SIGNIN,
  SIGNUP,
  TEAM,
  TESTIMONIAL,
} from "./constants/route";
import TeamPage from "./pages/TeamPage";
import PricePage from "./pages/PricePage";
import TestimonialPage from "./pages/TestimonialPage";
import AppointmentPage from "./pages/AppointmentPage";
import DoctorLayout from "./layout/DoctorLayout";
import AccountLayout from "./layout/AccountLayout";
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
  {
    path: SIGNIN,
    element: <SignInPage />,
  },
  {
    path: SIGNUP,
    element: <SignUpPage />,
  },
  { path: "change-password", element: <ChangePassword /> },
  {
    path: "account",
    element: <AccountLayout />,
  },
  {
    path: "/staff",
    element: <DoctorLayout />,
    children: [
      {
        index: true,
        path: "/staff/dashboard",
        element: <MangeAppointment />,
      },
      {
        path: "/staff/medical-record",
        element: <MedicalRecord />,
      },
    ],
  },
]);

export default routes;
