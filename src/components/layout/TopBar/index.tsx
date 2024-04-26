const TopBar = () => {
  return (
    <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
      <div className="row gx-0">
        <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
          <div className="d-inline-flex align-items-center">
            <small className="py-2">
              <i className="far fa-clock text-primary me-2"></i>Thời gian mở
              cửa: Thứ 2 - Thứ 7 : 8.00 am - 9.00 pm, Chủ nhật: 8.00 am - 5.00
              pm{" "}
            </small>
          </div>
        </div>
        <div className="col-md-6 text-center text-lg-end">
          <div className="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
            <div className="me-3 pe-3 border-end py-2">
              <p className="m-0">
                <i className="fa fa-envelope-open me-2"></i>info@gmail.com
              </p>
            </div>
            <div className="py-2">
              <p className="m-0">
                <i className="fa fa-phone-alt me-2"></i>+84 12 345 6789
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
