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
  console.log(ret);
  return ret;
};
