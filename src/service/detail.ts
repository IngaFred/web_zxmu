import { putChangeReply } from "./course";
import { UploadFile } from "antd";
import http from "../utils/http";
// 引入AxiosRequestConfig类型

type termId = {
  tid: string;
};
type submitHomework = {
  shid: string;
};
type HomeworkList = {
  homeworkId: string;
  content: string;
  termId: string;
  resourceListIds: string[];
};

// 获取课程作业详情
export const getDetails = async (lid: string) => {
  const ret = await http.get("/homework/lesson?lessonId=" + lid);
  // console.log('作业', ret);
  return ret;
};
// 通过作业id查询作业信息(简易版)
export const getHomeworkInfo = async (hid: string) => {
  const ret = await http.get("/homework/id?homeworkId=" + hid);
  // console.log('作业', ret);
  return ret;
};
// 通过提交作业id获取提交的作业
export const getSubmitHomework = async (shid: string) => {
  const ret = await http.get("/homework/sub/id?submitHomeworkId=" + shid);
  // console.log('提交的作业', ret);
  return ret;
};
// 教师查看该作业下所有提交的作业
export const getAllSubmitHomework = async (hid: string, tid: termId) => {
  const ret = await http.get(
    "/homework/submit?homeworkId=" + hid + "&termId=" + tid
  );
  // console.log('所有提交的作业', ret);
  return ret;
};
// 上传文件
export const postUploadFile = async (file: File) => {
  const ret = await http.post(
    "/resource/upload",
    {
      resourceFile: file,
    },
    {},
    "upload"
  );
  return ret;
};
// 学生不用删除文件，是修改文件
// 学生首次提交作业
export const postSubmit = async (payload: HomeworkList) => {
  // console.log("提交作业", payload);
  const ret = await http.post("/homework/submit", {
    homeworkId: payload.homeworkId,
    content: payload.content,
    resourceList: payload.resourceListIds,
    termId: payload.termId,
  });
  // console.log("返回结果", ret);
  return ret;
};
// 自定义上传Image. 并得到图片 url alt href
export const postUploadImage = async (file: File) => {
  const ret = await http.post(
    "/resource/upload",
    {
      resourceFile: file,
    },
    {},
    "upload"
  );
  return ret;
};
// 自定义上传Video. 并得到视频 url
export const postUploadVideo = async (file: File) => {
  const ret = await http.post(
    "/resource/upload",
    {
      resourceFile: file,
    },
    {},
    "upload"
  );
  return ret;
};

export const getMyHomeWork = async () => {
  const res = await http.get(`/homework`);
  return res;
};
//学生修改自己提交的作业的内容
export const updateContent = async (
  submitHomeworkId: string,
  content: any
) => {
  const res = await http.put(`/homework/sub/content`, {
    submitHomeworkId: submitHomeworkId,
    content: content,
  });
  return res;
};
//学生修改提交的作业的附件
export const updateResource = async (
  submitHomeworkId: string,
  resourceList: string[],
  deletedResourceList: string[],
) => {
  const res = await http.put(`/homework/sub/resource`, {
    submitHomeworkId: submitHomeworkId,
    resourceList: resourceList,
    deletedResourceList: deletedResourceList,
  });
  return res;
};
