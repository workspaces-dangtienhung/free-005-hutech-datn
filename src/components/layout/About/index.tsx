import React from "react";
import { Link } from "react-router-dom";
import { APPOINTMENT } from "../../../constants/route";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Về Chúng Tôi
              </h5>
              <h1 className="display-5 mb-0">
                Phòng Khám Nha Khoa Tốt Nhất Thế Giới Mà Bạn Có Thể Tin Tưởng
              </h1>
            </div>
            <h4 className="text-body fst-italic mb-4">
              Phòng khám DentCare TP.HCM tiền thân là Trạm Răng Hàm Mặt trực
              thuộc Sở Y Tế, được Sở Y Tế TP.HCM ra quyết định thành lập năm
              1976.
            </h4>
            <p className="mb-4">
              Bệnh viện sở hữu hệ thống cơ sở vật chất, trang thiết bị hiện đại,
              nội thất các Khoa – Phòng luôn được chỉnh trang. Đẩy mạnh hoạt
              động khoa học kỹ thuật, hợp tác quốc tế. Đội ngũ Y Bác sĩ chuyên
              môn cao, liên tục trau dồi, áp dụng khoa học, kỹ thuật tiên tiến
              trong điều trị, đem lại uy tín cho Bệnh Viện và niềm tin yêu của
              bệnh nhân.
            </p>
            <div className="row g-3">
              <div className="col-sm-6 wow zoomIn" data-wow-delay="0.3s">
                <h5 className="mb-3">
                  <i className="fa fa-check-circle text-primary me-3" />
                  Top 1 Bệnh Viện Răng Hàm
                </h5>
                <h5 className="mb-3">
                  <i className="fa fa-check-circle text-primary me-3" />
                  Nhân Viên Chuyên Nghiệp
                </h5>
              </div>
              <div className="col-sm-6 wow zoomIn" data-wow-delay="0.6s">
                <h5 className="mb-3">
                  <i className="fa fa-check-circle text-primary me-3" />
                  Mở Cửa 24/7
                </h5>
                <h5 className="mb-3">
                  <i className="fa fa-check-circle text-primary me-3" />
                  Giá Cả Hợp Lí
                </h5>
              </div>
            </div>
            <Link
              to={APPOINTMENT}
              className="btn btn-primary py-3 px-5 mt-4 wow zoomIn"
              data-wow-delay="0.6s"
            >
              Đặt Lịch Ngay
            </Link>
          </div>
          <div className="col-lg-5" style={{ minHeight: 500 }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100 rounded wow zoomIn"
                data-wow-delay="0.9s"
                src="img/about.jpg"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
