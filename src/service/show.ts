import http from '../utils/http';

export const getGoodHomeworks = async (
	homeworkId: string,
	termId: string,
	limit: string
) => {
	const ret = await http.get(
		'homework/great?homeworkId=' +
			homeworkId +
			'&termId=' +
			termId +
			'&limit=' +
			limit
	);
	return ret;
};
