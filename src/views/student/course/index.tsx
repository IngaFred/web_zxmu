// 课程详情（课程封面，课程信息，课程章节，下载资源，讨论区，作业列表）
// 鄢浩其
import React, { useState, useEffect } from "react";
import { Layout, Image, Card, message, Tooltip, Button, Empty } from "antd";
import { ContainerTwoTone } from "@ant-design/icons";
import styles from "./index.module.scss";
import Discussion from "./discussion";
import { getLessonInfo } from "../../../service/course";
import { useLocation } from "react-router-dom";
const { Header, Content, Footer } = Layout;

//请求课程Id接口
type LessonId = {
  e: string;
};
export default function Course() {
  const location = useLocation();
  const lessonId: LessonId = location.state?.lessonId;

  const [terms, setTerms] = useState<any>([]);
  const [termId, setTermId] = useState("11");
  const [lessonInfo, setLessonInfo] = useState<any>({});
  const [resoursBOList, setresoursBOList] = useState<any[]>([]);

  useEffect(() => {
    console.log("我是学生端");
    getLessonInfo(lessonId).then((res) => {
      if (res.data.success) {
        setLessonInfo(res.data.data);
        setTerms(res.data.data.terms);
        setresoursBOList(res.data.data.resoursBOList);
        setTermId(res.data.data.terms[0].termId);
      } else {
        message.warning(res.data.errorMsg);
      }
    });
  }, [lessonId]);

  useEffect(() => {
    console.log(terms[0]);
    console.log(termId);
  }, [terms]);

  return (
    <Layout className={styles.courseAll}>
      <Header className={styles.header}>
        <div>
          {Object.keys(lessonInfo).length > 0 ? (
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
          ) : (
            <Empty description="没有对应的课程，暂无课程详情" />
          )}
        </div>
      </Header>
      <Content>
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
          <div>
            <div className={styles.resoursListTitle}>
              <h1>其他资源</h1>
            </div>
            <Card className={styles.outlineCard}>
              <div className={styles.outlineCardContent}>
                <div
                  style={{
                    display: resoursBOList.length === 0 ? "inline" : "none",
                  }}
                >
                  暂无资源
                </div>
                <div
                  style={{
                    display: resoursBOList.length > 0 ? "inline" : "none",
                  }}
                >
                  {resoursBOList.map((item, index) => (
                    <Tooltip
                      className={styles.resoursTooltip}
                      key={index}
                      title={"Download   " + item.name}
                    >
                      <a href={item.url} download={item.name}>
                        <ContainerTwoTone style={{ fontSize: "40px" }} />
                      </a>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Content>
      <Footer className={styles.footer}>
        <Discussion lessonId={lessonId.e} termId={termId}></Discussion>
      </Footer>
    </Layout>
  );
}
