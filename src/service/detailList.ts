import http from '../utils/http';
// 引入AxiosRequestConfig类型


type homeworkId={
  homeworkId:String;
}
// 获取课程详情
export const getUnsubmit = async (myWorkid: homeworkId) => {
  const ret = await http.get('/homework/unsubmit' + myWorkid.homeworkId);
  return ret;
};