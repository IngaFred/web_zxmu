// 课程详情（课程封面，课程信息，课程章节，下载资源，讨论区，作业列表）
// 鄢浩其
import React, { useState, useEffect } from "react";
import { Col, Row, Empty, Button, message, Select } from "antd";
import styles from "./index.module.scss";
import { useLocation } from "react-router-dom";
import { getTeacherClassList } from "../../../service/course";
import DisplayAdd from "./pages/addLesson";
import UpdateLesson from "./pages/updateLesson";

export default function New() {
  //控制创建课程前后的显示状态
  const location = useLocation();

  const [isDisplay, setIsDisplay] = useState(true);
  const [isCreate, setIsCreate] = useState(true);
  const [ownClassList, setOwnClassList] = useState<any[]>([]);

  const [lessonId, setLessonId] = useState("");
  useEffect(() => {
    getTeacherClassList().then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          setOwnClassList(res.data.data);
        } else {
          message.warning(res.data.errorMsg);
        }
      } else {
        message.warning("请求失败!");
      }
    });
  }, []);
  const handleCreate = () => {
    setIsDisplay(false);
  };

  const handleUpdate = (lessonId: string) => {
    setLessonId(lessonId);
    setIsDisplay(false);
    setIsCreate(false);
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isDisplay ? (
        <>
          <Row>
            <Col className={styles.rowButton}>
              <Button onClick={handleCreate}>新建课程</Button>
              <Select
                defaultValue="修改课程"
                style={{ width: "100px", marginLeft: "10px" }}
                onChange={(lessonId) => handleUpdate(lessonId)}
                options={ownClassList.map((item) => {
                  return {
                    value: item.lessonId,
                    label: item.lessonName,
                  };
                })}
              />
            </Col>
          </Row>
          <Row className={styles.rowEmpty}>
            <Col span={24}>
              <Empty description={"暂无课程信息，请添加课程！"}> </Empty>
            </Col>
          </Row>
        </>
      ) : isCreate ? (
        <DisplayAdd />
      ) : (
        <UpdateLesson e={lessonId}></UpdateLesson>
      )}
    </div>
  );
}
