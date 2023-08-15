import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, DatePicker, Row } from "antd";
import styles from "./index.module.scss";
import { getCourseInfo, changeWorkName, changeWorkInfo, updatePublishedWork } from "../../../service/changeWork";
import { deleteResource } from "../../../service/myUpload";
import { useLocation } from "react-router-dom";
import MyUpload from '../../../components/upload';

export default function Detail() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const location = useLocation();
  const lessonId: string = location.state?.lessonId.e;
  const [homeworkId, setHomeworkId] = useState("");
  const [preName, setPreName] = useState("");
  const [preInfo, setPreInfo] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  //已上传的资源列表
  const [resoursBOList, setresoursBOList] = useState<any[]>([]);
  //新增资源id的数组
  const [resourceIdLists, setResourceIdLists] = useState<string[]>([]);
  //删除资源id的数组
  const [deleteResourceIdList, setDeleteResourceIdList] = useState<string[]>([]);

  useEffect(() => {
    getCourseInfo(lessonId).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        if (Object.keys(res.data.data).length !== 0) {
          form.setFieldsValue({
            Name: res.data.data.name,
            Info: res.data.data.info,
          });
          setPreName(res.data.data.name);
          setPreInfo(res.data.data.info);
          setHomeworkId(res.data.data.homeworkId);
          setresoursBOList(res.data.data.resoursBOList);
        } else {
          message.info("暂无课程信息！");
        }
      } else {
        message.error("获取课程信息失败！");
      }
    });
  }, []);

  useEffect(() => {
    setUpdateFlag(true)
  }, [resourceIdLists, deleteResourceIdList]);

  const updateHomeworkInfo = () => {
    const values = form?.getFieldsValue();
    // console.log(values);
    console.log(homeworkId);
    console.log(values.Name);
    console.log(values.Info);
    console.log(resourceIdLists);
    console.log(deleteResourceIdList);
    updatePublishedWork(
      homeworkId,
      values.Name,
      values.Info,
      resourceIdLists,
      deleteResourceIdList
    ).then((res) => {
      console.log(res);
    })
  }


  return (
    <div className={styles.detailALL}>
      <div className={styles.detailHeader}>
        <div className={styles.title}>修改作业</div>
        <div>
          <Button
            className={styles.btn}
            type="primary"
            onClick={updateHomeworkInfo}
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
          <Row gutter={24}>
            <MyUpload
              resoursBOList={resoursBOList}
              getNewResourceIdLists={setResourceIdLists}
              getDeleteResoursIdList={setDeleteResourceIdList}
            />
          </Row>
        </div>
      </Form>
    </div>
  );
}
