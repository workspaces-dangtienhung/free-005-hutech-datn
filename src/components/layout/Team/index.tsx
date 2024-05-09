import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APPOINTMENT } from "../../../constants/route";
import { IDoctor } from "../../../types/doctor.type";
import { toast } from "react-toastify";
import { getAllDoctors } from "../../../api/DoctorApi";

type Props = {};

const Team = (props: Props) => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllDoctors();
        // console.log(data, "doctor");
        setDoctors(data);
      } catch (error) {
        toast.error("Lỗi lấy dữ liệu bác sĩ");
      }
    })();
  }, []);
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
            <div className="section-title bg-light rounded h-100 p-5">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Nha sĩ
              </h5>
              <h1 className="display-6 mb-4">
                Gặp Gỡ Các Chuyên Gia Của Chúng Tôi
              </h1>
              <Link to={APPOINTMENT} className="btn btn-primary py-3 px-5">
                Đặt lịch
              </Link>
            </div>
          </div>
          {doctors &&
            doctors.length > 0 &&
            doctors?.map((doctor, index) => (
              <div
                key={index}
                className="col-lg-4 wow slideInUp"
                data-wow-delay={`${0.3 + index * 0.3}s`}
              >
                <div className="team-item">
                  <div
                    className="position-relative rounded-top"
                    style={{ zIndex: 1 }}
                  >
                    <img
                      className="img-fluid rounded-top w-100"
                      src={`img/team-${index + 1 > 5 ? 1 : index + 1}.jpg`}
                      alt=""
                    />
                    <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                      <a className="btn btn-primary btn-square m-1" href="#">
                        <i className="fab fa-twitter fw-normal" />
                      </a>
                      <a className="btn btn-primary btn-square m-1" href="#">
                        <i className="fab fa-facebook-f fw-normal" />
                      </a>
                      <a className="btn btn-primary btn-square m-1" href="#">
                        <i className="fab fa-linkedin-in fw-normal" />
                      </a>
                      <a className="btn btn-primary btn-square m-1" href="#">
                        <i className="fab fa-instagram fw-normal" />
                      </a>
                    </div>
                  </div>
                  <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                    <h4 className="mb-2">{doctor.doctorName}</h4>
                    <p className="text-primary mb-0" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
