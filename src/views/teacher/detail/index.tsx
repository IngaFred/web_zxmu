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
  TreeSelect,
} from "antd";
import styles from "./index.module.scss";
import { setHomework } from "../../../service/teacherdetail";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import MyUpload from "./components";
import { getCourseList } from "../../../service/courseList";

export default function Detail() {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;

  const [resourceList, setResourceList] = useState([]);
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    getCourseList().then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg);
        setLesson(ret.data.data);
        const lessonList = ret.data.data;

        // 将 lessonList 映射为 treeData 数组
        const treeDataArray = lessonList.map((lesson: any) => {
          return {
            title: lesson.lessonName,
            value: lesson.lessonId.toString(),
          };
        });

        setTreeDataArg(treeDataArray);
        //显示回参
      } else {
        message.error("获取课程失败");
      }
    });
  }, []);
  interface treeData {
    title: string;
    value: string;
  }
  const [treeDataArg, setTreeDataArg] = useState<treeData[]>([]);
  // console.log(treeDataArg);
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
                lessonId: values.LessonId,
                name: values.Name,
                info: values.Info,
                start: new Date(values.RangePicker[0]).getTime(),
                end: new Date(values.RangePicker[1]).getTime(),
                resourceList: resourceList,
              };
              setHomework(newHomework);
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
          <Form.Item name="LessonId" label="所属课程">
            <TreeSelect
              style={{ width: "100%" }}
              // value={value}
              // dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeData={treeDataArg}
              placeholder="请选择所属课程！"
              treeDefaultExpandAll
              // onChange={onChange}
            />
          </Form.Item>

          <Form.Item name="Name" label="作业名称">
            <Input />
          </Form.Item>

          <Form.Item name="RangePicker" label="时间设置">
            <RangePicker showTime locale={locale} />
          </Form.Item>

          <Form.Item name="Info" label="作业内容">
            <TextArea className={styles.text} style={{ width: "1000px" }} />
          </Form.Item>
        </div>

        <Form.Item label="上传资料" valuePropName="fileList">
          <div>
            <MyUpload />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
