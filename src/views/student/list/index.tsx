//@ts-nocheck
import React, { useEffect, useState } from "react";
import { message, Card, Button, Row, Col, Empty } from "antd";
import styles from "./index.module.scss";
import { getLessons } from "../../../service/list";
import Meta from "antd/es/card/Meta";
import { useLocation, useNavigate } from "react-router-dom";

// 我的作业列表（作业标题，课程名字，老师名字，展示分数，批改状态）
// 娄竞楷

type LessonId = {
  e: string;
};

export default function ClassList() {
  const location = useLocation();

  const lessonId: LessonId = location.state?.lessonId;

  const [lessonAll, setLessonAll] = useState([]);

  useEffect(() => {
    getLessons(lessonId).then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg);
        setLessonAll(ret.data.data.homeworkBOList);
      } else {
        message.error("获取作业列表失败");
      }
    });
  }, []);

  console.log(lessonAll);

  const navigate = useNavigate();
  const handleMyDetail = (
    id: React.MouseEvent<HTMLButtonElement>,
    hId: React.MouseEvent<HTMLButtonElement>
  ) => {
    navigate("/detail", { state: { lessonId: { id }, homeworkId: { hId } } });
  };

  return (
    <div className={styles.all}>
      <Row gutter={24}>
        {lessonAll.length > 0 ? ( // 判断lessonAll是否为空
          lessonAll.map((item, index) => (
            <Col span={6}>
              <Card
                key={index}
                size="small"
                className={styles.card}
                actions={[
                  <Row justify={"space-between"}>
                    <Button
                      className={styles.rowBtn}
                      onClick={(id, hId) =>
                        handleMyDetail(item.lessonId, item.homeworkId, id, hId)
                      }
                    >
                      我的作业详情
                    </Button>
                  </Row>,
                ]}
              >
                <Meta
                  title={item.lessonName}
                  description={item.name}
                  style={{ height: "80px" }}
                />
                <p>{item.info}</p>
              </Card>
            </Col>
          ))
        ) : (
          // 如果lessonAll为空，显示一个空白的组件或者一个提示信息
          <Col span={24}>
            <Empty description="没有对应的课程，暂无作业列表" />
          </Col>
        )}
      </Row>
    </div>
  );
}
