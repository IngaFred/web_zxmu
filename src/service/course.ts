import { type } from "os";
import http from "../utils/http";

//课程id
type LessonId = {
  //课程id
  e: string;
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

//老师业务方法
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
