import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, DatePicker } from "antd";
import styles from "./index.module.scss";
import {
  getCourseInfo,
  changeWorkName,
  changeWorkInfo,
} from "../../../service/changeWork";
import { useLocation } from "react-router-dom";
export default function Detail() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const location = useLocation();
  const lessonId: string = location.state?.lessonId.e;
  const [homeWorkId, setHomeWorkId] = useState("");
  const [preName, setPreName] = useState("");
  const [preInfo, setPreInfo] = useState("");
  useEffect(() => {
    getCourseInfo(lessonId).then((res) => {
      if (res.status === 200) {
        if (Object.keys(res.data.data).length !== 0) {
          form.setFieldsValue({
            Name: res.data.data.name,
            Info: res.data.data.info,
          });
          setPreName(res.data.data.name);
          setPreInfo(res.data.data.info);
          setHomeWorkId(res.data.data.homeworkId);
        } else {
          message.info("暂无课程信息！");
        }
      } else {
        message.error("获取课程信息失败！");
      }
    });
  }, []);
  return (
    <div className={styles.detailALL}>
      <div className={styles.detailHeader}>
        <div className={styles.title}>新建作业</div>
        <div>
          <Button
            className={styles.btn}
            type="primary"
            onClick={() => {
              const values = form?.getFieldsValue();
              if (values.Name === preName && values.Info === preInfo) {
                return;
              }
              if (values.Name === preName && values.Info !== preInfo) {
                changeWorkInfo(homeWorkId, values.Info).then((res: any) => {
                  message.success(res.data.errorMsg);
                });
                setPreInfo(values.Info);
              }
              if (values.Name !== preName && values.Info === preInfo) {
                changeWorkName(homeWorkId, values.Name).then((res: any) => {
                  message.success(res.data.errorMsg);
                });
                setPreName(values.Name);
              }
              if (values.Name !== preName && values.Info !== preInfo) {
                changeWorkName(homeWorkId, values.Name).then((res: any) => {
                  message.success(res.data.errorMsg);
                });
                changeWorkInfo(homeWorkId, values.Info).then((res: any) => {
                  message.success(res.data.errorMsg);
                });
                setPreInfo(values.Info);
                setPreName(values.Name);
              }
            }}
          >
            作业发布
          </Button>
        </div>
      </div>

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        className={styles.form}
      >
        <div>
          <Form.Item name="Name" label="作业名称">
            <Input />
          </Form.Item>
          <Form.Item name="Info" label="作业内容">
            <TextArea className={styles.text} style={{ width: "1000px" }} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
