import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: Yup.string().required("Mật khẩu không được để trống"),
});

export type SignInForm = Yup.InferType<typeof signInSchema>;

export const signUpSchema = Yup.object({
  userName: Yup.string().required("Tên không được để trống"),
  phone: Yup.string().required("Số điện thoại không được để trống"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: Yup.string()
    .min(6, "Mật khẩu phải từ 6 ký tự!")
    .required("Mật khẩu không được để trống"),
});

export type SignUpForm = Yup.InferType<typeof signUpSchema>;

export const changePasswordSchema = Yup.object({
  idUser: Yup.string(),
  currentPassword: Yup.string().required(
    "Mật khẩu hiện tại không được để trống"
  ),
  newPassword: Yup.string()
    .min(6, "Mật khẩu phải từ 6 ký tự!")
    .required("Mật khẩu mới không được để trống"),
});

export type ChangePasswordForm = Yup.InferType<typeof changePasswordSchema>;
