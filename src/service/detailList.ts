import http from '../utils/http';
// 引入AxiosRequestConfig类型


type homeworkId={
  homeworkId:String;
  termId:String;
}
// 获取课程详情
export const getUnSubmit = async (myWorkid: homeworkId) => {
  const ret = await http.get('/homework/unsubmit?homeworkId=' + myWorkid.homeworkId+"&termId="+myWorkid.termId);
  return ret;
};

export const getSubmit = async (myWorkid: homeworkId) => {
  const ret = await http.get('/homework/submit?homeworkId=' + myWorkid.homeworkId+"&termId="+myWorkid.termId);
  return ret;
};