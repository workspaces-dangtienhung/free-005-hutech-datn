import intance from "../intance";

export const getSpecialty = async () => {
  return await intance.get("/api/Specialty");
};
