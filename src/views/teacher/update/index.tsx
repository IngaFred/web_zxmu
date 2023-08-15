import { Layout, Row, message } from 'antd';
import styles from './index.module.scss';
import MyUpload from '../../../components/upload';
import ShowUpload from './components/showUpload';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { getLessonInfo } from "../../../service/course";




const UpdateLesson = () => {
  const location = useLocation();
  const lessonId = location.state.lessonId;

  //已上传的资源列表
  const [resoursBOList, setresoursBOList] = useState<any[]>([]);
  //新增资源id的数组
  const [resourceIdLists, setResourceIdLists] = useState<string[]>([]);
  //删除资源id的数组
  const [deleteResourceIdList, setDeleteResourceIdList] = useState<string[]>([]);

  useEffect(() => {
    getLessonInfo(lessonId)
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          setresoursBOList(res.data.data.resoursBOList);
        } else {
          message.warning(res.data.errorMsg);
        }
      });
  }, []);

  return (
    <Layout className={styles.courseAll}>
      <>
        <Row gutter={24}>
          <ShowUpload
            resourceIdLists={resourceIdLists}
            deleteResoursIdList={deleteResourceIdList}
          />
        </Row>
        <Row gutter={24}>
          <MyUpload
            resoursBOList={resoursBOList}
            getNewResourceIdLists={setResourceIdLists}
            getDeleteResoursIdList={setDeleteResourceIdList}
          />
        </Row>
      </>
    </Layout>
  );
};
export default UpdateLesson;
