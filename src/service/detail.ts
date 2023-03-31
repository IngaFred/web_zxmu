import http from '../utils/http';
// 引入AxiosRequestConfig类型

type Lesson = {
  id: string;
};

// 获取课程详情
export const getDetails = async (myLesson: Lesson) => {
  const ret = await http.get('/lesson?lessonId=' + myLesson.id);
  return ret;
};
// 上传文件
export const toUploadFile = async (file: File) => {
  const ret = await http.post(
    '/resource/upload',
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    'upload'
  );
  return ret;
};
// 学生不用删除文件，是修改文件
