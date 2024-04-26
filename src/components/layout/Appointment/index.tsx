import React from "react";

type Props = {};

const Appointment = (props: Props) => {
  return (
    <div
      className="container-fluid bg-primary bg-appointment my-5 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6 py-5">
            <div className="py-5">
              <h1 className="display-5 text-white mb-4">
                Chúng tôi là phòng khám nha khoa được chứng nhận và giành giải
                thưởng mà bạn có thể tin tưởng
              </h1>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn"
              data-wow-delay="0.6s"
            >
              <h1 className="text-white mb-4">Đặt Lịch</h1>
              <form>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <select
                      className="form-select bg-light border-0"
                      style={{ height: 55 }}
                    >
                      <option selected>Chọn loại dịch vụ</option>
                      <option value={1}>Dịch Vụ 1</option>
                      <option value={2}>Dịch Vụ 2</option>
                      <option value={3}>Dịch Vụ 3</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-6">
                    <select
                      className="form-select bg-light border-0"
                      style={{ height: 55 }}
                    >
                      <option selected>Chọn Nha Sĩ</option>
                      <option value={1}>Nha Sĩ 1</option>
                      <option value={2}>Nha Sĩ 2</option>
                      <option value={3}>Nha Sĩ 3</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      placeholder="Họ và Tên"
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="email"
                      className="form-control bg-light border-0"
                      placeholder="Email"
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <div
                      className="date"
                      id="date1"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control bg-light border-0 datetimepicker-input"
                        placeholder="Ngày Đặt Lịch"
                        data-target="#date1"
                        data-toggle="datetimepicker"
                        style={{ height: 55 }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div
                      className="time"
                      id="time1"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control bg-light border-0 datetimepicker-input"
                        placeholder="Thời Gian Khám"
                        data-target="#time1"
                        data-toggle="datetimepicker"
                        style={{ height: 55 }}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-dark w-100 py-3" type="submit">
                      Đặt Lịch{" "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
