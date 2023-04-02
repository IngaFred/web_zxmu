import { type } from "os";
import http from "../utils/http";

//课程id
type LessonId = {
  //课程id
  e: string;
};

//主题id
type themeId = {
  //主题id
  themeId: string;
};

//更新主题标题
type updateThemeTitle = {
  //要修改的主题id
  themeId: string;
  //新的主题标题
  themeTitle: string;
};

//创建主题帖
type themeInvitation = {
  //主题标题
  themeTitle: string;
  //主题内容
  content: string;
  //客户端类型
  clientType: string;
  //上传的图片id资源，可为空
  picIdList?: string;
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

//修改热度
type hot = {
  //要提示热度的帖子id
  themeId: string;
  //提升的热度值(不是改变的)
  hot: string;
};

//老师获取自己创建的课程列表
export const getTeacherClassList = async () => {
  const res = await http.get("/lesson/teacher/created/simple");
  return res;
};
// 学生获取课程信息方法
export const getLessonInfo = async (id: LessonId) => {
  // console.log("id" + id);
  const ret = await http.get("/lesson?lessonId=" + id.e);
  // console.log(ret);
  return ret;
};
//老师批量导入学生，上传Excel文件
export const importStudent = async (file: File) => {
  const res = await http.post("/lesson/importuser", file);
  return res;
};

//拉取所有存在的主题
export const getThemeList = async () => {
  const res = await http.get("/comment/theme/themelist");
  // console.log(res);
  return res;
};
//请求创建主题帖方法
export const postThemeInvitation = async (themeInvitation: themeInvitation) => {
  const ret = await http.post("/comment/theme/create", {
    themeTitle: themeInvitation.themeTitle,
    content: themeInvitation.content,
    clientType: themeInvitation.clientType,
    picIdList: themeInvitation.picIdList,
  });
  //   console.log(ret);
  return ret;
};
//删除一个主题帖
export const deleteInvitation = async (themeId: themeId) => {
  const ret = await http.delete("/comment/theme", {
    themeId: themeId.themeId,
  });
  //   console.log(ret);
  return ret;
};
//用户修改主题帖标题
export const putThemeTitle = async (updateThemeTitle: updateThemeTitle) => {
  const ret = await http.put("/comment/theme/title", {
    themeId: updateThemeTitle.themeId,
    themeTitle: updateThemeTitle.themeTitle,
  });
  //   console.log(ret);
  return ret;
};
//用户获取自己发布的主题帖
export const getMyTheme = async () => {
  const ret = await http.get("/comment/theme/own");
  // console.log(ret);
  return ret;
};
//用户订阅一个主题
export const subscribeTheme = async (themeId: themeId) => {
  const ret = await http.put("/comment/theme/subscribe", {
    themeId: themeId.themeId,
  });
  //   console.log(ret);
  return ret;
};
//用户取消订阅的主题
export const unsubscribeTheme = async (themeId: themeId) => {
  const ret = await http.put("/comment/theme/unsubscribe", {
    themeId: themeId.themeId,
  });
  return ret;
};
//用户查看自己订阅的主题
export const getMySubscribeTheme = async (themeId: themeId) => {
  const ret = await http.get("/comment/theme/subscribed", {
    themeId: themeId.themeId,
  });
  // console.log(ret);
  return ret;
};
//获取一个主题帖下所有评论(不包含主题帖自己的评论,备用接口)

//拉取单个主题下包含的详细评论
export const getThemeCommentList = async (themeId: themeId) => {
  const res = await http.get("/comment/theme?themeId=" + themeId.themeId);
  // console.log(res);
  return res;
};
//请求发表帖子评论的方法
export const postInvitation = async (invitation: Invitation) => {
  const ret = await http.post("/comment/create", {
    themeId: invitation.themeId,
    clientType: invitation.clientType,
    content: invitation.content,
    previousCommentId: invitation.previousCommentId,
    masterId: invitation.masterId,
  });
  //   console.log(ret);
  return ret;
};
//提升帖子热度
export const putHot = async (hot: hot) => {
  const ret = await http.post("/comment/theme/create", {
    themeId: hot.themeId,
    hot: hot.hot,
  });
  //   console.log(ret);
  return ret;
};
