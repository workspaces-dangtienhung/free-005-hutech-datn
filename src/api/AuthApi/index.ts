import {
  ChangePasswordForm,
  SignInForm,
  SignUpForm,
} from "../../schemas/schemas";
import intance from "../intance";

export const signIn = async (data: SignInForm) => {
  return await intance.post("/api/Auth/Login", data);
};

export const signUp = async (data: SignUpForm) => {
  return await intance.post("/api/User", data);
};

export const changePassword = async (data: any) => {
  return await intance.post(`/api/User/update/password/${data.idUser}`, {
    passWord: data.newPassword,
  });
};

export const checkEmail = async (email: string) => {
  return await intance.post("/api/User/checkMail/user", { email });
};

export const forgotPassword = async (data: string) => {
  return await intance.post("/api/User/forgot/password", data);
};
