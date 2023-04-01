import http from '../utils/http'

//获取登录用户
export const getUserInfo =async ()=>{
    const ret = await http.get('/user/session');
    console.log(ret);
    return ret;
}