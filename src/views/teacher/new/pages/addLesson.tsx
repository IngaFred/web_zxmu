import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Layout, Input, Button, Upload, Card, Image } from "antd";
import styles from "../index.module.scss";
import defaultClassCover from "../../../../assets/images/course/defaultClassCover.jpg";
import { postCreateLesson } from "../../../../service/course";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;
const DisplayAdd = () => {
  const { Dragger } = Upload;
  const { TextArea } = Input;

  const [newName, setNewName] = useState("输入课程名");
  //创建课程数据接口
  type Lesson = {
    picFile?: File;
    name: string;
    info: string;
    resourceList: string[];
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
  const [newInfo, setNewInfo] = useState("输入简介");
  const [newResourceList, setNewResourceList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      postCreateLesson(createLesson);
    } else {
      return;
    }
  }, [createLesson, isSubmit]);
  const submitCreateLesson = () => {
    setCreateLesson({
      picFile: newCover,
      name: newName,
      info: newInfo,
      resourceList: newResourceList,
    });
    setIsSubmit(true);
  };

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
                <Dragger>
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

export default DisplayAdd;
