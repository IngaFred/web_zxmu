import React from 'react';
// import { useDispatch } from "react-redux";
import { useLocation, matchRoutes, Navigate } from 'react-router-dom';
// 引入routers表
import { routes } from '../../router';
// 获取dispatch
import { useAppDispatch } from '../../store';
// 引入 获取用户信息的infosAction方法 update 更新
import { updateInfos } from '../../store/modules/user';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { Infos } from '../../store/modules/user';
// 判断对象是否为空 ts引入js 要引入对应的d.ts文件
import _ from 'lodash';
import { infosAction } from '../../service/login';

interface BeforeEachProps {
  children?: React.ReactNode;
}
export default function BeforeEach(props: BeforeEachProps) {
  // 获取该路由中的token和infos
  const token = useSelector((state: RootState) => state.user.token);
  const infos = useSelector((state: RootState) => state.user.infos);
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const matchs = matchRoutes(routes, location);

  // 通过useAppDispatch 获取dispatch
  const dispatch = useAppDispatch();
  
  if (Array.isArray(matchs)) {
    const meta = matchs[matchs.length - 1].route.meta;
    if (meta?.auth && _.isEmpty(infos)) {
      if (token) {
        infosAction().then((res) => {
          const { success } = res?.data || {};       
          // 正确拿到infos了
          if (success) {
            // 更新infos
            dispatch(updateInfos(res?.data.data as Infos));
          }
        });
      } else {
        return <Navigate to="/login" />;
      }
    }
  }
  // 当登录成功 再进行登录 进入首页
  // if (token && location.pathname === "/login") {
  //   return <Navigate to="/" />;
  // }
  return <>{props.children}</>;
}
