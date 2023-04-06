import { Button, Card, Col, Empty, Row, Select, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";
import { getUnSubmit, getSubmit } from "../../../service/detailList"
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
      homeworkId: "1642606856576876544",
      termId: "1642563145096630272"
    }
    getUnSubmit(uId).then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg)

        setUnSubimtStudent(ret.data.data);
      } else {
        message.error('获取作业列表失败');
      }
    });
    getSubmit(uId).then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg)
        console.log(ret.data.data);
        setSubimtStudent1(ret.data.data[0]);
        setSubimtStudent2(ret.data.data[1]);

      } else {
        message.error('获取作业列表失败');
      }

    });
  }, [])
  return (
    <div>
      <Row className={styles['top']}>
        <h1>xxx/xxx/批改作业</h1>
        <div className={styles['topCenter']}>
          <Space size={20}>
            <h1>标题：课程名  | </h1>
            <h1>数量：</h1>
          </Space>
          <Select
            defaultValue="2023年"
            style={{ width: '170px', marginRight: '20px' }}
            options={[
              {
                value: '2022年',
                lable: '2022年'
              }, {
                value: '2021年',
                lable: '2021年'
              }
            ]}
          />
        </div>
      </Row>

      <Card
        title="未批改"
        style={{ width: '100%', }}
      >
        <Row gutter={24}>
          {SubimtStudent1.length > 0 ? (SubimtStudent1.map((item, index) => (

            <>
              <Col span={6} key={index}>
                <Card
                  key={index}
                  hoverable={true}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
                    <h1>{item.user.userName}</h1>
                    <Button style={{ alignSelf: 'flex-end' }}>批改</Button>
                  </div>

                </Card>
              </Col>


            </>
          ))) : <Empty description='无暂未批改作业' />}

        </Row>

      </Card>
      <Card
        title="未提交"
        style={{ width: '100%' }}
      >
        <Row gutter={24}>
          {unSubimtStudent.length > 0 ? (unSubimtStudent.map((item, index) => (
            <>
              <Col span={6} key={index}>
                <Card
                  key={index}
                  hoverable={true}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
                    <h1>{item.userName}</h1>
                    {/* <Button style={{ alignSelf: 'flex-end' }}>批改</Button> */}
                  </div>

                </Card>
              </Col>


            </>
          ))) : <Empty description='无暂未提交作业' />}

        </Row>
      </Card>
      <Card
        title="已批改"
        style={{ width: '100%', height: '400px' }}
      >
        <Row gutter={24}>
          {SubimtStudent2.length > 0 ? (SubimtStudent2.map((item, index) => (

            <>
              <Col span={6} key={index}>
                <Card
                  key={index}
                  hoverable={true}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
                    <h1>{item.user.userName}</h1>
                    <h2>分数：{item.score}分</h2>
                    <Button style={{ alignSelf: 'flex-end' }}>修改</Button>
                  </div>

                </Card>
              </Col>


            </>
          ))) : <Empty description='无暂未已批改作业' />}

        </Row>
      </Card>



    </div>
  )
}
