//@ts-nocheck
import React, { useEffect, useState } from "react";
import { message, Card, Button, Row, Col } from "antd";
import styles from "./index.module.scss";
import { getLessons } from "../../../service/list";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

// 我的作业列表（作业标题，课程名字，老师名字，展示分数，批改状态）
// 娄竞楷
export default function ClassList() {
  const [lessonAll, setLessonAll] = useState<[]>([]);
  useEffect(() => {
    getLessons().then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg);
        setLessonAll(ret.data.data);
      } else {
        message.error("获取作业列表失败");
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleMyDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    navigate("/detail");
  };

  return (
    <div className={styles.all}>
      <Row gutter={24}>
        {lessonAll.map((item, index) => (
          <Col span={8}>
            <Card
              key={index}
              size="small"
              className={styles.card}
              cover={
                <img
                  src={item.picUrl}
                  alt=""
                  style={{ width: "300px", height: "180px", padding: "10px" }}
                />
              }
              actions={[
                <Row justify={"space-between"}>
                  
                  <Button
                    className={styles.rowBtn}
                    onClick={(e) => handleMyDetail(item.lessonId, e)}
                  >
                    我的作业详情
                  </Button>
                </Row>,
              ]}
            >
              <Meta
                title={item.lessonName}
                description={item.info}
                style={{ height: "80px" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
