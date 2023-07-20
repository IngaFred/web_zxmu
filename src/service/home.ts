import http from "../utils/http";

// 获取主题模块
export const getModel = async () => {
  const ret = await http.get("/lesson/model");
  return ret;
};
// 获取对应主题模块下的所有课程
export const getModelLessons = async (modelId: string) => {
  const ret = await http.get("/lesson/model/lesson?modelId=" + modelId);
  return ret;
};
// 获取学生已选课程
export const getMyLessons = async () => {
  const ret = await http.get("/lesson/simple");
  return ret;
};

export const chooseLesson = async (lessonId: string) => {
  const ret = await http.get("/lesson/choose?lessonId=" + lessonId);
  return ret;
};
