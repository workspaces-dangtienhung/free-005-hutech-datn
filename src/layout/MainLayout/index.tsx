import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout";

type Props = {};

const MainLayout = (props: Props) => {
  return (
    <div>
      <Header />
      <p>Main layout</p>
      <Outlet />
    </div>
  );
};

export default MainLayout;
