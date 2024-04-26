import { Hero } from "../../components/layout";
import { CONTACT } from "../../constants/route";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div>
      <Hero currenPage={{ title: "Liên hệ", link: CONTACT }} />
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-xl-4 col-lg-6 wow slideInUp"
              data-wow-delay="0.1s"
            >
              <div className="bg-light rounded h-100 p-5">
                <div className="section-title">
                  <h5 className="position-relative d-inline-block text-primary text-uppercase">
                    Liên Hệ
                  </h5>
                  <h1 className="display-6 mb-4">Liên Lạc Nếu Bạn Cần</h1>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-geo-alt fs-1 text-primary me-3" />
                  <div className="text-start">
                    <h5 className="mb-0">Văn Phòng Của Chúng Tôi</h5>
                    <span>123 Hai Bà Trưng, Quận 1, TP.HCM</span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-envelope-open fs-1 text-primary me-3" />
                  <div className="text-start">
                    <h5 className="mb-0">Email Us</h5>
                    <span>info@gmail.com</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-phone-vibrate fs-1 text-primary me-3" />
                  <div className="text-start">
                    <h5 className="mb-0">Call Us</h5>
                    <span>+84 12 345 6789</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 wow slideInUp"
              data-wow-delay="0.3s"
            >
              <form>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0 bg-light px-4"
                      placeholder="Họ Và Tên"
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control border-0 bg-light px-4"
                      placeholder="Email"
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0 bg-light px-4"
                      placeholder="Tiêu Đề"
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control border-0 bg-light px-4 py-3"
                      rows={5}
                      placeholder="Nội Dung"
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Gửi Yêu Cầu
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

export default Contact;
