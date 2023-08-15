import React, { useEffect, useState } from "react";
import {
  Row,
  Space,
  Button,
  Form,
  Input,
  message,
  DatePicker,
  Upload,
  Descriptions
} from "antd";
import styles from "./index.module.scss";
import { setHomework } from "../../../service/teacherdetail";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import MyUpload from "./components";
import { useLocation, useNavigate } from "react-router-dom"

export default function Detail() {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const navigate = useNavigate();
  const location = useLocation()
  const { lessonId, lessonName } = location.state.lessonInfo
  const [resourceIdList, setResourceIdList] = useState<string[]>([]);
  // const [fileList, setFileList] = useState([]);
  // //console.log('fileList', fileList);
  // useEffect(() => {
  // 	setFileList(fileList);
  // }, [fileList]);

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
              const newHomework = {
                lessonId: lessonId,
                name: values.Name,
                info: values.Info,
                // start: new Date(values.RangePicker[0]).getTime(),
                // end: new Date(values.RangePicker[1]).getTime(),
                resourceList: resourceIdList,
              };
              //console.log('newObj--->', newHomework);
              setHomework(newHomework).then((res) => {
                // console.log(res);
                if (res.data.success === true) {
                  message.success(res.data.errorMsg);
                }
              });
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
        encType="multipart/form-data"
      >
        <div>
          <Form.Item name="LessonId" label="所属课程">
            <span>{lessonName}</span>
          </Form.Item>

          <Form.Item name="Name" label="作业名称">
            <Input />
          </Form.Item>

          {/* <Form.Item name="RangePicker" label="时间设置">
            <RangePicker showTime locale={locale} />
          </Form.Item> */}

          <Form.Item name="Info" label="作业内容">
            <TextArea className={styles.text} style={{ width: "1000px" }} />
          </Form.Item>
        </div>

        <Form.Item label="上传资料" valuePropName="fileList">
          <div>
            <MyUpload
              setResourceIdList={setResourceIdList}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
