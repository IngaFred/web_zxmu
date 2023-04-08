import { Button, Card, Col, Empty, Row, Select, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getUnSubmit, getSubmit } from '../../../service/detailList';
import { useNavigate } from 'react-router-dom';
// 查看作业列表（展示作业某个作业里列表所有学生提交的列表，展示分数，批改状态）
// 吴振宇

export default function DetailList() {
  type homeworkId = {
    homeworkId: string;
    termId: String;
  };
  const [unSubimtStudent, setUnSubimtStudent] = useState<any[]>([]);
  const [SubimtStudent1, setSubimtStudent1] = useState<any[]>([]);
  const [SubimtStudent2, setSubimtStudent2] = useState<any[]>([]);

  useEffect(() => {
    const uId: homeworkId = {
      homeworkId: '1642606856576876544',
      termId: '1642563145096630272',
    };
    getUnSubmit(uId).then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg);

        setUnSubimtStudent(ret.data.data);
      } else {
        message.error('获取作业列表失败');
      }
    });
    getSubmit(uId).then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg);
        console.log(ret.data.data);
        setSubimtStudent1(ret.data.data[0]);
        setSubimtStudent2(ret.data.data[1]);
      } else {
        message.error('获取作业列表失败');
      }
    });
  }, []);
  return (
    <div className={styles.wrap}>
      <Row className={styles['top']}>
        <h1>xxx/xxx/批改作业</h1>
        <div className={styles['topCenter']}>
          <Space size={20}>
            <h1>标题：课程名 | </h1>
            <h1>数量：</h1>
          </Space>
          <Select
            defaultValue="2023年"
            style={{ width: '170px', marginRight: '20px' }}
            options={[
              {
                value: '2022年',
                lable: '2022年',
              },
              {
                value: '2021年',
                lable: '2021年',
              },
            ]}
          />
        </div>
      </Row>

      <div style={{ width: '100%' }}>
        <div className={styles.title}>未批改</div>
        <Row gutter={24}>
          {SubimtStudent1.length > 0 ? (
            SubimtStudent1.map((item, index) => (
              <>
                <HomeworkCard key={index} item={item} type="未批改" />
              </>
            ))
          ) : (
            <Col span={24}>
              <Empty description="无暂未批改作业" />
            </Col>
          )}
        </Row>
      </div>
      <div style={{ width: '100%' }}>
        <div className={styles.title}>未提交</div>

        <Row gutter={24}>
          {unSubimtStudent.length > 0 ? (
            unSubimtStudent.map((item, index) => (
              <StuCard key={index} item={item} />
            ))
          ) : (
            <Col span={24}>
              <Empty description="无暂未提交作业" />
            </Col>
          )}
        </Row>
      </div>
      <div style={{ width: '100%' }}>
        <div className={styles.title}>已批改</div>
        <Row gutter={24}>
          {SubimtStudent2.length > 0 ? (
            SubimtStudent2.map((item, index) => (
              <HomeworkCard key={index} item={item} type="已批改" />
            ))
          ) : (
            <Col span={24}>
              <Empty description="无暂已批改作业" />
            </Col>

          )}
        </Row>
      </div>
    </div>
  );
}

const HomeworkCard = (props: any) => {
  const { item, key, type } = props;
  const navigate = useNavigate();
  const goScoringTeacher = () => {
    navigate('/scoringTeacher', { state: { homeworkId: item.homeworkId } });
  };
  return (
    <Col span={4} key={key}>
      <div className={styles.homeworkItem}>
        {item?.user?.userName && (
          <div className={styles.stuName}>{item?.user?.userName}</div>
        )}
        {item?.score && (
          <div className={styles.score}>分数：{item?.score}分</div>
        )}
        {type === '已批改' && (
          <Button style={{ alignSelf: 'flex-end' }}>修改</Button>
        )}
        {type === '未批改' && (
          <Button style={{ alignSelf: 'flex-end' }} onClick={goScoringTeacher}>批改</Button>
        )}
      </div>
    </Col>
  );
};

const StuCard = (props: any) => {
  const { item, key } = props;
  return (
    <Col span={4} key={key}>
      <div className={styles.homeworkItem}>
        {item?.userName && (
          <div className={styles.stuName}>{item?.userName}</div>
        )}
      </div>
    </Col>
  );
};
