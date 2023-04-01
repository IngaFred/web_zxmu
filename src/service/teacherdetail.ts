import http from "../utils/http";
//新建作业
export const postUploadFile = async (file: File) => {
  const ret = await http.post("/homework/create", file, {}, "upload");
  return ret;
};
//上传
