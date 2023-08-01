import http from "../utils/http";
//获取该课程的信息
export const getCourseInfo = async (lessonId: string) => {
  const res = await http.get("homework/lesson?lessonId=" + lessonId);
  return res;
};

//修改作业名称
export const changeWorkName = async (homeworkId: string, name: string) => {
  const res = await http.put("/homework/name", {
    homeworkId: homeworkId,
    name: name,
  });
  return res;
};
//修改作业内容
export const changeWorkInfo = async (homeworkId: string, info: string) => {
  const res = await http.put("/homework/info", {
    homeworkId: homeworkId,
    info: info,
  });
  return res;
};
