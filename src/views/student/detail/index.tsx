import { Button, Card, Col, Row, Space } from "antd";
import React from "react";
import styles from "./index.module.scss";
// 作业详情（查看作业，修改作业，提交作业，成果展示列表）
// 邱致彬
export default function Detail() {
  return (
    <div className={styles.detailALL}>
      <Row
        justify={"space-between"}
        align="middle"
        className={styles.detailHeader}
      >
        <h2>作业作答</h2>
        <Space>
          <Button>保存</Button>
          <Button type="primary">提交</Button>
        </Space>
      </Row>

      <Row gutter={24}>
        <Col span={16} className={styles.col1}>
          <h1>《计算机网络》考核表</h1>

          <Row className={styles.infoHead}>
            <span>题量: 1</span>
            <span>满分: 100.0</span>
            <p>创建者: xxx</p>
            <p>
              作答时间: <time>03-25 20:36</time>至<time>04-07 23:55</time>
            </p>
          </Row>

          <h2>一. 其它（共1题，100）</h2>

          <p>
            <span>1. (其它)</span>
            <p>各位同学：填下个人信息栏，即可直接上传</p>
          </p>
        </Col>
        
        <Col span={8} className={styles.col2}>
          <Card
            size="default"
            title="选题"
            style={{ width: 400 }}
          >
            <Button>第一题</Button>
            <Button>第二题</Button>
            <Button>第三题</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
