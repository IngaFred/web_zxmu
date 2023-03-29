//@ts-nocheck
import React, { useEffect, useState } from "react";
import { message, Avatar, List, Card } from "antd";

import styles from "./index.module.scss";
import { getLessons } from "../../../service/list";
// 我的作业列表（作业标题，课程名字，老师名字，展示分数，批改状态）
// 娄竞楷
export default function ClassList() {
  const [lessonAll, setLessonAll] = useState<[]>([]);
  // const [lessonName,setLesssonName] = useState<[]>([]);
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

  const data = [
    {
      title: "Title 1",
    },
  ];

  // const lessNameList = lessonAll.map((item) => (item.lessonName));

  return (
    <div className={styles.sc}>
      {lessonAll.map((item, index) => (
        <div key={index} >
          {/* <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={lessNameList}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.title}>Card content</Card>
              </List.Item>
            )}
          /> */}
            <Card  className={styles.rr} style={{backgroundImage:item.picUrl}} >
              <div>
              <div>{item.lessonName}</div>
              <div>{item.info}</div>
              </div>
              <div>
                <img src={item.picUrl} alt="" style={{width:'250px',height:'100px'}}/>
              </div>
              
            </Card>
          </div>
      ))}
    </div>
  );
}