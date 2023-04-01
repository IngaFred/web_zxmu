import http from '../utils/http'

type scoreParams = {
    submitHomeworkId:string;
    score:string
}

// 获取课程详情
export const putCourse = async (id:scoreParams) => {
    const ret = await http.put('/homework/score',{
        submitHomeworkId:id.submitHomeworkId,
        score:id.score
    });
    return ret;
    
  };