import intance from "../intance";

export const getClinics = async () => {
  return await intance.get("/api/Clinics");
};
