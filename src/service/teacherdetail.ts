import http from "../utils/http";
//新建作业
export const setHomework = async (values: any) => {
	const ret = await http.post(
		'/homework/create',
		{
			lessonId: values.lessonId,
			name: values.name,
			info: values.info,
			// start: values.start,
			// end: values.end,
			resourceList: values.resourceList,
		}
	);
	return ret;
};
