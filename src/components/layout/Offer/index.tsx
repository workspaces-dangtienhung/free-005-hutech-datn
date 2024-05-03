import React from "react";
import { Link } from "react-router-dom";
import { APPOINTMENT } from "../../../constants/route";

type Props = {};

const Offer = (props: Props) => {
  return (
    <div
      className="container-fluid bg-offer my-5 py-5 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7 wow zoomIn" data-wow-delay="0.6s">
            <div className="offer-text text-center rounded p-5">
              <h1 className="display-5 text-white">
                Tiết Kiệm 30% Khi Khám Răng Lần Đầu
              </h1>
              <p className="text-white mb-4" />
              <Link to={APPOINTMENT} className="btn btn-dark py-3 px-5 me-3">
                Đặt Lịch Ngay
              </Link>
              <a href="" className="btn btn-light py-3 px-5">
                Xem Thêm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
