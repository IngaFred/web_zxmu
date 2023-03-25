import { configureStore } from "@reduxjs/toolkit";
import usersReduser from "./modules/user";
import type { Reducer, AnyAction} from "@reduxjs/toolkit"
import type { UsersState } from "./modules/user";
import type { PersistPartial } from "redux-persist/es/persistReducer";
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";

// 配置文件
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  /* 设置白名单 */
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    // 进行持久化操作，使用persistReducer将对象包起来
    // 持久化后，产生问题即index.tsx下的 RootState的类型无法正确推断，故需要对ruducer下的user进行断言，让它保持自己的类型
    user: persistReducer(persistConfig, usersReduser) as Reducer<UsersState & PersistPartial, AnyAction>,
  },
    // 中间键设置
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false
    }),
});

// store 配置持久化
persistStore(store)

// 引出RootState, AppDispath, useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch
export const useAppDispatch: () => AppDispath = useDispatch

export default store;
