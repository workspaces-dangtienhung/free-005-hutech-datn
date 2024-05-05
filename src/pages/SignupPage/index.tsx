import { Link, useNavigate } from "react-router-dom";
import { SIGNIN } from "../../constants/route";
import { useForm } from "react-hook-form";
import "./signup.css";
import { SignUpForm, signUpSchema } from "../../schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signUp } from "../../api";
type Props = {};

const SignUpPage = (props: Props) => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpForm>({
    mode: "onChange",
    resolver: yupResolver(signUpSchema),
  });

  const onHandleSignUp = async (values: SignUpForm) => {
    try {
      await signUp(values);
      toast.success("Đăng ký tài khoản thành công!");
      navigate(SIGNIN);
    } catch (error) {
      toast.error("Có lỗi xảy ra! Vui lòng thử lại sau.");
    }
  };
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
                  <input
                    {...register("userName")}
                    type="text"
                    className="form-control form-control-sm"
                  />
                  {errors.userName && (
                    <span
                      className="text-danger"
                      style={{
                        marginTop: "-15px",
                      }}
                    >
                      {errors.userName.message}
                    </span>
                  )}
                </div>
                <div className="login-row row no-margin">
                  <label htmlFor="">
                    <i className="fas fa-phone" /> Số điện thoại
                  </label>
                  <input
                    {...register("phone")}
                    type="number"
                    className="form-control form-control-sm"
                  />
                  {errors.phone && (
                    <span
                      className="text-danger"
                      style={{
                        marginTop: "-15px",
                      }}
                    >
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <div className="login-row row no-margin">
                  <label htmlFor="">
                    <i className="fas fa-envelope" /> Email
                  </label>
                  <input
                    {...register("email")}
                    type="text"
                    className="form-control form-control-sm"
                  />
                  {errors.email && (
                    <span
                      className="text-danger"
                      style={{
                        marginTop: "-15px",
                      }}
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="login-row row no-margin">
                  <label htmlFor="">
                    <i className="fas fa-unlock-alt" /> Mật khẩu
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    className="form-control form-control-sm"
                  />
                  {errors.password && (
                    <span
                      className="text-danger"
                      style={{
                        marginTop: "-15px",
                      }}
                    >
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="login-row btnroo row no-margin">
                  <button
                    className="btn btn-primary btn-sm py-2"
                    onClick={handleSubmit(onHandleSignUp)}
                  >
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
