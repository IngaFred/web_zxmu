import { Button, Card, Col, Row, Space } from "antd";
import React from "react";
import MyEditor from "./components/myEditor";
import MyUpload from "./components/myUpload";
import styles from "./index.module.scss";
// 作业详情（查看作业，修改作业，提交作业，成果展示列表）
// 邱致彬
export default function Detail() {
  return (
    <div className={styles.detailALL}>
      <Row justify={"space-between"} className={styles.detailHeader}>
        <h1>作业作答</h1>
        <Space size={'middle'}>
          <Button>保存</Button>
          <Button type="primary">提交</Button>
        </Space>
      </Row>

      <Row gutter={24}>
        <Col span={20}>
          <Row>
            <h2>《计算机作业详情》</h2>
          </Row>
          <Row className={styles.infoHead}>
            <span>题量: 1/</span>
            <span>满分: 100.0/</span>
            <p>创建者: xxx/</p>
            <p>
              作答时间: <time>03-25 20:36</time>至<time>04-07 23:55</time>
            </p>
          </Row>
          <Row>
            <h3>一. 作业类型（共1题，100分）</h3>
          </Row>
          <Row className={styles.infoHead}>
            <p>作业介绍</p>
          </Row>
          <MyEditor />
        </Col>

        <Col span={4}>
          <Card size="small" title="作业选题">
            <Space direction={"vertical"} align={"center"}>
              <Button>第一题</Button>
              <Button>第二题</Button>
            </Space>
          </Card>
          <Card size="small" title="文件选择" className={styles.upload}>
            <MyUpload />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
