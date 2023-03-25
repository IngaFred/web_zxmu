import React from "react";
// import { useDispatch } from "react-redux";
import { useLocation, matchRoutes, Navigate } from "react-router-dom";
// 引入routers表
import { routes } from "../../router";
// 获取dispacth
import { useAppDispatch } from "../../store";
// 引入 获取用户信息的infosAction方法 update 更新
import { infosAction, updateInfos } from "../../store/modules/user";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { Infos } from "../../store/modules/user";
// 判断对象是否为空 ts引入js 要引入对应的d.ts文件
import _ from "lodash";

interface BeforeEachProps {
  children?: React.ReactNode;
}
export default function BeforeEach(props: BeforeEachProps) {
  // 获取该路由中的token和infos
  const token = useSelector((state: RootState) => state.user.token);
  const infos = useSelector((state: RootState) => state.user.infos);

  const location = useLocation();
  const matchs = matchRoutes(routes, location);

  // 通过useAppDispacth 获取dispatch
  const dispatch = useAppDispatch();

  // console.log(matchs);
  // 先判断matchs列表组，是否为空
  if (Array.isArray(matchs)) {
    // 不为空，将matchs中最后一个路由的meta保存
    const meta = matchs[matchs.length - 1].route.meta;
    // 验证属性中的auth属性 查看是否具有显示权限
    if (meta?.auth && _.isEmpty(infos)) {
      if (token) {
        dispatch(infosAction()).then((action) => {
          // 对action做解析
          const { errcode, infos } = (
            action.payload as { [index: string]: unknown }
          ).data as { [index: string]: unknown };
          // 正确拿到infos了
          if (errcode === 0) {
            // 更新infos
            dispatch(updateInfos(infos as Infos));
          }
        });
      } else {
        return <Navigate to="/login" />;
      }
    }
  }
  // 当登录成功 再进行登录 进入首页
  if (token && location.pathname === "/login") {
    return <Navigate to="/" />;
  }
  return <>{props.children}</>;
}
