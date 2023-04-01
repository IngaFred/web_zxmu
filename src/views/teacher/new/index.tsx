// 课程详情（课程封面，课程信息，课程章节，下载资源，讨论区，作业列表）
// 鄢浩其
import React, { useState, useEffect } from "react";
import {
  Layout,
  Col,
  Row,
  Empty,
  Button,
  Image,
  Card,
  Tooltip,
  Input,
  Upload,
  UploadProps,
  message,
  Select,
} from "antd";
import styles from "./index.module.scss";
import { useLocation } from "react-router-dom";
import {
  ContainerTwoTone,
  InboxOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getTeacherClassList, getLessonInfo } from "../../../service/course";
import defaultClassCover from "../../../assets/images/course/defaultClassCover.jpg";

const { Header, Content, Footer } = Layout;

export default function New() {
  const location = useLocation();
  const [ownClassList, setOwnClassList] = useState<any[]>([]);
  //课程封面文件上传
  const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  //上传课程资源
  const { Dragger } = Upload;
  const courseProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  //控制创建课程前后的显示状态
  const [isDisplay, setIsDisplay] = useState(true);
  const [isCreate, setIsCreate] = useState(true);
  const { TextArea } = Input;

  const displayAdd = () => {
    return (
      <Layout className={styles.courseAll}>
        <Header className={styles.header}>
          <div>
            <div>
              <div className={styles.title}>
                <h1>课程名:</h1>
                <Input style={{ width: "300px" }}></Input>
                <Button
                  className={styles.saveButton}
                  type="primary"
                  size="large"
                >
                  保存
                </Button>
              </div>
              <div className={styles.box}>
                <Image
                  preview={false}
                  style={{
                    width: "450px",
                    height: "320px",
                    borderRadius: "5px",
                  }}
                  src={defaultClassCover}
                />
                <TextArea
                  className={styles.card}
                  defaultValue="输入课程简介"
                ></TextArea>
              </div>
            </div>
            <div className={styles.upload}>
              <Upload {...props}>
                <Button
                  className={styles.uploadButton1}
                  icon={<UploadOutlined />}
                >
                  上传课程封面
                </Button>
              </Upload>
              {/* <Button>保存修改</Button> */}
            </div>
          </div>
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
                  <Dragger {...courseProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">暂无课程资源</p>
                    <p className="ant-upload-hint">
                      把文件拖入指定区域，完成上传，同样支持点击上传，可以一次上传多个文件。
                    </p>
                  </Dragger>
                </div>
              </Card>
            </div>
          </div>
        </Content>
      </Layout>
    );
  };

  const displayUpdate = (
    lessonInfo: {
      lessonName: "";
      picUrl: "";
      info: "";
    },
    lessonPassageBOList: any[],
    resoursBOList: any[]
  ) => {
    // console.log(lessonInfo, lessonPassageBOList, resoursBOList);

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
                      <Button>添加学生</Button>
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
                  <Upload {...props}>
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
  type LessonId = {
    //课程id
    e: string;
  };
  const [lessonId, setLessonId] = useState<LessonId>({
    e: "",
  });
  const [lessonInfo, setLessonInfo] = useState<any>({});
  const [lessonPassageBOList, setLessonPassageBOList] = useState<any[]>([]);
  const [resoursBOList, setresoursBOList] = useState<any[]>([]);

  const handleCreate = () => {
    setIsDisplay(false);
  };

  const handleUpdate = (lessonId: string) => {
    let id: LessonId = {
      e: lessonId,
    };

    setLessonId(id);
    setIsDisplay(false);
    setIsCreate(false);
  };
  useEffect(() => {
    getTeacherClassList().then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setOwnClassList(res.data.data);
        } else {
          message.warning(res.data.errorMsg);
        }
      } else {
        message.warning("请求失败!");
      }
    });
  }, []);
  useEffect(() => {
    getLessonInfo(lessonId).then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setLessonInfo(res.data.data);
          setLessonPassageBOList(res.data.data.lessonPassageBOList);
          setresoursBOList(res.data.data.resoursBOList);
        } else {
          message.warning(res.data.errorMsg);
        }
      } else {
        message.warning("请求失败!");
      }
    });
  }, [lessonId]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isDisplay ? (
        <>
          <Row>
            <Col className={styles.rowButton}>
              <Button onClick={handleCreate}>新建课程</Button>
              <Select
                defaultValue="修改课程"
                style={{ width: "100px", marginLeft: "10px" }}
                onChange={(lessonId) => handleUpdate(lessonId)}
                options={ownClassList.map((item) => {
                  return {
                    value: item.lessonId,
                    label: item.lessonName,
                  };
                })}
              />
            </Col>
          </Row>
          <Row className={styles.rowEmpty}>
            <Col span={24}>
              <Empty description={"暂无课程信息，请添加课程！"}> </Empty>
            </Col>
          </Row>
        </>
      ) : isCreate ? (
        displayAdd()
      ) : (
        displayUpdate(lessonInfo, lessonPassageBOList, resoursBOList)
      )}
    </div>
  );
}
