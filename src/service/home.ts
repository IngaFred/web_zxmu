import http from "../utils/http";

export const getCourses = async () => {
  const ret = await http.get("/lesson/simple");
  return ret;
};
