import { type } from "os";
import http from "../utils/http";

//课程id
type LessonId = {
  //课程id
  e: string;
};
//创建课程数据接口
type Lesson = {
  lessonId?: string;
  modelId: string;
  picFile?: File;
  name: string;
  info: string;
  resourceList: string[];
};

//学期课程id数据组合接口
type termedLessonId = {
  termedLessonId: string;
};
//教师更新课程封面数据接口
type updateClassCover = {
  picFile: File;
  lessonId: string;
};
//教师新建课程作业数据接口
type createBody = {
  lessonId: string;
  name: string;
  resourceList: string;
  info: string;
  start: string;
  end: string;
};

//老师业务方法
//获取所有模块
export const getModel = async () => {
  const res = await http.get("/lesson/model");
  return res;
};
//教师创建课程
export const postCreateLesson = async (Lesson: Lesson) => {
  const res = await http.post(
    "/lesson/create",
    {
      modelId: Lesson.modelId,
      picFile: Lesson.picFile,
      name: Lesson.name,
      info: Lesson.info,
      resourceList: Lesson.resourceList,
    },
    {},
    "upload"
  );
  return res;
};
//教师修改已创建的课程
export const postUpdateLesson = async (Lesson: Lesson) => {
  const res = await http.post(
    "/lesson/update",
    {
      lessonId: Lesson.lessonId,
      modelId: Lesson.modelId,
      picFile: Lesson.picFile,
      name: Lesson.name,
      info: Lesson.info,
      resourceList: Lesson.resourceList,
    },
    {},
    "upload"
  );
  return res;
};
//老师删除自己的课程
export const delLessonByLessonId = async (lessonId: LessonId) => {
  const res = await http.delete("/lesson?lessonId=" + lessonId.e);
  return res;
};
//老师获取自己创建的课程列表
export const getTeacherClassList = async () => {
  const res = await http.get("/lesson/teacher/created/simple");
  return res;
};
//教师修改课程封面
export const updateLessonCover = async (updateData: updateClassCover) => {
  //console.log(updateData);
  const res = await http.put(
    "/lesson/pic",
    {
      picFile: updateData.picFile,
      lessonId: updateData.lessonId,
    },
    {},
    "upload"
  );
  //console.log(res);
  return res;
};
//教师修改课程名
export const updateLessonName = async (lessonId: string, name: string) => {
  const res = await http.put("/lesson/name", {
    lessonId: lessonId,
    name: name,
  });
  return res;
};
//教师修改课介绍
export const updateLessonInfo = async (lessonId: string, info: string) => {
  const res = await http.put("/lesson/info", {
    lessonId: lessonId,
    info: info,
  });
  return res;
};
//教师新建作业
export const createHomeWork = async (work: createBody) => {
  const res = await http.post("/homework/create", {
    lessonId: work.lessonId,
    name: work.name,
    resourceList: work.resourceList,
    info: work.info,
    start: work.start,
    end: work.end,
  });
  return res;
};

//用户上传资源
export const uploadResource = async (file: File) => {
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
//学生业务方法
// 学生获取课程信息方法
export const getLessonInfo = async (id: LessonId) => {
  const ret = await http.get("/lesson?lessonId=" + id.e);
  return ret;
};

//公用业务方法
//获取一个课程下的所有评论一个参数方法
export const getCommentByTermIdLessonId = async (id: termedLessonId) => {
  const ret = await http.get(
    "/comment/lesson/comment?termedLessonId=" + id.termedLessonId
  );
  return ret;
};
//获取一个课程下的所有评论两个参数方法
export const getCommentByTermIdAndLessonId = async (
  lessonId: string,
  termId: string
) => {
  const res = await http.get(
    "/comment/lesson/comment?lessonId=" + lessonId + "&termId=" + termId
  );
  //console.log(res);
  return res;
};
//发表评论两个参数方法
type postCommentBody = {
  termedLessonId?: string;
  lessonId: string;
  termId: string;
  clientType: string;
  content: string;
  previousCommentId?: string;
  masterId?: string;
};
export const postCommentByTermIdAndLessonId = async (
  postCommentBody: postCommentBody
) => {
  const res = await http.post("/comment/create", {
    termedLessonId: postCommentBody.termedLessonId,
    lessonId: postCommentBody.lessonId,
    termId: postCommentBody.termId,
    clientType: "web_client",
    content: postCommentBody.content,
    previousCommentId: postCommentBody.previousCommentId,
    masterId: postCommentBody.masterId,
  });
  return res;
};
