import { Layout, Row } from 'antd';
import styles from './index.module.scss';
import MyUpload from '../../../components/upload';
import ShowUpload from './components/showUpload';
import { useEffect, useState } from 'react';



const UpdateLesson = () => {
  //新增资源id的数组
  const [resourceIdLists, setResourceIdLists] = useState<string[]>([]);
  //删除资源id的数组
  const [deleteResoursIdList, setDeleteResoursIdList] = useState<string[]>([]);

  // 用于检测子传父的id数据内容
  // useEffect(() => {
  //   console.log(deleteResoursIdList);
  // }, [deleteResoursIdList]);

  return (
    <Layout className={styles.courseAll}>
      <>
        <Row gutter={24}>
          <ShowUpload
            resourceIdLists={resourceIdLists}
            deleteResoursIdList={deleteResoursIdList}
          />
        </Row>
        <Row gutter={24}>
          <MyUpload
            getResourceLists={setResourceIdLists}
            deleteResoursIdList={deleteResoursIdList}
            setDeleteResoursIdList={setDeleteResoursIdList}
          />
        </Row>
      </>
    </Layout>
  );
};
export default UpdateLesson;
