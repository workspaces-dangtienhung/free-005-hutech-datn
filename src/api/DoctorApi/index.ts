import intance from "../intance";

export const getAllDoctors = async () => {
  return await intance.get("/api/Doctors");
};
