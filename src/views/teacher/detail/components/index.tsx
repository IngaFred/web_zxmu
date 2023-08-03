import { ContainerTwoTone } from "@ant-design/icons";
import { Layout, message, Card } from "antd";
import styles from "./index.module.scss";
import { getLessonInfo, getModel } from "../../../../service/myUpload";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyUpload from "./form-upload";

const { Content } = Layout;
interface LessonId {
  //课程id
  e: string;
}
interface MyUpload {
  setResourceIdList: (data: any[]) => void;
}

const UpdateLesson = (props: MyUpload) => {
  const { setResourceIdList } = props
  const location = useLocation();
  const lessonId: LessonId = location.state?.lessonId;
  //新增资源文件数组
  const [newResourceList, setNewResourceList] = useState<any[]>([]);

  const [resoursBOList, setresoursBOList] = useState<any[]>([]);

  useEffect(() => {
    //console.log('newResourceList', newResourceList);
    const newResourceListIds = newResourceList.map((item) => item.resourceId);
    setResourceIdList(newResourceListIds)
    // console.log('newResourceListIds', newResourceListIds);
  }, [newResourceList]);

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
          message.warning(res.data.errorMsg);
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
    getLessonInfo(lessonId).then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setresoursBOList(res.data.data.resoursBOList);
        } else {
          message.warning(res.data.errorMsg);
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

  return (
    <Layout className={styles.courseAll}>
      <>
        <div className={styles.outline}>
          <div>
            <div className={styles.outlineCardContent}>
              <Card className={styles.outlineCard}>
                <div className={styles.outlineCardContent}>
                  <MyUpload
                    resourceList={newResourceList}
                    setNewResourceList={setNewResourceList}
                  ></MyUpload>
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
