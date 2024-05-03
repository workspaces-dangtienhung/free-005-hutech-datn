import React from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { APPOINTMENT } from "../../../constants/route";
type Props = {};

const Pricing = (props: Props) => {
  const options = {
    autoplay: true,
    smartSpeed: 1500,
    margin: 45,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  };
  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Chuyên Khoa
              </h5>
              <h1 className="display-5 mb-0">
                Chúng tôi đưa ra mức giá hợp lý cho việc điều trị nha khoa
              </h1>
            </div>
            <p className="mb-4" />
            <h5
              className="text-uppercase text-primary wow fadeInUp"
              data-wow-delay="0.3s"
            >
              Gọi Để Đặt Lịch
            </h5>
            <h1 className="wow fadeInUp" data-wow-delay="0.6s">
              +84 12 345 6789
            </h1>
          </div>
          <div className="col-lg-7">
            <OwlCarousel
              {...options}
              className="owl-carousel price-carousel wow zoomIn owl-loaded owl-drag"
              data-wow-delay="0.9s"
            >
              <div className="price-item pb-4">
                <div className="position-relative">
                  <img
                    className="img-fluid rounded-top"
                    src="img/price-1.jpg"
                    alt=""
                  />
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle"
                    style={{ zIndex: 2 }}
                  >
                    <h2 className="text-primary m-0">$35</h2>
                  </div>
                </div>
                <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                  <h4>Tẩy Trắng Răng</h4>
                  <hr className="text-primary w-50 mx-auto mt-0" />
                  <div className="d-flex justify-content-between mb-3">
                    <span>Thiết bị hiện đại</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Nha sĩ chuyên nghiệp</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Hỗ trợ cuộc gọi 24/7</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <Link
                    to={APPOINTMENT}
                    className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle"
                  >
                    Đặt Lịch
                  </Link>
                </div>
              </div>
              <div className="price-item pb-4">
                <div className="position-relative">
                  <img
                    className="img-fluid rounded-top"
                    src="img/price-2.jpg"
                    alt=""
                  />
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle"
                    style={{ zIndex: 2 }}
                  >
                    <h2 className="text-primary m-0">$49</h2>
                  </div>
                </div>
                <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                  <h4>Cấy Ghép Nha Khoa</h4>
                  <hr className="text-primary w-50 mx-auto mt-0" />
                  <div className="d-flex justify-content-between mb-3">
                    <span>Thiết bị hiện đại</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Nha sĩ chuyên nghiệp</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Hỗ trợ cuộc gọi 24/7</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <Link
                    to={APPOINTMENT}
                    className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle"
                  >
                    Đặt Lịch
                  </Link>
                </div>
              </div>
              <div className="price-item pb-4">
                <div className="position-relative">
                  <img
                    className="img-fluid rounded-top"
                    src="img/price-3.jpg"
                    alt=""
                  />
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle"
                    style={{ zIndex: 2 }}
                  >
                    <h2 className="text-primary m-0">$99</h2>
                  </div>
                </div>
                <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                  <h4>Nội Nha Chữa Tủy</h4>
                  <hr className="text-primary w-50 mx-auto mt-0" />
                  <div className="d-flex justify-content-between mb-3">
                    <span>Thiết bị hiện đại</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Nha sĩ chuyên nghiệp</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Hỗ trợ cuộc gọi 24/7</span>
                    <i className="fa fa-check text-primary pt-1" />
                  </div>
                  <Link
                    to={APPOINTMENT}
                    className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle"
                  >
                    Đặt Lịch
                  </Link>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
