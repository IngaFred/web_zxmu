import http from "../utils/http";

//获取登录用户
export const getUserInfo = async () => {
  const ret = await http.get("/user/session");
  console.log(ret);
  return ret;
};

// 上传文件
export const postUploadFile = async (file: File) => {
  const ret = await http.post(
    "/resource/upload",
    { resourceFile: file },
    {},
    "upload"
  );
  return ret;
};

//上传头像
export const postUploadImg = async (file: File) => {
  const ret = await http.post("/userinfo/pic", { picFile: file }, {}, "upload");
  return ret;
};

//上传密码
export const postUploadPsd = async (params: { password: string }) => {
  const ret = await http.post("/user/pwd", params);
  return ret;
};
