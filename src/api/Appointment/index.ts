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

export const updateAppointment = async (
  id: number | string,
  stattus: string
) => {
  return await intance.post(`/api/Appointments/update/${id}`, {
    status: stattus,
  });
};
export const createAppointment = async (data: any) => {
  return await intance.post(`/api/Appointments/${data.userID}`, data);
};

export const vnPayApointment = async (data: any) => {
  return await intance.post("/api/Payment", data);
};
