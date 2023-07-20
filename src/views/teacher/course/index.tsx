// 课程详情（课程封面，课程信息，课程章节，下载资源，讨论区，作业列表）
// 鄢浩其
import React, { useState, useEffect } from "react";
import { Layout, Image, Card, message, Tooltip, Button, Empty } from "antd";
import { ContainerTwoTone } from "@ant-design/icons";
import styles from "./index.module.scss";
import Discussion from "./discussion";
import { delLessonByLessonId, getLessonInfo } from "../../../service/course";
import { useLocation, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

export default function Course() {
  const location = useLocation();
  const lessonId: LessonId = location.state?.lessonId;

  const [lessonInfo, setLessonInfo] = useState<any>({});
  const [resoursBOList, setresoursBOList] = useState<any[]>([]);
  const navigate = useNavigate();
  const handleUpdateLesson = () => {
    navigate("/updateLesson", { state: { lessonId: lessonId } });
  };
  interface LessonId {
    e: string;
  }
  const handleLesson = () => {
    delLessonByLessonId(lessonId).then((res) => {
      if (res.data.success) {
        message.success(res.data.errorMsg);
        navigate("/courseList");
      } else {
        message.error(res.data.errorMsg);
      }
    });
  };
  const handleCorrectWork = () => {
    navigate("/detailListTeacher", {
      state: { lessonInfo: lessonInfo },
    });
  };
  const handleCreateWork = () => {
    navigate("/detailTeacher", {
      state: { lessonInfo: lessonInfo },
    });
  };
  useEffect(() => {
    //console.log('我是教师端');
    if (lessonId) {
      getLessonInfo(lessonId).then((res) => {
        if (res.data.success) {
          setLessonInfo(res.data.data);
          setresoursBOList(res.data.data.resoursBOList);
        } else {
          message.warning(res.data.errorMsg);
        }
      });
    } else {
      return;
    }
  }, [lessonId]);
  const handleDownload = (url: string) => {
    fetch(url, { mode: "no-cors" })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = url.split("/").pop()!;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  };

  return (
    <Layout className={styles.courseAll}>
      <Header className={styles.header}>
        <div>
          {Object.keys(lessonInfo).length > 0 ? (
            <div>
              <div className={styles.title}>
                <div className={styles.titleDate}>
                  <div className={styles.titleLesson}>
                    {lessonInfo.lessonName}
                  </div>
                  <div>
                    <Button
                      type="primary"
                      onClick={handleUpdateLesson}
                      className={styles.teaBtn}
                    >
                      修改课程
                    </Button>
                    <Button
                      type="primary"
                      onClick={handleLesson}
                      className={styles.teaBtn}
                    >
                      删除课程
                    </Button>
                    <Button
                      type="primary"
                      onClick={handleCreateWork}
                      className={styles.teaBtn}
                    >
                      新建作业
                    </Button>
                    <Button
                      type="primary"
                      onClick={handleCorrectWork}
                      className={styles.teaBtn}
                    >
                      批改作业
                    </Button>
                  </div>
                </div>
                <div>
                  <div className={styles.titleTeacher}>
                    任课教师：
                    {lessonInfo.creater ? lessonInfo.creater.userName : ""}
                  </div>
                </div>
              </div>
              <div className={styles.box}>
                <Image
                  preview={false}
                  style={{
                    width: "560px",
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
          <div>
            <div className={styles.resoursListTitle}>
              <h1>课程资源</h1>
            </div>
            <div className={styles.outlineCardContent}>
              <div
                style={{
                  display: resoursBOList.length === 0 ? "inline" : "none",
                }}
              >
                暂无资源
              </div>
              <div className={styles.resoursList}>
                {resoursBOList.map((item, index) => (
                  <div style={{ display: "flex", padding: "5px" }}>
                    <a
                      href={item.url}
                      download={item.name}
                      className={styles.download}
                      key={index}
                    >
                      <ContainerTwoTone className={styles.downloadIcon} />
                      {item.name}
                    </a>
                    <Button
                      onClick={() => handleDownload(item.url)}
                      size="small"
                      style={{ marginLeft: "20px" }}
                    >
                      下载
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer className={styles.footer}>
        <Discussion lessonId={lessonId?.e}></Discussion>
      </Footer>
    </Layout>
  );
}
