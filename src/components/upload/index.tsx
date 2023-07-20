import { ContainerTwoTone } from "@ant-design/icons";
import { Layout, message, Card, Button } from "antd";
import styles from "./index.module.scss";
import { getLessonInfo, getModel } from "../../service/myUpload";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Upload from "./myUpload";

const { Content } = Layout;
interface LessonId {
  //课程id
  e: string;
}

interface MyUpload {
  getResourceLists: (resourceLists: string[]) => void;
}

const UpdateLesson = (props: MyUpload) => {
  const location = useLocation();
  const lessonId: LessonId = location.state?.lessonId;
  const [newResourceList, setNewResourceList] = useState<any[]>([]);
  const [resoursBOList, setresoursBOList] = useState<any[]>([]);
  const [resourceLists, setResoursLists] = useState<string[]>();

  useEffect(() => {
    const newResourceListIds = newResourceList.map((item) => item.resourceId);
    props.getResourceLists = (resourceLists) => {
      resourceLists = newResourceListIds;
    };
    // //console.log('newResourceListIds', resourceLists);
  }, [resourceLists]);

  //模块
  const [modelList, setModelList] = useState<any[]>([]);
  const [modelData, setModelData] = useState<any[]>([]);
  const [modelId, setModelId] = useState("");
  const handleGetModelId = (modelId: string) => [setModelId(modelId)];

  useEffect(() => {
    getModel().then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setModelList(res.data.data);
        } else {
          // message.warning(res.data.errorMsg);
        }
      } else {
        message.error("请求数据失败！");
      }
    });
  }, []);

  useEffect(() => {
    setModelData(
      modelList.map((item: any) => {
        return {
          value: item.modelId,
          label: item.name,
        };
      })
    );
    setModelId(modelList?.[0]?.modelId || "");
  }, [modelList]);

  const fetchLessonInfo = useCallback(() => {
    // //console.log('getLessonUpload :>> ');
    getLessonInfo(lessonId).then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setresoursBOList(res.data.data.resoursBOList);
        }
      } else {
        message.warning("请求失败!");
      }
    });
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) {
      fetchLessonInfo();
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
      <>
        <div className={styles.outline}>
          <div>
            <div className={styles.resoursListTitle}>资源下载</div>
            <div className={styles.outlineCardContent}>
              <div
                style={{
                  display: resoursBOList.length === 0 ? "inline" : "none",
                  marginLeft: "20px",
                  fontSize: "16px",
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
                      target="_blank"
                      rel="noreferrer"
                      // onClick={() => handleDownload(item.url)}
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
              <Card className={styles.outlineCard}>
                <div className={styles.outlineCardContent}>
                  <Upload
                    resourceList={newResourceList}
                    setNewResourceList={setNewResourceList}
                  ></Upload>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};
export default UpdateLesson;
