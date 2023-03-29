import React, { useEffect, useState } from "react";
import { message } from "antd";
import styles from "./index.module.scss";
import { getLessons } from "../../../service/list";
// 我的作业列表（作业标题，课程名字，老师名字，展示分数，批改状态）
// 娄竞楷
export default function List() {
  const [lessonAll, setLessonAll] = useState<any>({});

  useEffect(() => {
    getLessons().then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg);
        setLessonAll(ret.data.data);        
      } else {
        message.error("获取课程失败");
      }
    });
    return () => {};
  }, []);

  console.log(lessonAll);
  
  return (
    <div>
      list
    </div>
  );
}
