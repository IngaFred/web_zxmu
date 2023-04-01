import http from "../utils/http";

// 获取用户拥有的所有权限
export const getPerm = async () => {
    const ret = await http.get('/perm')
    // console.log(ret);
    return ret
}