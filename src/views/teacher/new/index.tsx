import { UploadOutlined } from "@ant-design/icons";
import {
  Layout,
  Input,
  Button,
  Upload,
  Card,
  Image,
  UploadFile,
  UploadProps,
  Select,
  message,
} from "antd";
import styles from "./index.module.scss";
import defaultClassCover from "../../../assets/images/course/defaultClassCover.jpg";
import { getModel, postCreateLesson } from "../../../service/course";
import { useEffect, useState } from "react";
import MyUpload from "./components/lessonSourceUpload";
const { Header, Content } = Layout;
const DisplayAdd = () => {
  //创建课程数据接口
  type Lesson = {
    modelId: string;
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
  //模块
  const [modelList, setModelList] = useState([]);
  const [modelData, setModelData] = useState<any[]>([]);
  const [modelId, setModelId] = useState("");
  //上传封面
  const defaultImg = new File([defaultClassCover], "defaultClassCover.jpg", {
    type: "image/jpeg",
  });
  const props: UploadProps = {
    onChange({ file }) {
      file.status = "success";
    },
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange = (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList);
    info.fileList.forEach((file) => {
      file.status = "success";
    });
  };
  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((f) => f.uid !== file.uid));
  };
  const [createLesson, setCreateLesson] = useState<Lesson>({
    modelId: "",
    picFile: new File([defaultClassCover], "defaultClassCover.jpg", {
      type: "image/jpeg",
    }),
    name: "",
    info: "",
    resourceList: [],
  });
  const handleGetModelId = (modelId: string) => [setModelId(modelId)];
  const [newCover, setNewCover] = useState(
    new File([defaultClassCover], "defaultClassCover.jpg", {
      type: "image/jpeg",
    })
  );
  const submitCreateLesson = () => {
    setCreateLesson({
      modelId: modelId,
      picFile: newCover,
      name: newName,
      info: newInfo,
      resourceList: newResourceList,
    });
    setIsSubmit(true);
  };
  useEffect(() => {
    getModel().then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setModelList(res.data.data);
        } else {
          message.warning(res.data.errorMsg);
        }
      } else {
        message.error("请求数据失败！");
      }
      // console.log(res);
    });
  }, []);
  useEffect(() => {
    if (isSubmit) {
      postCreateLesson(createLesson).then((res) => {
        if (res.status === 200) {
          if (res.data.success) {
            message.success(res.data.errorMsg);
          }
        } else {
          message.error("请求数据失败！");
        }
        // console.log(res);
      });
    } else {
      return;
    }
  }, [createLesson, isSubmit, newCover]);
  useEffect(() => {
    setModelData(
      modelList.map((item: any) => {
        return {
          value: item.modelId,
          label: item.name,
        };
      })
    );
  }, [modelList]);
  return (
    <Layout className={styles.courseAll}>
      <Header className={styles.header}>
        <div>
          <div>
            <div>
              <h1>模块选择：</h1>
              <Select
                defaultValue={"请选择模块"}
                options={modelData}
                onChange={handleGetModelId}
              />
            </div>
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
              {...props}
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
          </div>
        </div>
      </Header>
      <Content>
        <div className={styles.outline}>
          <div>
            <div className={styles.resoursListTitle}>
              <h1>课程资源</h1>
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
