import { ContainerTwoTone, CloseCircleOutlined } from "@ant-design/icons";
import { Layout, message, Card, Button, Tag } from "antd";
import styles from "./index.module.scss";
import { getLessonInfo, getModel } from "../../service/myUpload";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Upload from "./myUpload";

interface LessonId {
  //课程id
  e: string;
}

interface MyUpload {
  //父组件传递的资源数组（通常是修改时所需的已上传资源列表）
  resoursBOList: any[]
  //子传父的调用函数，用于向父组件传递新增资源id数组
  getNewResourceIdLists: (data: any[]) => void;
  //子传父的调用函数，用于向父组件传递删除资源id数组
  getDeleteResoursIdList: (data: any[]) => void;
}

const UpdateLesson = (props: MyUpload) => {
  const { resoursBOList, getNewResourceIdLists, getDeleteResoursIdList } = props
  const location = useLocation();
  const lessonId: LessonId = location.state?.lessonId;
  //拖拽上传文件子组件传递过来的新增资源对象数组
  const [newResourceList, setNewResourceList] = useState<any[]>([]);
  //删除资源id数组
  const [deleteResourceIdList, setDeleteResourceIdList] = useState<string[]>([]);

  //监听新增资源id数组，遍历子组件传来的资源上传成功接口的对象数组，获取资源id列表数组并向父组件传递
  useEffect(() => {
    const newResourceListIds = newResourceList.map((item) => item.resourceId);
    // console.log(newResourceListIds);
    getNewResourceIdLists(newResourceListIds)
  }, [newResourceList]);
  //监听删除资源id数组
  useEffect(() => {
    // console.log(deleteResourceIdList);
    getDeleteResoursIdList(deleteResourceIdList)
  }, [deleteResourceIdList]);

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

  // const fetchLessonInfo = useCallback(() => {
  //   // //console.log('getLessonUpload :>> ');
  //   getLessonInfo(lessonId).then((res) => {
  //     if (res.status === 200) {
  //       if (res.data.success) {
  //         // setresoursBOList(res.data.data.resoursBOList);
  //       }
  //     } else {
  //       message.warning("请求失败!");
  //     }
  //   });
  // }, [lessonId]);

  // useEffect(() => {
  //   if (lessonId) {
  //     fetchLessonInfo();
  //   } else {
  //     return;
  //   }
  // }, [lessonId]);

  //资源文件下载
  const handleDownload = (url: string) => {
    fetch(url, { mode: "cors" })
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

  const handleClose = (id: number) => {
    // console.log(resoursBOList[id].resourceId);
    //往删除资源id数组里添加id，
    setDeleteResourceIdList([...deleteResourceIdList, resoursBOList[id].resourceId])
  }

  return (
    <Layout className={styles.courseAll}>
      <>
        <div className={styles.outline}>
          <div>
            <div className={styles.resoursListTitle}>已上传资源</div>
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
                  // <div style={{ display: "flex", padding: "5px" }}>
                  //   <a
                  //     href={item.url}
                  //     download={item.name}
                  //     className={styles.download}
                  //     key={index}
                  //     target="_blank"
                  //     rel="noreferrer"
                  //   // onClick={() => handleDownload(item.url)}
                  //   >
                  //     <ContainerTwoTone className={styles.downloadIcon} />
                  //     {item.name}
                  //   </a>
                  //   {/* <Button
                  //     onClick={() => handleDownload(item.url)}
                  //     size="small"
                  //     style={{ marginLeft: "20px" }}
                  //   >
                  //     下载
                  //   </Button> */}
                  //   <Button
                  //     onClick={() => handleDownload(item.url)}
                  //     size="small"
                  //     style={{ marginLeft: "20px" }}
                  //   >

                  //   </Button>
                  // </div>
                  <div style={{ margin: "5px 0" }}>
                    <Tag
                      // color="processing"
                      closable
                      closeIcon={<CloseCircleOutlined />}
                      key={index}
                      style={{ fontSize: "1rem", padding: "4px 7px" }}
                      onClose={() => handleClose(index)}
                    >
                      <span>{item?.name}</span>
                    </Tag>
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
