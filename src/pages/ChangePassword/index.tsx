import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ChangePasswordForm,
  changePasswordSchema,
} from "../../schemas/schemas";
import { toast } from "react-toastify";
import { getLocalStorage } from "../../utils";
import { changePassword } from "../../api/AuthApi";
import Spinner from "../../components/common/Spinner";
import { useNavigate } from "react-router-dom";
import { removeLocalStorage } from "../../utils/localStorage";
import { SIGNIN } from "../../constants/route";
import "./changePass.css";
type Props = {};

const ChangePassword = (props: Props) => {
  const navigate = useNavigate();
  const [isLoadding, setIsLoadding] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
    mode: "onChange",
  });
  const user = getLocalStorage("user");

  const onHandleChangePass = async (values: ChangePasswordForm) => {
    // console.log(values.currentPassword, "values");

    if (user) {
      // if (user?.user?.password !== values.currentPassword) {
      //   toast.error("Mật khẩu hiện tại không đúng");
      //   return;
      // } else {
      setIsLoadding(true);
      await changePassword({
        idUser: user.user.idUser,
        newPassword: values.newPassword,
      });
      setIsLoadding(false);
      toast.success("Đổi mật khẩu thành công");
      removeLocalStorage("user");
      navigate(SIGNIN);
      // }
      // console.log(values, "values");

      // await changePassword({})
    } else {
      toast.error("Đổi mật khẩu thất bại");
    }

    try {
    } catch (error) {
      console.log(error);

      toast.error("Đổi mật khẩu thất bại");
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
                <h5>Đổi mật khẩu</h5>
                {/* <div className="login-row row no-margin">
                  <label htmlFor="">
                    <i className="fas fa-unlock-alt" /> Mật khẩu hiện tại
                  </label>
                  <input
                    {...register("currentPassword")}
                    type="password"
                    className="form-control form-control-sm"
                  />
                  {errors.currentPassword && (
                    <span
                      className="text-danger"
                      style={{
                        marginTop: "-15px",
                      }}
                    >
                      {errors.currentPassword.message}
                    </span>
                  )}
                </div> */}
                <div className="login-row row no-margin mb-3">
                  <label htmlFor="">
                    <i className="fas fa-unlock-alt" /> Mật khẩu mới
                  </label>
                  <input
                    {...register("newPassword")}
                    type="password"
                    className="form-control form-control-sm"
                  />
                  {errors.newPassword && (
                    <span
                      className="text-danger"
                      style={{
                        marginTop: "-15px",
                      }}
                    >
                      {errors.newPassword.message}
                    </span>
                  )}
                </div>

                <div className="login-row btnroo row no-margin">
                  <button
                    className="btn btn-primary btn-sm py-2"
                    onClick={handleSubmit(onHandleChangePass)}
                  >
                    Xác nhận
                  </button>
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

export default ChangePassword;
