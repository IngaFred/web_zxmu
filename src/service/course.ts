import { type } from "os";
import http from "../utils/http";

//课程id
type LessonId = {
  //课程id
  e: string;
};
//创建课程数据接口
type Lesson = {
  picFile?: File;
  name: string;
  info: string;
  resourceList: string[];
};

//发表帖子
type Invitation = {
  //评论所属主题帖id
  themeId: string;
  //评论发布客户端类型
  clientType: string;
  //评论内容
  content: string;
  //前一个评论的id，主评论该项则为空
  previousCommentId: string;
  //所属的主评论id，如果不为空，则该评论为回复评论
  masterId: string;
};

//学期课程id数据组合接口
type termedLessonId = {
  termedLessonId: string;
};
type updateClassCover = {
  picFile: File;
  lessonId: string;
};

//老师业务方法
//教师创建课程
export const postCreateLesson = async (Lesson: Lesson) => {
  // console.log(Lesson);
  const res = await http.post("/lesson/create", {
    picFile: Lesson.picFile,
    name: Lesson.name,
    info: Lesson.info,
    resourceList: Lesson.resourceList,
  });
  return res;
};
//老师获取自己创建的课程列表
export const getTeacherClassList = async () => {
  const res = await http.get("/lesson/teacher/created/simple");
  return res;
};
//老师批量导入学生，上传Excel文件
export const importStudent = async (file: File) => {
  const res = await http.post("/lesson/importuser", file);
  return res;
};
//教师修改课程封面
export const updateLessonCover = async (updateData: updateClassCover) => {
  const res = await http.put("/lesson/pic", {
    picFile: updateData.picFile,
    lessonId: updateData.lessonId,
  });
  console.log(updateData);
  console.log(res);
  return res;
};
//教师修改课程封面
export const updateLessonName = async (lessonId: string, name: string) => {
  const res = await http.put("/lesson/name", {
    lessonId: lessonId,
    name: name,
  });
  console.log(res);
  return res;
};

//用户上传资源
export const uploadResource = async (file: File) => {
  // console.log(file);
  const ret = await http.post("/resource/upload", file, {}, "upload");
  return ret;
};
//学生业务方法
// 学生获取课程信息方法
export const getLessonInfo = async (id: LessonId) => {
  // console.log("id" + id);
  const ret = await http.get("/lesson?lessonId=" + id.e);
  // console.log(ret);
  return ret;
};

//公用业务方法
//获取一个课程下的所有评论
export const getCommentByTermedLessonId = async (id: termedLessonId) => {
  const ret = await http.get(
    "/comment/lesson/comment?termedLessonId=" + id.termedLessonId
  );
  console.log(ret);
  return ret;
};
