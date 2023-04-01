
// @ts-nocheck
import { ContainerTwoTone } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Empty,
  message,
  Row,
  Space,
  Tooltip,
  UploadFile,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDetails } from '../../../service/detail';
import MyEditor from './components/myEditor';
import MyUpload from './components/myUpload';
import styles from "./index.module.scss";


// 作业详情（查看作业，修改作业，提交作业，成果展示列表）
// 邱致彬
interface Resource {
  resourceId: string;
  belongId: string;
  userId: string;
  url: string;
  info: string;
}

export default function Show() {
  const location = useLocation();
  const { lessonId: myLesson, homeworkId: myHomework } = location?.state || {}; // 解构赋值

  const [homeworkBOList, setHomeworkBOList] = useState();
  const [myResoursBOList, setMyResoursBOList] = useState([]);

  // 使用useState创建一个本地状态fileList，用来存放文件列表
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // 定义一个handleChange函数，用来更新fileList状态
  const handleChange = (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList);
  };
  // 定义一个handleRemove函数，用来从fileList中移除文件
  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((f) => f.uid !== file.uid));
  };

  useEffect(() => {
    getDetails(myLesson).then((ret) => {
      // 使用可选链操作符来访问可能为undefined的属性
      const { success, data, errorMsg } = ret?.data || {};
      if (success) {
        message.success(errorMsg);
        const myHomeworkBOList = data.homeworkBOList.find(
          (v) => v.homeworkId === myHomework.hId
        ); // 使用find方法
        setHomeworkBOList(myHomeworkBOList);
        setMyResoursBOList(myHomeworkBOList.resoursBOList);
      } else {
        message.error('获取详细作业失败');
      }
    });
    return () => { };
  }, [myLesson, myHomework]);

  // 使用es6的解构赋值，来简化你对homeworkBOList对象的访问
  const { lessonName, name, creatorName, start, end, info } =
    homeworkBOList || {};

  // const SubmitEvent = () => { };

  return (
    <div className={styles.detailALL}>
      <Row justify={'space-between'} className={styles.detailHeader}>
        <h2>作业作答</h2>
        <Space size={'middle'}>
          {/* <Button>保存</Button> */}
          {/* <Button type="primary" onClick={SubmitEvent}>
            提交
          </Button> */}
        </Space>
      </Row>

      <Row gutter={24}>
        <Col span={20}>
          <Row className={styles.head}>
            <h1>
              {lessonName} | {name}
            </h1>
            <div className="sh">
              
            </div>
          </Row>
          {/* InfoRow 封装组件 */}
          <InfoRow label="发布人：" value={creatorName} />
          <InfoRow
            label="发布日期："

            value={new Date(homeworkBOList?.start || '').toLocaleString(
              'zh-CN',
              {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              }
            )}
          />
          <InfoRow
            label="截止日期："
            value={new Date(homeworkBOList?.end || '').toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
          <Row className={styles.info}>
            <p className={styles['info-p']}>{info}</p>
          </Row>
          {/* 富文本控件 */}
          <MyEditor />
        </Col>
        {/* 资源下载控件 */}
        <Col span={4}>
          <Card size="small" title="作业资源">
            <Space direction={'vertical'} align={'center'}>
              <Row>
                {myResoursBOList?.length > 0 ? (
                  myResoursBOList?.map((item: Resource, index) => (
                    <Tooltip key={index} title={'下载'} color="grey">
                      <a href={item?.url} className={styles.download}>
                        <ContainerTwoTone style={{ fontSize: '40px' }} />
                      </a>
                    </Tooltip>
                  ))
                ) : (
                  <Empty description="暂无可下载资源" />
                )}
              </Row>
            </Space>
          </Card>
          {/* 文件上传控件 */}
          {/* <Card size="small" title="作业资源" className={styles.upload}>
            <Space direction={'vertical'} align={'center'}>

              <Row>
                {myResoursBOList?.length > 0 ? (
                  myResoursBOList?.map((item: Resource, index) => (
                    <Tooltip key={index} title={'下载'} color="grey">
                      <a href={item?.url} className={styles.download}>
                        <ContainerTwoTone style={{ fontSize: '40px' }} />
                      </a>
                    </Tooltip>
                  ))
                ) : (
                  <Empty description="暂无可下载资源" />
                )}
              </Row>
            </Space>
          </Card> */}
        </Col>
      </Row>
      <Row>
      <Col classname="zs" span={24}>col</Col>
    </Row>
    <Row>
      <Col classname="zs" span={24}>col</Col>
    </Row> <Row>
      <Col classname="zs" span={24}>col</Col>
    </Row> <Row>
      <Col classname="zs" span={24}>col</Col>
    </Row> <Row>
      <Col classname="zs" span={24}>col</Col>
    </Row>
    
    </div>
  );
}
// 自定义组件，来封装一些重复的逻辑和样式
function InfoRow(props: { label: string; value: string | undefined }) {
  return (
    <Row className={styles.infoHead}>
      <span>{props.label}</span>
      <p>{props.value}</p>
    </Row>
  );
}
