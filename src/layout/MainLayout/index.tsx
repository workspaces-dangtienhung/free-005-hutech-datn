import { Outlet } from "react-router-dom";
import { Footer, NavBar, Newsletter, TopBar } from "../../components/layout";

type Props = {};

const MainLayout = (props: Props) => {
  return (
    <div>
      <TopBar />
      <NavBar />
      <Outlet />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default MainLayout;
