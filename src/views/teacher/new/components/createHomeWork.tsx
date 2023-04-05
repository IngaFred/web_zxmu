import {
  Button,
  Card,
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  Row,
  Space,
  UploadFile,
} from "antd";
import React, { useState } from "react";
import styles from "./createHomeWork.module.scss";
import { RangePickerProps } from "antd/es/date-picker";
import { createHomeWork } from "../../../../service/course";
import MyUpload from "./lessonSourceUpload";
type LessonId = {
  //课程id
  lessonId: string;
};
//教师新建课程作业数据接口
type createBody = {
  lessonId: string;
  name: string;
  resourceList: string;
  info: string;
  start: string;
  end: string;
};
const { TextArea } = Input;
const CreateHomeWork = (lessonId: LessonId) => {
  const [workName, setWorkName] = useState("");
  const [workContent, setWorkContent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { RangePicker } = DatePicker;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange = (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList);
    info.fileList.forEach((file) => {
      file.status = "success";
    });
  };
  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((f) => f.uid !== file.uid));
  };
  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setStartTime(new Date(dateString[0]).getTime().toString());
    setEndTime(new Date(dateString[1]).getTime().toString());
  };
  const handleSubmit = () => {
    console.log(workName);
    console.log(workContent);
    console.log(startTime);
    console.log(endTime);
    const workBody: createBody = {
      lessonId: lessonId.lessonId,
      name: workName,
      resourceList: "",
      info: workContent,
      start: startTime,
      end: endTime,
    };
    createHomeWork(workBody).then((res) => {
      console.log(res);
    });
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
              />
            </Space>
          </Col>
        </Row>
        <Row className={styles.cardRow}>
          <Col span={4}>
            <label>上传资源:</label>
          </Col>
          <Col span={20}>
            <div
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "5px",
              }}
            >
              <MyUpload
                fileList={fileList}
                onChange={handleChange}
                onRemove={handleRemove}
                disabled={false}
              ></MyUpload>
            </div>
          </Col>
        </Row>
        <Row className={styles.cardRow}>
          <Col span={4} offset={20}>
            <Button style={{ marginLeft: "45px" }} onClick={handleSubmit}>
              保存
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CreateHomeWork;
