import intance from "../intance";

export const getAppointmentByUserId = async (userId: number | string) => {
  return await intance.get(`/api/Appointments/${userId}/bookings`);
};
export const getAppointmentDetail = async (id: number | string) => {
  return await intance.get(`/api/Appointments/${id}`);
};
export const cancelAppointment = async (id: number | string) => {
  return await intance.post(`/api/Appointments/update/${id}`, {
    status: "canceled",
  });
};
export const createAppointment = async (data: any) => {
  return await intance.post(`/api/Appointments/${data.userID}`, data);
};
