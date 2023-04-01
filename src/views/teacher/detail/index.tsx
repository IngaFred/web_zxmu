import React from "react";
import {
  Row,
  Space,
  Button,
  Form,
  Input,
  message,
  DatePicker,
  Upload,
} from "antd";
import type { UploadProps } from "antd";
import styles from "./index.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { postUploadFile } from "../../../service/teacherdetail";
//蔡启航
export default function Detail() {
  const [form] = Form.useForm();
  const submitEvent = (e: any) => {
    console.log("submitEvent", e);
  };
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <div className={styles.detailALL}>
          <Row justify={"space-between"} className={styles.detailHeader}>
            <h2>作业发布</h2>
            <Space size={"middle"}>
              {/* <Button>保存</Button> */}
              <Button
                type="primary"
                onClick={() => {
                  console.log("form", form);
                  const values = form?.getFieldsValue();
                  console.log(" form?.getFieldsValue()", values);
                  const newObj = {
                    name: values.name,
                    info: values.info,
                    /* start: values.time?.[0]?.valueOf?.(),
                    end: values.time?.[1]?.valueOf?.(), */
                  };
                  console.log("newObj", newObj);
                  postUploadFile(values);
                }}
              >
                新建作业
              </Button>
            </Space>
          </Row>

          <Form.Item name="name" label="作业名称">
            <Input />
          </Form.Item>

          {/* <Form.Item name="time" label="作业时间">
            <RangePicker />
          </Form.Item> */}

          <Form.Item name="info" label="作业内容介绍">
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
        </div>
      </Form>
    </>
  );
}
