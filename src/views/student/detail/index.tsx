import { Button, Row, Space } from "antd";
import React from "react";
import styles from "./index.module.scss";
// 作业详情（查看作业，修改作业，提交作业，成果展示列表）
// 邱致彬
export default function Detail() {
  return (
    <div className={styles.detail}>
      <Row>
        <h3>作业</h3>
        <Space>
          <Button>保存</Button>
          <Button>提交</Button>
        </Space>
      </Row>
    </div>
  );
}
