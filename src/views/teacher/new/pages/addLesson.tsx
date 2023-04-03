import { UploadOutlined } from "@ant-design/icons";
import { Layout, Input, Button, Upload, Card, Image, UploadFile } from "antd";
import styles from "../index.module.scss";
import defaultClassCover from "../../../../assets/images/course/defaultClassCover.jpg";
import { postCreateLesson } from "../../../../service/course";
import { useEffect, useState } from "react";
import MyUpload from "../components/lessonSourceUpload";
const { Header, Content } = Layout;
const DisplayAdd = () => {
  //创建课程数据接口
  type Lesson = {
    picFile?: File;
    name: string;
    info: string;
    resourceList: string[];
  };
  const { TextArea } = Input;
  const [newInfo, setNewInfo] = useState("输入简介");
  const [newResourceList, setNewResourceList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [newName, setNewName] = useState("输入课程名");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange = (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList);
  };
  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((f) => f.uid !== file.uid));
  };
  const [createLesson, setCreateLesson] = useState<Lesson>({
    picFile: new File([defaultClassCover], "defaultClassCover.jpg", {
      type: "image/jpeg",
    }),
    name: "",
    info: "",
    resourceList: [],
  });
  const [newCover, setNewCover] = useState(
    new File([defaultClassCover], "defaultClassCover.jpg", {
      type: "image/jpeg",
    })
  );
  const submitCreateLesson = () => {
    setCreateLesson({
      picFile: newCover,
      name: newName,
      info: newInfo,
      resourceList: newResourceList,
    });
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      postCreateLesson(createLesson);
    } else {
      return;
    }
  }, [createLesson, isSubmit]);
  return (
    <Layout className={styles.courseAll}>
      <Header className={styles.header}>
        <div>
          <div>
            <div className={styles.title}>
              <h1>课程名:</h1>
              <Input
                style={{ width: "300px" }}
                value={newName}
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              ></Input>
              <Button
                className={styles.saveButton}
                type="primary"
                size="large"
                onClick={submitCreateLesson}
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
                value={newInfo}
                onChange={(e) => {
                  setNewInfo(e.target.value);
                }}
              ></TextArea>
            </div>
          </div>
          <div className={styles.upload}>
            <Upload
              customRequest={(res) => {
                setNewCover(res.file as File);
              }}
            >
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
                <MyUpload
                  fileList={fileList}
                  onChange={handleChange}
                  onRemove={handleRemove}
                  disabled={false}
                ></MyUpload>
              </div>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default DisplayAdd;