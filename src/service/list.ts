import http from '../utils/http';

type LessonId = {
  e: string;
};

export const getLessons = async (lessonId: LessonId) => {
  const ret = await http.get('/homework');
  return ret;
};
