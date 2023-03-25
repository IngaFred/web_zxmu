import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// 不引入自带的index样式，引入自定义的assets下自己配置的全局样式
import './assets/styles/reset.scss';
import './assets/styles/iconfont.scss';
import './assets/styles/common.scss';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// 不使用App了，使用自己配置的路由表了 引入路由提供
import { RouterProvider } from 'react-router-dom'
// 引入路由表
import router from './router';
// 使用懒加载后 引入suspense
import { Suspense } from 'react';
// 引入状态管理
import { Provider } from 'react-redux'
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // 严格模式 提供友好提示
  // <React.StrictMode>
    <Suspense>
      {/* <App /> */}
      {/* 状态管理添加 */}
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </Suspense>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
