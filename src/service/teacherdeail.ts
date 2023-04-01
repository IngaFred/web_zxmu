import http from "../utils/http";
//上传课程文件
export const postUploadFile = async (file: File) => {
  const ret = await http.post("/resource/upload", file, {}, "upload");
  return ret;
};
//上传
