import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="container-fluid banner mb-5">
      <div className="container">
        <div className="row gx-0">
          <div className="col-lg-4 wow zoomIn" data-wow-delay="0.1s">
            <div
              className="bg-primary d-flex flex-column p-5"
              style={{ height: 300 }}
            >
              <h3 className="text-white mb-3">Thời Gian Mở Cửa</h3>
              <div className="d-flex justify-content-between text-white mb-3">
                <h6 className="text-white mb-0">Thứ 2 - Thứ 7</h6>
                <p className="mb-0"> 8:00am - 9:00pm</p>
              </div>
              <div className="d-flex justify-content-between text-white mb-3">
                <h6 className="text-white mb-0">Chủ Nhật</h6>
                <p className="mb-0"> 8:00am - 5:00pm</p>
              </div>
              <a className="btn btn-light" href="">
                Đặt Lịch
              </a>
            </div>
          </div>
          <div className="col-lg-4 wow zoomIn" data-wow-delay="0.3s">
            <div
              className="bg-dark d-flex flex-column p-5"
              style={{ height: 300 }}
            >
              <h3 className="text-white mb-3">Tìm Kiếm Bác Sĩ</h3>
              <div className="date mb-3" id="date" data-target-input="nearest">
                <input
                  type="text"
                  className="form-control bg-light border-0 datetimepicker-input"
                  placeholder="Ngày khám"
                  data-target="#date"
                  data-toggle="datetimepicker"
                  style={{ height: 40 }}
                />
              </div>
              <select
                className="form-select bg-light border-0 mb-3"
                style={{ height: 40 }}
              >
                <option selected>Chọn Loại Dịch Vụ</option>
                <option value={1}>Dịch Vụ 1</option>
                <option value={2}>Dịch Vụ 2</option>
                <option value={3}>Dịch Vụ 3</option>
              </select>
              <a className="btn btn-light" href="">
                Tìm Bác Sĩ
              </a>
            </div>
          </div>
          <div className="col-lg-4 wow zoomIn" data-wow-delay="0.6s">
            <div
              className="bg-secondary d-flex flex-column p-5"
              style={{ height: 300 }}
            >
              <h3 className="text-white mb-3">Đặt Lịch Hẹn</h3>
              <p className="text-white">
                Hãy liên hệ với chúng tôi qua số điện thoại sau để đặt lịch .
              </p>
              <h2 className="text-white mb-0">+84 12 345 6789</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
