import React from "react";
import OwlCarousel from "react-owl-carousel";
type Props = {};

const Testimonial = (props: Props) => {
  const options = {
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  };

  return (
    <div
      className="container-fluid bg-primary bg-testimonial py-5 my-5 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <OwlCarousel
              {...options}
              className="owl-carousel testimonial-carousel rounded p-5 wow zoomIn  owl-loaded owl-drag"
              data-wow-delay="0.6s"
            >
              <div className="testimonial-item text-center text-white">
                <img
                  className="img-fluid mx-auto rounded mb-4"
                  src="img/testimonial-1.jpg"
                  alt=""
                />
                <p className="fs-5">
                  Sau khi niềng răng, mình lấy lại nụ cười tự tin, chủ động hơn
                  và công việc thăng tiến hơn
                </p>
                <hr className="mx-auto w-25" />
                <h4 className="text-white mb-0">Thu Thảo</h4>
              </div>
              <div className="testimonial-item text-center text-white">
                <img
                  className="img-fluid mx-auto rounded mb-4"
                  src="img/testimonial-2.jpg"
                  alt=""
                />
                <p className="fs-5">
                  Suốt 3 năm niềng, mình vẫn ăn uống thoải mái, thấy trendy và
                  xinh xắn hơn.
                </p>
                <hr className="mx-auto w-25" />
                <h4 className="text-white mb-0">Ngọc My</h4>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
