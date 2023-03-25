// 引入ajax
import http from '../../utils/http';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// action中payload类型为any，要指定为token
import { PayloadAction } from '@reduxjs/toolkit';

// 共享状态类型设置
type Token = string;
export type Infos = {
    // 不确定Infos类型时这么定义 switch签名方式添加类型
    [index: string]: unknown;
}
// 包装一下 设置断言，满足要求类型 
export type UsersState= {
    token: Token,
    infos: Infos
}
// 指定传来的login类型
type login = {
    account: string,
    password: string
}

const usersSlice = createSlice({
    // 配置信息
    name: 'users',
    // 共享状态
    initialState: {
        token: '',
        infos: {}
    }as UsersState,
    // 编写同步方法
    reducers: {
        updateToken(state, action:PayloadAction<Token>){
            state.token = action.payload;
        },
        updateInfos(state, action:PayloadAction<Infos>){
            state.infos = action.payload;
        },
        clearToken(state){
            state.token = '';
        },
    }
})
// 导出异步方法 
export const loginAction = createAsyncThunk('user/loginAction',async (payload: login) => {  
    let params = new URLSearchParams();
    params.append("account", payload.account);
    params.append("password", payload.password);
    const ret = await http.post('/user/login', params, {
        // 设置headers的Content-Type为application/x-www-form-urlencoded
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return ret;
})
// 获取用户信息的方法
export const infosAction = createAsyncThunk('/user/infosAction',async () => {
    const ret = await http.get('/user/infos');
    return ret;
})

// 将同步方法给从reducers中解构出来
export const { updateToken, updateInfos, clearToken } = usersSlice.actions;

export default usersSlice.reducer;