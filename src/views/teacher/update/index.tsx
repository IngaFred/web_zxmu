import { UploadOutlined, ContainerTwoTone } from '@ant-design/icons';
import {
  Layout,
  Input,
  Button,
  Upload,
  Image,
  Tooltip,
  message,
  UploadProps,
  Select,
  UploadFile,
  Card,
} from 'antd';
import styles from './index.module.scss';
import {
  getLessonInfo,
  getModel,
  postCreateLesson,
  postUpdateLesson,
  updateLessonCover,
  updateLessonInfo,
  updateLessonName,
} from '../../../service/course';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyUpload from './components/my-upload';
import defaultClassCover from '../../../assets/images/course/defaultClassCover.jpg';

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
  const [lessonInfo, setLessonInfo] = useState('');
  const [lessonName, setLessonName] = useState('');
  const [lessonDetail, setLessonDetail] = useState<any>({});
  const [newResourceList, setNewResourceList] = useState<any[]>([]);

  const [resoursBOList, setresoursBOList] = useState<any[]>([]);

  useEffect(() => {
    console.log('newResourceList', newResourceList);
    const newResourceListIds = newResourceList.map((item) => item.resourceId);
    console.log('newResourceListIds', newResourceListIds);
  }, [newResourceList]);

  //模块
  const [modelList, setModelList] = useState<any[]>([]);
  const [modelData, setModelData] = useState<any[]>([]);
  const [modelId, setModelId] = useState('');
  const handleGetModelId = (modelId: string) => [setModelId(modelId)];
  //上传封面
  const [newCover, setNewCover] = useState<File>();

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

  useEffect(() => {
    getModel().then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setModelList(res.data.data);
        } else {
          message.warning(res.data.errorMsg);
        }
      } else {
        message.error('请求数据失败！');
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
    setModelId(modelList?.[0]?.modelId || '');
  }, [modelList]);

  const navigate = useNavigate();
  const handleCreateWork = () => {
    navigate('/detailTeacher', { state: { lessonId: { lessonId } } });
  };

  const fetchLessonInfo = useCallback(() => {
    getLessonInfo(lessonId).then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setLessonInfo(res.data.data.info);
          setLessonName(res.data.data.lessonName);
          setLessonDetail(res.data.data);
          setresoursBOList(res.data.data.resoursBOList);
        } else {
          message.warning(res.data.errorMsg);
        }
      } else {
        message.warning('请求失败!');
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
  const submitCreateLesson = () => {
    const newResourceListIds = newResourceList.map((item) => item.resourceId);
    if (lessonId) {
      postUpdateLesson({
        lessonId: lessonId.e,
        modelId: modelId,
        picFile: newCover,
        name: lessonName,
        info: lessonInfo,
        resourceList: newResourceListIds,
      }).then((res) => {
        if (res?.data?.success) {
          message.success(res?.data?.errorMsg);
          console.log('res?.data', res?.data);
          navigate('/courseTeacher', {
            state: { lessonId: { e: res?.data?.data?.lessonId } },
          });
        } else {
          message.error('请求数据失败！');
        }
      });
      return;
    }
    postCreateLesson({
      modelId: modelId,
      picFile: newCover,
      name: lessonName,
      info: lessonInfo,
      resourceList: newResourceListIds,
    }).then((res) => {
      if (res.data.success) {
        message.success(res?.data?.errorMsg);
        console.log('res?.data', res?.data);
        navigate('/courseTeacher', {
          state: { lessonId: { e: res?.data?.data?.lessonId } },
        });
      } else {
        message.error('请求数据失败！');
      }
    });
  };

  return (
    <Layout className={styles.courseAll}>
      <>
        <Header className={styles.header}>
          <div>
            <div className={styles.title}>
              <div className={styles.title}>
                <h1>模块选择：</h1>
                <Select
                  value={modelId}
                  options={modelData}
                  onChange={handleGetModelId}
                />
              </div>
              <Button
                className={styles.saveButton}
                type="primary"
                size="large"
                onClick={submitCreateLesson}
              >
                保存
              </Button>
            </div>
            <div className={styles.title}>
              <div className={styles.title}>
                <h1>课程名:</h1>
                <Input
                  style={{ width: '300px' }}
                  value={lessonName}
                  onChange={(e) => {
                    setLessonName(e.target.value);
                  }}
                ></Input>
              </div>
              <Button
                className={styles.newButtonDiv}
                onClick={handleCreateWork}
              >
                设置作业
              </Button>
            </div>

            <div className={styles.box}>
              <Image
                preview={false}
                style={{
                  width: '450px',
                  height: '320px',
                  borderRadius: '5px',
                }}
                src={lessonDetail.picUrl || defaultClassCover}
              />
              <TextArea
                className={styles.card}
                value={lessonInfo}
                onChange={(e) => {
                  setLessonInfo(e.target.value);
                }}
              ></TextArea>
            </div>
          </div>
          <div className={styles.upload}>
            <Upload
              {...uploadCoverProps}
              customRequest={(res) => {
                handleUploadCover(res.file as File);
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
                    display: resoursBOList.length === 0 ? 'inline' : 'none',
                  }}
                >
                  暂无资源
                </div>
                <div className={styles.resoursList}>
                  {resoursBOList.map((item, index) => (
                    <Tooltip
                      className={styles.resoursTooltip}
                      key={index}
                      title={'Download   ' + item.name}
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
                <Card className={styles.outlineCard}>
                  <div className={styles.outlineCardContent}>
                    <MyUpload
                      // fileList={fileList}
                      // onChange={handleChange}
                      // onRemove={handleRemove}
                      resourceList={newResourceList}
                      setNewResourceList={setNewResourceList}
                    ></MyUpload>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Content>
      </>
    </Layout>
  );
};
export default UpdateLesson;
