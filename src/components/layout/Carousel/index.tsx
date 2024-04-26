import { Link } from "react-router-dom";
import { APPOINTMENT, CONTACT } from "../../../constants/route";
type Props = {};

const Carousel = (props: Props) => {
  return (
    <div className="container-fluid p-0">
      <div
        id="header-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: 900 }}>
                <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                  Giữ Cho Răng Của Bạn Khỏe Mạnh
                </h5>
                <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                  Hãy Điều Trị Nha Khoa Chất Lượng Tốt Nhất
                </h1>
                <Link
                  to={APPOINTMENT}
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Đặt Lịch
                </Link>
                <Link
                  to={CONTACT}
                  className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                >
                  Liên Hệ Với Chúng Tôi
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: 900 }}>
                <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                  Giữ Cho Răng Của Bạn Khỏe Mạnh
                </h5>
                <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                  Hãy Điều Trị Nha Khoa Chất Lượng Tốt Nhất
                </h1>
                <Link
                  to={APPOINTMENT}
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Đặt Lịch
                </Link>
                <Link
                  to={CONTACT}
                  className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                >
                  Liên Hệ Với Chúng Tôi
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
