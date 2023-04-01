import React from "react";
import { Row, Space, Button, Form, Input, DatePicker, Upload } from "antd";
import styles from "./index.module.scss";
import { PlusOutlined } from "@ant-design/icons";

//蔡启航
export default function Detail() {
  const SubmitEvent = () => {};
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  return (
    <>
      <div className={styles.detailALL}>
        <Row justify={"space-between"} className={styles.detailHeader}>
          <h2>作业发布</h2>
          <Space size={"middle"}>
            {/* <Button>保存</Button> */}
            <Button type="primary" onClick={SubmitEvent}>
              新建作业
            </Button>
          </Space>
        </Row>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="作业名称">
            <Input />
          </Form.Item>

          <Form.Item label="作业开始时间">
            <RangePicker />
          </Form.Item>
          <Form.Item label="作业结束时间">
            <RangePicker />
          </Form.Item>

          <Form.Item label="作业内容介绍">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="上传文件" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
