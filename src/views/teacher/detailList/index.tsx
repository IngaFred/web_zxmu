import { Button, Card, Col, Row, Select } from 'antd'
import React from 'react'
import styles from "./index.module.scss";
// 查看作业列表（展示作业某个作业里列表所有学生提交的列表，展示分数，批改状态）
// 吴振宇
export default function DetailList() {
  return (
    <div>
      <Row className={styles['top']}>
        <h1>xxx/xxx/批改作业</h1>
          <div className={styles['topcenter']}>
            <h1>标题：课程名</h1>
            <h1>数量：</h1>
            <Select
              defaultValue="2023年"
              style={{width:'170px',marginRight:'20px'}}
              options={[
                {
                  value:'2022年',
                  lable:'2022年'
                },{
                  value:'2021年',
                  lable:'2021年'
                }
              ]}
            />
          </div>
      </Row>
      <Card
        title="未批改"
        style={{width:'100%',height:'400px'}}
      >
        <Row>
          <Col span={6} style={{backgroundColor:'gray'}}>
            <div style={{height:'100px',width:'160px',margin:'auto',backgroundColor:'brown',padding:'10px',display:'flex',flexDirection:'column',justifyContent:"space-between"}}>
              <h1>名字</h1>
              <Button style={{width:'50px',padding:'0',alignSelf:'flex-end'}}>批改</Button>
            </div>
          </Col>
          <Col span={6} style={{backgroundColor:'green'}}></Col>
          <Col span={6} style={{backgroundColor:'red'}}></Col>
          <Col span={6} style={{backgroundColor:'yellow'}}></Col>
        </Row>

      </Card>
      <Card
        title="已批改"
        style={{width:'100%',height:'400px'}}
      >

      </Card>
    </div>
  )
}
