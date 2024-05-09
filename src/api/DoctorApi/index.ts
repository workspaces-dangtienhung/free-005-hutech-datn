import intance from "../intance";

export const getAllDoctors = async () => {
  return await intance.get("/api/Doctors");
};

export const updateSchedule = async (id: string | number, schedule: string) => {
  return await intance.put(`/api/Doctors/update/Schedule/${id}`, { schedule });
};

export const getDoctorDetail = async (id: string | number) => {
  return await intance.get(`/api/Doctors/${id}`);
};
