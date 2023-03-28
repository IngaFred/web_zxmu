// 课程详情（课程封面，课程信息，课程章节，下载资源，讨论区，作业列表）
// 鄢浩其
import React, { useState, useEffect } from "react";
import { Layout, Image, Card } from "antd";
import styles from "./index.module.scss";
import Discussion from "./discussion";
import { getLessonInfo } from "../../../service/course";
const { Header, Content, Footer } = Layout;

//接受参数接口
// interface Props {
//   message: string;
// }

//请求课程Id接口
interface LessonId {
  classId: string;
}
export default function Course() {
  const [lessonInfo, setLessonInfo] = useState<any>({});
  const [lessonPassageBOList, setLessonPassageBOList] = useState<any[]>([]);
  useEffect(() => {
    //实例化一个便于测试
    const testLessonId: LessonId = {
      classId: "1635659994380824576",
    };
    getLessonInfo(testLessonId).then((res) => {
      setLessonInfo(res.data.data);
      setLessonPassageBOList(res.data.data.lessonPassageBOList);
      // console.log(res);
      // console.log(res.data.data.lessonPassageBOList);
      // console.log(setLessonPassageBOList(res.data.data.lessonPassageBOList));
      // console.log(lessonPassageBOList);
    });
  }, []);
  // useEffect(() => {
  //   console.log("lessonPassageBOList:", lessonPassageBOList);
  // }, [lessonPassageBOList]);

  return (
    <Layout>
      <Header className={styles.header}>
        <div>
          <div className={styles.title}>
            <div>
              <h1>课程名：{lessonInfo.lessonName}</h1>
            </div>
            <div>
              <h1>
                任课教师：
                {lessonInfo.creater ? lessonInfo.creater.userName : ""}
              </h1>
            </div>
          </div>
          <div className={styles.box}>
            <Image
              preview={false}
              style={{
                width: "450px",
                height: "320px",
                borderRadius: "5px",
              }}
              src={lessonInfo.picUrl}
            />
            <Card className={styles.card}>
              <p>{lessonInfo.info}</p>
            </Card>
          </div>
        </div>
      </Header>
      <Content>
        <div className={styles.outline}>
          <div className={styles.outlineTitle}>
            <h1>教学大纲</h1>
          </div>
          {lessonPassageBOList.map((item, index) => (
            <Card key={index} className={styles.outlineCard}>
              <div className={styles.outlineCardTitle}>
                <h2>{item.name}</h2>
              </div>
              <div className={styles.outlineCardContent}>
                <p>内容</p>
              </div>
            </Card>
          ))}
        </div>
      </Content>
      <Footer className={styles.footer}>
        <Discussion
          userAvatar={""}
          userName={""}
          content={""}
          likes={0}
          replyCount={0}
        ></Discussion>
      </Footer>
    </Layout>
  );
}
