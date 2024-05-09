import intance from "./intance";
import { getServices } from "./ServicesApi";
import { signIn, signUp, checkEmail, forgotPassword } from "./AuthApi";
import {
  getAppointmentByUserId,
  getAppointmentDetail,
  cancelAppointment,
  vnPayApointment,
  updateAppointment,
} from "./Appointment";
import { updateSchedule, getDoctorDetail } from "./DoctorApi";
import { getClinics } from "./Clinics";
import { getSpecialty } from "./Specialty";
export {
  intance,
  getServices,
  signIn,
  signUp,
  getAppointmentByUserId,
  getAppointmentDetail,
  cancelAppointment,
  checkEmail,
  forgotPassword,
  updateSchedule,
  getClinics,
  getDoctorDetail,
  getSpecialty,
  vnPayApointment,
  updateAppointment,
};
