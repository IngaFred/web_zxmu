import { Card, Col, Input, Row } from "antd";
import React, { useState } from "react";
import styles from "./createHomeWork.module.scss";
type LessonId = {
  //课程id
  lessonId: string;
};
const { TextArea } = Input;
const CreateHomeWork = (lessonId: LessonId) => {
  const [workName, setWorkName] = useState("");
  const [workContent, setWorkContent] = useState("");
  return (
    <div className={styles.div}>
      {/* 作业名称 作业描述 作业资源 开始时间 结束时间 */}
      <Card className={styles.card} title={"新建作业"}>
        <Row>
          <Col span={4}>
            <label>作业名称:</label>
          </Col>
          <Col span={20}>
            <Input
              value={workName}
              onChange={(e) => setWorkName(e.target.value)}
            ></Input>
          </Col>
        </Row>
        <Row className={styles.cardRow}>
          <Col span={4}>
            <label>作业描述:</label>
          </Col>
          <Col className={styles.cardTextArea} span={20}></Col>
        </Row>
      </Card>
      <TextArea
        className={styles.cardTextArea}
        autoSize={false}
        placeholder="输入作业描述"
        value={workContent}
        onChange={(e) => setWorkContent(e.target.value)}
      ></TextArea>
    </div>
  );
};

export default CreateHomeWork;
