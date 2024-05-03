import { Link, useNavigate } from "react-router-dom";
import { HOME, SIGNUP } from "../../constants/route";
import { useForm } from "react-hook-form";
import { SignInForm, signInSchema } from "../../schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "../../api";
import { toast } from "react-toastify";
import "./signin.css";
import { setLocalStorage } from "../../utils";
import React from "react";
import Spinner from "../../components/common/Spinner";
type Props = {};

const SignInPage = () => {
  const [isLoadding, setIsLoadding] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: "onChange",
    resolver: yupResolver(signInSchema),
  });

  const onHandleSubmit = async (values: SignInForm) => {
    try {
      setIsLoadding(true);
      const { data } = await signIn(values);
      // data.user.password = undefined;
      const newUser = data;
      setLocalStorage("user", newUser);
      setIsLoadding(false);
      toast.success("Đăng nhập thành công!");
      navigate(HOME);
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra! Vui lòng thử lại sau.");
    }
  };
  return (
    <div className="container-fluid">
      <div className="container">
        {isLoadding && <Spinner />}
        <div className="col-xl-10 col-lg-11 mx-auto login-container">
          <div className="row">
            <div className="col-lg-5 col-md-6 no-padding">
              <div className="login-box">
                <h5>Đăng nhập tài khoản</h5>
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
                <div className="login-row row no-margin mb-3">
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
                <div className="login-row row forrr no-margin">
                  <p className="mt-4">
                    <a className="vgh" href="">
                      Quên mật khẩu?
                    </a>
                  </p>
                </div>
                <div className="login-row btnroo row no-margin">
                  <button
                    className="btn btn-primary btn-sm py-2"
                    onClick={handleSubmit(onHandleSubmit)}
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className="login-row donroo row no-margin">
                  <p>
                    Chưa có tài khoản ? <Link to={SIGNUP}>Đăng ký</Link>
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

export default SignInPage;
