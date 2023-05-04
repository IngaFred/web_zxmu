import { UploadFile } from 'antd';
import http from '../utils/http';
// 引入AxiosRequestConfig类型

type Lesson = {
  id: string;
};
type Homework = {
  hid: string;
};
type HomeworkList = {
  homeworkId: string;
  content: string;
  termId: string;
  resourceList: UploadFile[] | null;
};

// 获取课程作业详情
export const getDetails = async (myLesson: Lesson) => {
  const ret = await http.get('/homework/lesson?lessonId=' + myLesson.id);
  // console.log('作业', ret);

  return ret;
};
// 获取简易作业信息
export const getLessons = async (myHomework: Homework) => {
  const ret = await http.get('/homework/id?homeworkId=' + myHomework.hid);
  // console.log('作业', ret);

  return ret;
};
// 上传文件
export const postUploadFile = async (file: File) => {
	const ret = await http.post(
	  '/resource/upload',
	  {
		resourceFile: file,
	  },
	  {},
	  'upload'
	);
	return ret;
};
// 学生不用删除文件，是修改文件
// 提交作业
export const postSubmit = async (payload: HomeworkList) => {
  const ret = await http.post('/homework/submit', {
    homeworkId: payload.homeworkId,
    content: payload.content,
    resourceList: payload.resourceList,
    termId: payload.termId,
  });

  
  return ret;
};
// 自定义上传Image. 并得到图片 url alt href
export const postUploadImage = async (file: File) => {
	const ret = await http.post(
	  '/resource/upload',
	  {
		resourceFile: file,
	  },
	  {},
	  'upload'
	);
	return ret;
};
// 自定义上传Video. 并得到视频 url
export const postUploadVideo = async (file: File) => {
	const ret = await http.post(
	  '/resource/upload',
	  {
		resourceFile: file,
	  },
	  {},
	  'upload'
	);
	return ret;
};
