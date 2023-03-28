import http from "../utils/http";
type LessonId = {
  classId: string;
};

// 导出异步方法
// export const loginAction = async (payload: Login) => {
//   const ret = await http.post("/user/login", {
//     account: payload.account,
//     password: payload.password,
//   });
//   console.log("token:");
//   console.log(ret.data.data);
//   return ret;
// };
// 获取用户信息的方法
export const getLessonInfo = async (id: LessonId) => {
  const ret = await http.get("/lesson?lessonId=" + id.classId);
  //   console.log(ret);
  return ret;
};
