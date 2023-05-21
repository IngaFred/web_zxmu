import { Layout, Row } from 'antd';
import styles from './index.module.scss';
import MyUpload from '../../../components/upload';
import ShowUpload from './components/showUpload';

const UpdateLesson = () => {
  return (
    <Layout className={styles.courseAll}>
      <>
        <Row gutter={24}>
          <ShowUpload />
        </Row>
        <Row gutter={24}>
          <MyUpload getResourceLists={() => {}} />
        </Row>
      </>
    </Layout>
  );
};
export default UpdateLesson;
