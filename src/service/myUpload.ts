import http from '../utils/http';

//课程id
type LessonId = {
	//课程id
	e: string;
};

// 学生获取课程信息方法
export const getLessonInfo = async (id: LessonId) => {
	const ret = await http.get('/lesson?lessonId=' + id.e);
	return ret;
};
//获取所有模块
export const getModel = async () => {
	const res = await http.get('/lesson/model');
	return res;
};
//用户上传资源
export const uploadResource = async (file: File) => {
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
//用户删除资源
export const deleteResource = async (deleteResourceId: string) => {
	const ret = await http.delete(
		'/resource',
		{
			resourceId: deleteResourceId,
		},
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
	);
	return ret;
};