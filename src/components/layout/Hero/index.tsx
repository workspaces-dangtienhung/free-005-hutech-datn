import React from "react";
import { Link } from "react-router-dom";
import { HOME } from "../../../constants/route";
type Props = {
  currenPage: {
    title: string;
    link: string;
  };
};

const Hero = ({ currenPage }: Props) => {
  return (
    <div className="container-fluid bg-primary py-5 hero-header mb-5">
      <div className="row py-3">
        <div className="col-12 text-center">
          <h1 className="display-3 text-white animated zoomIn">Về Chúng Tôi</h1>
          <Link to={HOME} className="h4 text-white">
            Trang Chủ
          </Link>
          <i className="far fa-circle text-white px-2" />
          <Link to={currenPage.link} className="h4 text-white">
            {currenPage.title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
