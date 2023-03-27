import http from '../utils/http';
// 指定传来的login类型
type Login = {
  account: string;
  password: string;
};

// 导出异步方法
export const loginAction = async (payload: Login) => {
  const ret = await http.post('/user/login', {
    account: payload.account,
    password: payload.password,
  });
  console.log('token:');
  console.log(ret.data.data);
  return ret;
};
// 获取用户信息的方法
export const infosAction =  async () => {
  const ret = await http.get('/user/session');
  // console.log(ret.data);
  return ret;
};
