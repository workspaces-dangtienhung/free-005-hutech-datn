import intance from "./intance";
import { getServices } from "./ServicesApi";
import { signIn, signUp, checkEmail, forgotPassword } from "./AuthApi";
import {
  getAppointmentByUserId,
  getAppointmentDetail,
  cancelAppointment,
} from "./Appointment";
import { updateSchedule } from "./DoctorApi";
import { getClinics } from "./Clinics";
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
};
