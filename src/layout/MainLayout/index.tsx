import { Outlet, useNavigate } from "react-router-dom";
import { Footer, NavBar, Newsletter, TopBar } from "../../components/layout";
import { getLocalStorage } from "../../utils";
import { useEffect } from "react";

type Props = {};

const MainLayout = (props: Props) => {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  useEffect(() => {
    if (user && user.user.roleId !== 3) {
      navigate("/doctor/dashboard");
    }
  }, []);

  return (
    <>
      <TopBar />
      <NavBar />
      <Outlet />
      <Newsletter />
      <Footer />
    </>
  );
};

export default MainLayout;
