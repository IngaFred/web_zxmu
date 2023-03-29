import http from '../utils/http'


export const getUserInfo =async ()=>{
    const ret = await http.get('/user/session');
    console.log(ret);
    return ret;
}