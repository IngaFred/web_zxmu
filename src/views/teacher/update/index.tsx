import { UploadOutlined, ContainerTwoTone } from "@ant-design/icons";
import {
  Layout,
  Input,
  Button,
  Upload,
  Image,
  Tooltip,
  message,
  UploadProps,
} from "antd";
import styles from "./index.module.scss";
import {
  getLessonInfo,
  updateLessonCover,
  updateLessonInfo,
  updateLessonName,
} from "../../../service/course";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const { Header, Content } = Layout;
interface LessonId {
  //课程id
  e: string;
}
type updateCover = {
  picFile: File;
  lessonId: string;
};

const UpdateLesson = () => {
  const { TextArea } = Input;
  const location = useLocation();
  const lessonId: LessonId = location.state?.lessonId;
  const [lessonInfo, setLessonInfo] = useState<any>({});
  const [lessonName, setLessonName] = useState("");
  const [lessonDetail, setLessonDetail] = useState("");
  const [resoursBOList, setresoursBOList] = useState<any[]>([]);
  const uploadCoverProps: UploadProps = {
    progress: {
      size: 3,
    },
  };
  const handleUploadCover = (cover: File) => {
    const formData: updateCover = {
      picFile: cover,
      lessonId: lessonId.e,
    };
    updateLessonCover(formData);
  };
  const handleUpName = () => {
    updateLessonName(lessonId.e, lessonName).then((res) => {
      if (res.data.success) {
        message.success(res.data.errorMsg);
      } else {
        message.error(res.data.errorMsg);
      }
    });
  };

  const handleUpInfo = () => {
    updateLessonInfo(lessonId.e, lessonDetail).then((res) => {
      if (res.data.success) {
        message.success(res.data.errorMsg);
      } else {
        message.error(res.data.errorMsg);
      }
    });
  };
  const navigate = useNavigate();
  const handleCreateWork = () => {
    // setIsCreateWork(false);
    navigate("/detailTeacher", { state: { lessonId: { lessonId } } });
  };

  useEffect(() => {
    if (lessonId) {
      getLessonInfo(lessonId).then((res) => {
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
    } else {
      return;
    }
  }, [lessonId]);
  return (
    <Layout className={styles.courseAll}>
      <>
        <Header className={styles.header}>
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

              <Button
                className={styles.newButtonDiv}
                onClick={handleCreateWork}
              >
                新建作业
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
                    <Tooltip
                      className={styles.resoursTooltip}
                      key={index}
                      title={"Download   " + item.name}
                    >
                      <a
                        href={item.url}
                        download={item.name}
                        className={styles.download}
                      >
                        <ContainerTwoTone className={styles.downloadIcon} />
                        {item.name}
                      </a>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Content>
      </>
    </Layout>
  );
};
export default UpdateLesson;
