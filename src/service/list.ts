import http from "../utils/http";

type LessonId = {
  e: string;
};

export const getLessons = async (lessonId: LessonId) => {
  const ret = await http.get("/lesson?lessonId=" + lessonId.e);
  console.log(ret);
  return ret;
};
