import http from "../utils/http";

// 获取课程信息方法
type LessonId = {
  classId: string;
};
export const getLessonInfo = async (id: LessonId) => {
  const ret = await http.get("/lesson?lessonId=" + id.classId);
  // console.log(ret);
  return ret;
};
//请求创建主题帖方法
type themeInvitation = {
  themeTitle: string;
  content: string;
  clientType: string;
  picIdList?: string;
};
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
//提升帖子热度

//请求发表帖子评论的方法
type Invitation = {
  themeId: string;
  clientType: string;
  content: string;
  previousCommentId: string;
  masterId: string;
};
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

//删除一个主题帖
type themeId = {
  themeId: string;
};
export const deleteInvitation = async (themeId: themeId) => {
  const ret = await http.delete("/comment/theme", {
    themeId: themeId.themeId,
  });
  //   console.log(ret);
  return ret;
};

//获取一个主题帖下所有评论(不包含主题帖自己的评论,备用接口)

//用户修改主题帖标题
type updateThemeTitle = {
  themeId: string;
  themeTitle: string;
};
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
  console.log(ret);
  return ret;
};
