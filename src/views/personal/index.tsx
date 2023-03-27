import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./index.module.scss";
// 个人信息（设置密码）
// 蔡启航

export default function Personal() {
  // 得到学生信息
  const student = useSelector((state: RootState) => state.user.infos);
  console.log(student);

  return <div>Personal</div>;
}
