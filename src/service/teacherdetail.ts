import http from "../utils/http";
//新建作业
export const setHomework = async (values: any) => {
  console.log(JSON.stringify(values));
  const ret = await http.post(
    "/homework/create",
    {
      lessonId: values.LessonId,
      name: values.Name,
      info: values.Info,
      start: values.start,
      end: values.end,
      resourceList: values.resourceList,
    },
    {},
    "upload"
  );
  return ret;
};
