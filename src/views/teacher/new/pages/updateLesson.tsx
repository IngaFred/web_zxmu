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
  UploadProps,
} from "antd";
import styles from "../index.module.scss";
import {
  getLessonInfo,
  updateLessonCover,
  updateLessonInfo,
  updateLessonName,
} from "../../../../service/course";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;
type LessonId = {
  //课程id
  e: string;
};
type updateCover = {
  picFile: File;
  lessonId: string;
};

const UpdateLesson = (id: LessonId) => {
  const { TextArea } = Input;
  const [lessonInfo, setLessonInfo] = useState<any>({});
  const [lessonName, setLessonName] = useState("");
  const [lessonDetail, setLessonDetail] = useState("");
  const [resoursBOList, setresoursBOList] = useState<any[]>([]);
  // const [isUpdateInfo, setIsUpdateInfo] = useState(false);
  const uploadCoverProps: UploadProps = {
    name: "file",
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
  const handleUploadCover = (cover: File) => {
    const formData: updateCover = {
      picFile: cover,
      lessonId: id.e,
    };
    updateLessonCover(formData);
  };
  const handleUpName = () => {
    updateLessonName(id.e, lessonName).then((res) => {
      if (res.data.success) {
        message.success(res.data.errorMsg);
      } else {
        message.error(res.data.errorMsg);
      }
    });
  };

  const handleUpInfo = () => {
    updateLessonInfo(id.e, lessonDetail).then((res) => {
      if (res.data.success) {
        message.success(res.data.errorMsg);
      } else {
        message.error(res.data.errorMsg);
      }
    });
  };
  const handleCreateWork = () => {};

  useEffect(() => {
    getLessonInfo(id).then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setLessonInfo(res.data.data);
          setLessonName(res.data.data.lessonName);
          setLessonDetail(res.data.data.info);
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
        {Object.keys(lessonInfo).length > 0 ? (
          <>
            <div>
              <div className={styles.title}>
                <h1>课程名:</h1>
                <Input
                  style={{ width: "300px" }}
                  value={lessonName}
                  onChange={(e) => {
                    setLessonName(e.target.value);
                  }}
                ></Input>
                <Button className={styles.saveButtons} onClick={handleUpName}>
                  保存
                </Button>

                {/* <Button className={styles.newButtonDiv onclick={handleCreateWork}>新建作业</Button> */}
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
                  value={lessonDetail}
                  onChange={(e) => {
                    setLessonDetail(e.target.value);
                  }}
                ></TextArea>
              </div>
            </div>
            <div className={styles.upload}>
              <Upload
                {...uploadCoverProps}
                customRequest={(res) => {
                  handleUploadCover(res.file as File);
                }}
              >
                <Button
                  className={styles.uploadButton1}
                  icon={<UploadOutlined />}
                >
                  上传课程封面
                </Button>
              </Upload>
              <Button className={styles.updateButton} onClick={handleUpInfo}>
                保存修改
              </Button>
            </div>
          </>
        ) : (
          <Empty description="暂无课程详情" />
        )}
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
