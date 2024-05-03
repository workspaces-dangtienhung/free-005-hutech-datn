import { Link } from "react-router-dom";
import { SIGNIN } from "../../constants/route";
import "./signup.css";
type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="col-xl-10 col-lg-11 mx-auto login-container">
          <div className="row">
            <div className="col-lg-5 col-md-6 no-padding">
              <div className="login-box">
                <h5>Đăng ký tài khoản</h5>
                <div className="login-row row no-margin">
                  <label htmlFor="">
                    <i className="fas fa-user" /> Họ và tên
                  </label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
                <div className="login-row row no-margin">
                  <label htmlFor="">
                    <i className="fas fa-phone" /> Số điện thoại
                  </label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
                <div className="login-row row no-margin">
                  <label htmlFor="">
                    <i className="fas fa-envelope" /> Email
                  </label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
                <div className="login-row row no-margin">
                  <label htmlFor="">
                    <i className="fas fa-unlock-alt" /> Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="login-row btnroo row no-margin">
                  <button className="btn btn-primary btn-sm py-2">
                    Đăng ký
                  </button>
                </div>
                <div className="login-row donroo row no-margin">
                  <p>
                    Đã có tài khoản ? <Link to={SIGNIN}>Đăng nhập</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 img-box">
              <img src="./img/sideimg.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
