import {
  Card,
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  Row,
  Space,
} from "antd";
import React, { useState } from "react";
import styles from "./createHomeWork.module.scss";
import { RangePickerProps } from "antd/es/date-picker";
type LessonId = {
  //课程id
  lessonId: string;
};
const { TextArea } = Input;
const CreateHomeWork = (lessonId: LessonId) => {
  const [workName, setWorkName] = useState("");
  const [workContent, setWorkContent] = useState("");
  const { RangePicker } = DatePicker;

  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    console.log("onOk: ", value);
  };
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
          <Col span={20}>
            <TextArea
              showCount
              maxLength={500}
              style={{ height: 200 }}
              autoSize={false}
              placeholder="输入作业描述"
              value={workContent}
              onChange={(e) => setWorkContent(e.target.value)}
            ></TextArea>
          </Col>
        </Row>
        <Row className={styles.cardRow}>
          <Col span={4}>
            <label>开始结束时间:</label>
          </Col>
          <Col span={20}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <RangePicker
                size={"large"}
                style={{ width: "100%" }}
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                onOk={onOk}
              />
            </Space>
          </Col>
        </Row>
        <Row className={styles.cardRow}>
          <Col span={4}>
            <label>上传资源:</label>
          </Col>
          <Col span={20}></Col>
        </Row>
      </Card>
    </div>
  );
};

export default CreateHomeWork;
