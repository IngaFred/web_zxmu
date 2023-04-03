import http from '../utils/http';
// 引入AxiosRequestConfig类型

type Lesson = {
  id: string;
};
type Homework = {
  hid: string;
};

// 获取课程作业详情
export const getDetails = async (myLesson: Lesson) => {
  const ret = await http.get('/homework/lesson?lessonId=' + myLesson.id);
  console.log('作业',ret);
  
  return ret;
};
// 获取简易作业信息
export const getLessons = async (myHomework: Homework) => {
  const ret = await http.get('/homework/id?homeworkId=' + myHomework.hid);
  console.log('作业',ret);
  
  return ret;
};
// 上传文件
export const toUploadFile = async (file: File) => {
  const ret = await http.post('/resource/upload', file, {}, 'upload');
  return ret;
};
// 学生不用删除文件，是修改文件
