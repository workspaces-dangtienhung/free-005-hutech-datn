import { Link, useNavigate } from "react-router-dom";
import { HOME, SIGNUP } from "../../constants/route";
import { useForm } from "react-hook-form";
import { SignInForm, signInSchema } from "../../schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkEmail, forgotPassword, signIn } from "../../api";
import { toast } from "react-toastify";
import "./signin.css";
import { pause, setLocalStorage } from "../../utils";
import React from "react";
import Spinner from "../../components/common/Spinner";
import { Roles } from "../../types/roles.type";
import { Modal, Form, Input, Button } from "antd";

const SignInPage = () => {
  const [isLoadding, setIsLoadding] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCheckEmail, setIsCheckEmail] = React.useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
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
      if (data?.user?.roleId === Roles.user) {
        navigate(HOME);
      }
      if (data?.user?.roleId === Roles.staff) {
        navigate("/staff/dashboard");
      }
    } catch (error) {
      console.log(error);
      setIsLoadding(false);
      toast.error("Tài khoản hoặc mật khẩu không chính xác.");
    }
  };

  const onFinish = async (values: any) => {
    try {
      setIsLoadding(true);
      if (!isCheckEmail) {
        await checkEmail(values.email);
        await pause(1000);
        setIsLoadding(false);
        toast.success("Thành công.Hãy nhập mật khẩu mới!");
        setIsCheckEmail(true);
        return;
      }
      await forgotPassword(values);
      await pause(1000);
      setIsLoadding(false);
      toast.success("Cập nhật mật khẩu thành công!");
      setIsModalOpen(false);
    } catch (error) {
      setIsCheckEmail(false);
      toast.error("Không tìm thấy email của bạn!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <Modal
          destroyOnClose
          afterClose={() => {
            setIsCheckEmail(false);
            form.resetFields();
          }}
          title={<h5>Quên mật khẩu</h5>}
          centered
          footer={null}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                { required: true, message: "Vui lòng nhập email của bạn!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                type="email"
                // required
                size="large"
                placeholder="Nhập email của bạn"
              />
            </Form.Item>
            {isCheckEmail && (
              <Form.Item
                label={"Mật khẩu mới"}
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                ]}
                name={"passWord"}
              >
                <Input.Password size="large" placeholder="Nhập mật khẩu mới" />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                block
                // onClick={handleCheckEmail}
              >
                {isCheckEmail ? "Xác nhận cập nhật mật khẩu mới" : " Kiểm tra"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
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
                    <span
                      onClick={() => setIsModalOpen(true)}
                      style={{
                        cursor: "pointer",
                      }}
                      className="vgh"
                    >
                      Quên mật khẩu?
                    </span>
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
