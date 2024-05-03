import intance from "../intance";

export const getServices = () => {
  return intance.get("/api/Services");
};
