import http from '../utils/http';

export const getCourseList = async () => {
	const ret = await http.get('lesson/teacher/created/simple');
	// console.log('我的课程', ret);
	return ret;
};
