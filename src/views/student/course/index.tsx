// 课程详情（课程封面，课程信息，课程章节，下载资源，讨论区，作业列表）
// 鄢浩其
import React, { useState, useEffect } from "react";
import { Layout, Image, Card } from "antd";
import styles from "./index.module.scss";
import http from "../../../utils/http";
import { title } from "process";
import Discussion from "./discussion";
const { Header, Content, Footer } = Layout;

//接受参数接口
interface Props {
  message: string;
}

//课程信息接口
interface LessonInfo {
  picFile: string;
  name: string;
  info: string;
  resourceList: string[];
}
//实例化一个便于测试
const testLessonInfo: LessonInfo = {
  picFile:
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  name: "高等数学",
  info: "远程教育是教育技术学专业的重要培养方向之一，随着远程教育的迅速发展，远程教育的专业发展也受到越来越多的关注。课程《远程教育学基础》是远程教育方向的入门课程，也远程教育方向的核心课程。《远程教育学基础》是教育技术学专业本科生的必修课程，也是远程教育方向的研究生必须的先修课程，同时也可以作为远程教育领域从业人员提高职业能力的必修课程。",
  resourceList: [],
};

export default function Course() {
  useEffect(() => {
    // 在组件挂载后立即发送请求获取课程信息
    const getLessonInfo = async () => {
      const res = await http.get(
        "https://zcmu.vxpage.top/lesson?lessonId=" + 1
      );
      // res处理
    };
  }, []);

  //头部模块(课程名、任课教师、课程封面、课程简介)
  const showLessonInfo = () => {
    return (
      <div>
        <div className={styles.title}>
          <div>
            <h1>课程名：{testLessonInfo.name}</h1>
          </div>
          <div>
            <h1>任课教师：王老师</h1>
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
            src={testLessonInfo.picFile as string}
          />
          <Card className={styles.card}>
            <p>{testLessonInfo.info}</p>
          </Card>
        </div>
      </div>
    );
  };
  //内容模块(教学大纲)
  const showContent = () => {
    return (
      <div className={styles.outline}>
        <div className={styles.outlineTitle}>
          <h1>教学大纲</h1>
        </div>
        <Card className={styles.outlineCard}>
          <div className={styles.outlineCardTitle}>
            <h2>标题</h2>
          </div>
          <div className={styles.outlineCardContent}>
            <p>内容</p>
          </div>
        </Card>
      </div>
    );
  };

  //讨论区
  // const showDiscussion = () => {
  //   return (
  //     <div className={styles.discussion}>
  //       <h1>评论</h1>
  //       <div className={styles.discussionUser}>
  //         <img src={testLessonInfo.picFile} alt="未登录时图片" />
  //         <span>看完了，登录一下分享感受吧！</span>
  //       </div>
  //     </div>
  //   );
  // };

  //作业列表
  return (
    <Layout>
      <Header className={styles.header}>{showLessonInfo()}</Header>
      <Content>{showContent()}</Content>
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
