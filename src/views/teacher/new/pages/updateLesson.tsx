import {
  UploadOutlined,
  InboxOutlined,
  ContainerTwoTone,
} from "@ant-design/icons";
import {
  Layout,
  Input,
  Button,
  Upload,
  Card,
  Image,
  Empty,
  Tooltip,
  message,
} from "antd";
import styles from "../index.module.scss";
import defaultClassCover from "../../../../assets/images/course/defaultClassCover.jpg";
import { getLessonInfo } from "../../../../service/course";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;
type LessonId = {
  //课程id
  e: string;
};
const UpdateLesson = (id: LessonId) => {
  const { TextArea } = Input;
  const [lessonInfo, setLessonInfo] = useState<any>({});
  const [resoursBOList, setresoursBOList] = useState<any[]>([]);

  useEffect(() => {
    getLessonInfo(id).then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setLessonInfo(res.data.data);
          setresoursBOList(res.data.data.resoursBOList);
        } else {
          message.warning(res.data.errorMsg);
        }
      } else {
        message.warning("请求失败!");
      }
    });
  }, [id]);
  return (
    <Layout className={styles.courseAll}>
      <Header className={styles.header}>
        <>
          {Object.keys(lessonInfo).length > 0 ? (
            <>
              <div>
                <div className={styles.title}>
                  <h1>课程名:</h1>
                  <Input
                    style={{ width: "300px" }}
                    defaultValue={lessonInfo.lessonName}
                  ></Input>
                  <Button className={styles.saveButtons}>保存</Button>

                  <div className={styles.buttonDiv}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>添加学生</Button>
                    </Upload>
                    <Button>修改学生</Button>
                    <Button>新建作业</Button>
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
                  <TextArea
                    className={styles.card}
                    defaultValue={lessonInfo.info}
                  ></TextArea>
                </div>
              </div>
              <div className={styles.upload}>
                <Upload>
                  <Button
                    className={styles.uploadButton1}
                    icon={<UploadOutlined />}
                  >
                    上传课程封面
                  </Button>
                </Upload>
                {/* <Button>保存修改</Button> */}
              </div>
            </>
          ) : (
            <Empty description="暂无课程详情" />
          )}
        </>
      </Header>
      <Content>
        <div className={styles.outline}>
          <div className={styles.outlineTitle}>
            <h1>教学大纲</h1>
          </div>
          <Card className={styles.outlineCard}>
            <div className={styles.outlineCardTitle}>
              <h2>{"item.name"}</h2>
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
    </Layout>
  );
};
export default UpdateLesson;
