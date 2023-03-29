import http from "../utils/http";

export const getLessons = async () => {
  const ret = await http.get("/lesson/simple");
  return ret;
};
